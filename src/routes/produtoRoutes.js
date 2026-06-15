import { Router } from "express";
import produtoController from "../controllers/produtosControllers.js";
import uploadImage from "../middlewares/uploadImage.js";

const produtoRoutes = Router();

produtoRoutes.get('/', produtoController.selecionar);
produtoRoutes.post('/', uploadImage, produtoController.criar);
produtoRoutes.put('/:id', uploadImage, produtoController.atualizar);
produtoRoutes.delete('/:id', produtoController.deletar);
produtoRoutes.get('/:id', produtoController.selecionarPorId);

export default produtoRoutes;