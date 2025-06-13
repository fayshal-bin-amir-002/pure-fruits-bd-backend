import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FruitCategorySchema } from "./fruitCategory.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { FruitCategoryControllers } from "./fruitCategory.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(FruitCategorySchema.create),
  auth(UserRole.ADMIN),
  FruitCategoryControllers.createFruitCategory
);

router.get("/", FruitCategoryControllers.getAllFruitCategory);

router.get("/:id", FruitCategoryControllers.getAFruitCategory);

router.patch(
  "/:id",
  validateRequest(FruitCategorySchema.update),
  auth(UserRole.ADMIN),
  FruitCategoryControllers.updateFruitCategory
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  FruitCategoryControllers.deleteFruitCategory
);

export const FruitCategoryRoutes = router;
