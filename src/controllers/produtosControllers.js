import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    criar: async (req, res) => {
        try {
            const nome = String(req.body.nome);

            const idCategoria = Number(req.body.idCategoria); // converte o id da categoria recebido na requisição para número
            const valor = Number(req.body.valor); // converte o preço recebido na requisição para número
            const estoque = Number(req.body.estoque); // converte o estoque recebido na requisição para número
            const caminhoImagem = `/uploads/images/${req.file.filename}`;

            const produto = Produto.criar({ idCategoria, nome, valor, estoque, caminhoImagem }); // utiliza o método estático criar da classe Produto para criar um objeto da classe Produto a partir dos dados recebidos na requisição

            
            

            const resultado = await produtoRepository.criar(produto);
            res.status(201).json(resultado);

        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: "Erro ao criar produto",
                errorMessage: error.message
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            let { valor, estoque } = req.body;
            const caminhoImagem = `/uploads/images/${req.file.filename}`

            if (isNaN(id) || valor === undefined || estoque === undefined || caminhoImagem === undefined) {
                return res.status(400).json({
                    message: 'ID, valor, estoque e caminho da imagem são obrigatórios'
                });
            }

            const produtoExistente = await produtoRepository.selecionarPorId(id);

            if (produtoExistente[0] == undefined) {
                return res.status(404).json({
                    message: 'Produto não encontrado'
                });
            }

            valor = Number(valor);
            estoque = Number(estoque);
            
            const produto = Produto.editar({
                idCategoria: produtoExistente[0].id_categoria,
                nomeProduto: produtoExistente[0].nome,
                valor: valor ?? produtoExistente[0].preco,
                estoque: estoque ?? produtoExistente[0].estoque, 
                caminhoImagem: caminhoImagem ?? produtoExistente[0].imagem 
            }, id);
            
            const resultado = await produtoRepository.editar(produto);
            return res.status(200).json({ resultado });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();

            res.status(200).json(result);

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const result = await produtoRepository.deletar(id);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionarPorId: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await produtoRepository.selecionarPorId(id);
            res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    }
};

export default produtoController;