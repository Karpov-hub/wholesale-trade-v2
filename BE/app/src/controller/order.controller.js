const db = require("@app/db");
const config = require("@app/config");
const redis = require("@app/redis");
const userController = require("../controller/user.controller");
const Op = db.Sequelize.Op;

async function getOrders(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    const searchingOptions = {
      attributes: ["id", "status", "ctime"],
      offset: req.body.start,
      limit: req.body.limit,
    };
    if (req.body.user_id) {
      searchingOptions.where.user_id = user_id;
    }
    const { count, rows } = await db.order.findAndCountAll(searchingOptions);

    return res.send({ success: true, count, rows });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function getOrdersFModerators(req, res) {
  try {
    let moderator_id = await redis.get(req.body.session_token);
    if (!moderator_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    const searchingOptions = {
      attributes: ["id", "status", "ctime"],
      offset: req.body.start,
      limit: req.body.limit,
    };
    if (req.body.status) {
      searchingOptions.where.status = req.body.status;
    }
    const { count, rows } = await db.order.findAndCountAll(searchingOptions);

    return res.send({ success: true, count, rows });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function GetOrderDetails(req, res) {
  try {
    let order = await db.order.findOne({
      where: { id: req.body.order_id },
      attributes: ["id", "ordered_products", "status", "ctime"],
    });

    return res.send({ success: true, order });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a data",
    });
  }
}

//for moderators
async function updateStatus(req, res) {
  try {
    let moderator_id = await redis.get(req.body.session_token);
    if (!moderator_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    await db.order.update(
      { status: req.body.status },
      {
        where: { id: req.body.order_id },
      }
    );
    let notifications = await userController.createNotification({
      user_id: id,
      name: "Update Status Order",
      description: "Your order status has been changed",
    });
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

module.exports = {
  getOrders,
  getOrdersFModerators,
  GetOrderDetails,
  updateStatus,
};
