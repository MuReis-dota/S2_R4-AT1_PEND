import { ItensPedido } from "../models/ItensPedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPedido } from "../enum/statusPedido.js";

const pedidoController = {
    registrar: async (req, res) => {
        try {

            let { itens } = req.body;

            const itensPedido = itens.map(item =>  //itens é um array de objetos, cada objeto representa um item do pedido, com idProduto, quantidade e valorItem
                ItensPedido.criar({
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );


            const subTotalItens = ItensPedido.calcularTotal(itensPedido); //função para criar na model
            const pedido = { valorTotal: subTotalItens, status: statusPedido.ABERTO };

            const resultado = await pedidoRepository.criar(pedido, itensPedido);

            return res.status(201).json({ resultado });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editarRemover: async (req, res) => {
        try {

            const idItemPedido = Number(req.params.idItemPedido);

            let resultItem = await pedidoRepository.recuperarItemPedido(idItemPedido); //recupera o item do pedido para calcular o valor a ser subtraido do subtotal do pedido, recebe o id do item do pedido como parametro



            let totalParaSubtrair = Number(resultItem.quantidade) * Number(resultItem.valor_item);

            let resultPedido = await pedidoRepository.recuperarPedido(resultItem.id_pedido); //recupera o pedido para calcular o novo subtotal do pedido, recebe o id do pedido como parametro


            const pedidoAtualizado = { id: resultPedido.id, valorTotal: (resultPedido.valor_total - totalParaSubtrair), status: resultPedido.status };

            const resultado = await pedidoRepository.editarRemover(pedidoAtualizado, idItemPedido);

            return res.status(200).json({ message: 'Item do pedido removido com sucesso', resultado });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editarAdicionar: async (req, res) => {
        try {

            const idPedido = Number(req.params.idPedido);

            const itemPedido = ItensPedido.criar({
                idProduto: req.body.idProduto,
                quantidade: req.body.quantidade,
                valorItem: req.body.valorItem
            });

            let resultPedido = await pedidoRepository.recuperarPedido(idPedido);

            let totalParaSomar = itemPedido.quantidade * itemPedido.valorItem;
            let totalFinal = Number(resultPedido.valor_total) + totalParaSomar;

            const pedidoAtualizado = { id: resultPedido.id, valorTotal: totalFinal, status: resultPedido.status };

            const resultado = await pedidoRepository.editarAdicionar(pedidoAtualizado, itemPedido);

            return res.status(200).json({ message: 'Item do pedido adicionado com sucesso', resultado });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editarQuantidade: async (req, res) => {
        try {

            const idItem = Number(req.params.idItem);
            const quantidade = Number(req.body.quantidade);

            let resultItem = await pedidoRepository.recuperarItemPedido(idItem);

            console.log(resultItem);

            let totalAntigo = resultItem.quantidade * resultItem.valor_item;
            let totalNovo = quantidade * resultItem.valor_item;

            let diferenca = totalNovo - totalAntigo;

            let resultPedido = await pedidoRepository.recuperarPedido(resultItem.id_pedido);

            const pedidoAtualizado = { id: resultPedido.id, valorTotal: (Number(resultPedido.valor_total) + Number(diferenca)), status: resultPedido.status };

            const itensPedidoAtualizados = { ...resultItem, quantidade }; //cria um novo objeto com as mesmas propriedades do item do pedido recuperado, mas com a quantidade atualizada

            const resultado = await pedidoRepository.editarQuantidade(pedidoAtualizado, itensPedidoAtualizados, idItem);

            return res.status(200).json({ message: 'Quantidade do item do pedido atualizada com sucesso', resultado });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editarStatus: async (req, res) => {
        try {

            const idPedido = Number(req.params.idPedido);
            const { status } = req.body;

            if (status !== statusPedido.ABERTO && status !== statusPedido.FINALIZADO && status !== statusPedido.PENDENTE) {
                return res.status(400).json({ message: 'Status inválido' });
            }

            const resultado = await pedidoRepository.editarStatus({ id: idPedido, status: status });

            return res.status(200).json({ message: 'Status do pedido atualizado com sucesso', resultado });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const resultado = await pedidoRepository.selecionar();

            res.status(200).json({
                resultado
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    }
}



export default pedidoController;