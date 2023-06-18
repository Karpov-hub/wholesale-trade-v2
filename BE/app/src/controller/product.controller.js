const db = require("@app/db");
const config = require("@app/config");
const redis = require("@app/redis");
const Op = db.Sequelize.Op;

async function getProducts(req, res) {
  try {
    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    const searchingOptions = {
      offset: req.body.start,
      limit: req.body.limit,
      where: {},
    };

    if (req.body.category_id) {
      searchingOptions.where.category_id = req.body.category_id;
    }

    if (req.body.name) {
      searchingOptions.where.name = { [Op.like]: `%${req.body.name}%` };
    }

    if (req.body.rating) {
      searchingOptions.where.rating = {
        [Op.gte]: req.body.rating,
      };
    }

    if (req.body.price_min && req.body.price_max) {
      searchingOptions.where.price = {
        [Op.between]: [req.body.price_min, req.body.price_max],
      };
    } else if (req.body.price_min) {
      searchingOptions.where.price = {
        [Op.gte]: req.body.price_min,
      };
    } else if (req.body.price_max) {
      searchingOptions.where.price = {
        [Op.lte]: req.body.price_max,
      };
    }

    if (req.body.discount_min) {
      searchingOptions.where.discount = {
        [Op.gte]: req.body.discount_min,
      };
    }

    let { count, rows } = await db.product.findAndCountAll(searchingOptions);
    rows = rows.map((row) => {
      return {
        ...row.get(),
        image: JSON.parse(row.image),
      };
    });
    return res.send({ success: true, count, rows });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function GetProductDetails(req, res) {
  try {
    const product = await db.product.findOne({
      where: { id: req.body.product_id },
      attributes: [
        "id",
        "name",
        "image",
        "price",
        "discount",
        "rating",
        "reviews",
        "product_quantity",
        "description",
      ],
    });

    product.image = JSON.parse(product.image);

    return res.send({ success: true, product });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a data",
    });
  }
}

async function createProduct(req, res) {
  try {
    const user_id = await redis.get(req.body.session_token);
    if (!user_id) {
      return res.send({
        code: "SESSIONEXPIRED",
      });
    }
    const user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["id", "role"],
    });

    if (user.role !== 2) {
      return res.send({
        code: "ACCESSDENIED",
      });
    }

    await db.product.create({
      name: req.body.name,
      category_id: req.body.category_id,
      user_id: user_id,
      image: JSON.stringify(req.body.image),
      price: req.body.price,
      rating: 0,
      reviews: 0,
      product_quantity: req.body.product_quantity,
      description: req.body.description,
      user_id: user.id,
      ctime: new Date(),
      mtime: new Date(),
    });

    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function deleteProduct(req, res) {
  try {
    const user_id = await redis.get(req.body.session_token);
    if (!user_id) {
      return res.send({
        code: "SESSIONEXPIRED",
      });
    }
    const product = await db.product.findOne({
      where: { id: req.body.product_id },
      attributes: ["user_id"],
    });

    if (user_id === product.user_id) {
      await db.product.destroy({
        where: { id: req.body.product_id },
      });
      return res.send({ success: true });
    }

    return res.send({
      code: "ACCESSDENIED",
    });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function updateProduct(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    const product = await db.product.findOne({
      where: { id: req.body.product_id },
      attributes: ["user_id"],
    });
    if (user_id == product.user_id) {
      let updatingOptions = {
        name: req.body.name,
        category_id: req.body.category_id,
        image: req.body.image,
        price: req.body.price,
        product_quantity: req.body.product_quantity,
        description: req.body.description,
      };

      await db.product.update(updatingOptions, {
        where: { id: req.body.product_id },
      });
      return res.send({ success: true });
    } else {
      return res.send({
        code: "ACCESSDENIED",
      });
    }
  } catch (e) {
    return res.send({ success: false });
  }
}

async function addProductRating(req, res) {
  try {
    const { value, comment, product_id, session_token } = req.body;

    let user_id = await redis.get(session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Получаем текущие отзывы и рейтинг продукта из базы данных
    const product = await db.product.findByPk(product_id);
    const reviews = JSON.parse(product.reviews || "[]");
    const currentRating = parseInt(product.rating);

    // Добавляем новый отзыв в список
    reviews.push({ user_id, value, comment });

    // Вычисляем новый рейтинг
    const newRating = calculateNewRating(reviews);

    // Обновляем отзывы и рейтинг продукта в базе данных
    await db.product.update(
      { reviews: JSON.stringify(reviews), rating: newRating },
      { where: { id: product_id } }
    );

    return res.send({
      success: true,
      message: "Product rating updated successfully",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to add product rating",
    });
  }
}

function calculateNewRating(reviews) {
  const totalReviews = reviews.length;
  const sumOfRatings = reviews.reduce((sum, review) => sum + review.value, 0);
  const averageRating = sumOfRatings / totalReviews;
  return Math.round(averageRating);
}

async function addProductDiscount(req, res) {
  try {
    let moderator_id = await redis.get(req.body.session_token);
    if (!moderator_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    await db.product.update(
      { discount: req.body.discount },
      {
        where: { id: req.body.product_id },
      }
    );

    return res.send({
      success: true,
      message: "Product discount successfully updated",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to add product discount",
    });
  }
}

module.exports = {
  getProducts,
  GetProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  addProductRating,
  addProductDiscount,
};
