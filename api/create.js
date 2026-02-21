const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = JSON.parse(req.body);
    const { url } = body;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const token = jwt.sign(
      { url },
      process.env.JWT_SECRET || "supersecretkey123",
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      link: `/l/${token}`
    });

  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};
