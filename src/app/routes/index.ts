import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { FruitCategoryRoutes } from "../modules/fruitCategory/fruitCategory.routes";
import { FruitRoutes } from "../modules/fruit/fruit.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/fruit-category",
    route: FruitCategoryRoutes,
  },
  {
    path: "/fruit",
    route: FruitRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
