const jwt = require("jsonwebtoken");

module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  const token = jwt.sign(
    { url },
    "supersecretkey123",
    { expiresIn: "10m" }
  );

  res.json({
    link: `/l/${token}`
  });
};