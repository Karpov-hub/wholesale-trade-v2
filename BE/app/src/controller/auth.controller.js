const db = require("@app/db");
const crypto = require("crypto");
const redis = require("@app/redis");
const config = require("@app/config");
//this controller only for moderators
async function signin(req, res) {
  let moderator = await db.moderator.findOne({
    where: { phone: req.body.phone },
    attributes: ["id", "login", "password"],
  });
  if (!moderator) return res.send({ code: "AUTHENTICATIONFAILED" });
  if (
    crypto.createHash("sha256").update(req.body.password).digest("base64") ==
    moderator.password
  ) {
    let session_token = crypto.randomBytes(30).toString("base64");
    await redis.set(session_token, moderator.get("id"), config.token_lifetime);
    return res.send({ success: true, session_token });
  } else {
    return res.send({ success: false, message: "Failed to authorize" });
  }
}

async function refreshToken(req, res) {
  if (await redis.get(req.body.session_token))
    return res.send({ success: true });
  return res.send({ success: false });
}

async function logout(req, res) {
  if (await redis.get(req.body.session_token)) {
    await redis.del(req.body.session_token);
    return res.send({ success: true });
  }
  return res.send({ success: false });
}

module.exports = {
  signin,
  refreshToken,
  logout,
};
