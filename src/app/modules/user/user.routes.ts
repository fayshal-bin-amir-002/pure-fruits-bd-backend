import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "./user.interface";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.create),
  UserControllers.createUser
);

router.get("/", auth(UserRole.ADMIN), UserControllers.getAllUser);

router.get("/:id", auth(UserRole.ADMIN), UserControllers.getAUser);

router.patch(
  "/update-status/:id",
  validateRequest(UserValidation.updateStatus),
  auth(UserRole.ADMIN),
  UserControllers.userStatusChange
);

router.patch(
  "/update-role/:id",
  validateRequest(UserValidation.updateRole),
  auth(UserRole.ADMIN),
  UserControllers.userRoleChange
);

export const UserRoutes = router;
