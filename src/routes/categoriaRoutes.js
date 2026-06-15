import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/', categoriaController.criar);
categoriaRoutes.put('/', categoriaController.atualizar);
categoriaRoutes.get('/', categoriaController.selecionar)
categoriaRoutes.delete('/:id', categoriaController.deletar);


export default categoriaRoutes;
