import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidationSchema } from "./order.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidationSchema.create),
  auth(UserRole.USER),
  OrderController.createOrder
);

router.get("/", auth(UserRole.ADMIN), OrderController.getAllOrder);

router.get("/my-order/:id", OrderController.getMyOrder);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  OrderController.getAOrder
);

router.patch(
  "/:id",
  validateRequest(OrderValidationSchema.updateStatus),
  auth(UserRole.ADMIN),
  OrderController.orderStatusChange
);

export const OrderRoutes = router;
