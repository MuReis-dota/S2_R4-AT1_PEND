import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";


const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.registrar);
pedidoRoutes.put('/remover/:idItemPedido', pedidoController.editarRemover);
pedidoRoutes.put('/adicionar/:idPedido', pedidoController.editarAdicionar);
pedidoRoutes.put('/editarQuantidade/:idItem', pedidoController.editarQuantidade);
pedidoRoutes.put('/editarStatus/:idPedido', pedidoController.editarStatus);
pedidoRoutes.get('/', pedidoController.selecionar);


export default pedidoRoutes;