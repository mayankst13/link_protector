const jwt = require("jsonwebtoken");

module.exports = (req, res) => {

  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid request");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey123"
    );

    return res.redirect(decoded.url);

  } catch (err) {
    return res.status(403).send("Invalid or expired link");
  }
};
