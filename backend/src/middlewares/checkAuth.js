const Clerk = require("@clerk/clerk-sdk-node");

var checkAuth = async (req, res, next) => {
  try {
    const clerkClient = new Clerk({
      secretKey: process.env.CLERK_SECRET_KEY,
      clientId: process.env.CLERK_FRONTEND_APP_ID,
    });

    const userId = await clerkClient.getUserFromRequest(req);
    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkAuth;
