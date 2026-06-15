import {connection} from"../configs/Database.js"

const categoriaRepository = {
    criar: async (categoria) => {
        const sql = 'INSERT INTO categorias (Nome, Descricao) VALUES (?, ?)';
        const values = [categoria.nome, categoria.descricao];
        const [rows] = await connection.execute(sql, values);

        return { id: rows.insertId };
    },

    atualizar: async (categoria) => {
        const sql = 'UPDATE categorias SET Nome = ?, Descricao = ? WHERE Id = ?';
        const values = [categoria.nome, categoria.descricao, categoria.id];
        const [rows] = await connection.execute(sql, values);

        if (rows.affectedRows === 0) {
            throw new Error('Categoria não encontrada');
        }

        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM categorias';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM categorias WHERE Id = ?';
        const values = [id];
        const [rows] = await connection.execute(sql, values);

        if (rows.affectedRows === 0) {
            throw new Error('Categoria não encontrada');
        }

        return rows;
    }
};

export default categoriaRepository;