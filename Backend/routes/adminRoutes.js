const {
  authenticateAdmin,
  requireAdmin
} = require("../middleware/authMiddleware");
router.get(
  "/users",
  authenticateAdmin,
  requireAdmin,
  getUsers
);

router.delete(
  "/users/:id",
  authenticateAdmin,
  requireAdmin,
  deleteUser
);