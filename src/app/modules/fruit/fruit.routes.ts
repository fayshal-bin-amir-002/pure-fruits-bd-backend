import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FruitValidationSchema } from "./fruit.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { FruitControllers } from "./fruit.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(FruitValidationSchema.create),
  auth(UserRole.ADMIN),
  FruitControllers.createFruit
);

router.get("/", FruitControllers.getAllFruit);

router.get("/:id", FruitControllers.getAFruit);

router.patch(
  "/:id",
  validateRequest(FruitValidationSchema.update),
  auth(UserRole.ADMIN),
  FruitControllers.updateAFruit
);

router.delete("/:id", auth(UserRole.ADMIN), FruitControllers.deleteFruit);

export const FruitRoutes = router;
