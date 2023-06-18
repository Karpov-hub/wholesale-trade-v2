const db = require("@app/db");
const Op = db.Sequelize.Op;
const crypto = require("crypto");

// async function createCategory(req, res) {
//   let category = await db.category.findOne({
//     where: { name: req.body.name },
//   });
//   if (category != null) {
//     return res.send({
//       code: "CATEGORYEXIST",
//       message: "Category is already exist",
//     });
//   }
//   await db.category.create({
//     name: req.body.name,
//     description: req.body.description,
//   });
//   return res.send({ code: "SUCCESS", message: "Category was created" });
// }

async function getCategories(req, res) {
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
      attributes: ["id", "name", "description"],
      offset: req.body.start,
      limit: req.body.limit,
    };
    let { count, rows } = await db.category.findAndCountAll(searchingOptions);

    return res.send({ success: true, count, rows });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function updateCategory(req, res) {
  try {
    let moderator_id = await redis.get(req.body.session_token);
    if (!moderator_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });
    let updatingOptions = { ...req.body };
    await db.category.update(updatingOptions, { where: { id: req.body.id } });
    return res.send({
      success: true,
      message: "Category data was updated",
    });
  } catch (err) {
    return res.send({
      success: false,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    await db.category.destroy({
      where: { id: req.body.id },
    });
    return res.send({ success: true, message: "Category was deleted" });
  } catch (err) {
    return res.send({ success: false });
  }
}

module.exports = {
  // createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
