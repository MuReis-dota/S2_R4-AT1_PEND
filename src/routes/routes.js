import { Router } from "express";
const routes = Router();
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import pedidosRoutes from "./pedidosRoutes.js";

routes.use('/pedidos', pedidosRoutes);
routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);

export default routes;