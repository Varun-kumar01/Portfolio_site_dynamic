const {
  authenticateAdmin,
  requireAdmin
} = require("../middleware/authmiddleware");
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