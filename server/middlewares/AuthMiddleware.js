const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "carlieoscardeltaechotangopapaalphanovemberdeltaalpha"
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ error: "user not authenticated !" });
  }

  try {
    const validToken = verify(
      accessToken,
      "carlieoscardeltaechotangopapaalphanovemberdeltaalpha"
    );

    if (validToken) {
      req.user = validToken;
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
