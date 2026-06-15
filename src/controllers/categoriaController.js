import { Categoria } from "../models/Categoria.js"
import categoriaRepository from "../repositories/categoriaRepository.js";

const categoriaController = {

    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            const categoria = Categoria.criar({ nome, descricao });

            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    atualizar: async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, descricao } = req.body;

        if (isNaN(id) || !nome) {
            return res.status(400).json({
                message: 'Dados inválidos'
            });
        }

        const categoria = Categoria.editar({ nome, descricao }, id);
        const result = await categoriaRepository.atualizar(categoria);

        res.status(200).json({ result });

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
            const result = await categoriaRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const result = await categoriaRepository.deletar(id);
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

export default categoriaController;
