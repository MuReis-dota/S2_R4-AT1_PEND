import { connection } from "../configs/Database.js";
// pool de conexão não permite transaction, então criar outras conexão

const pedidoRepository = {
    criar: async (pedido, itensPedido) => { // transação para garantir que cliente, telefone e endereço sejam criados juntos

        

        const conn = await connection.getConnection(); //nova conexão para transação

        try {

            await conn.beginTransaction();            

            const sqlPedido = 'INSERT INTO pedidos (valor_total, status) VALUES (?, ?)';
            const valuesPedidos = [pedido.valorTotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedidos);

            //insert itens_pedidos
            for (const element of itensPedido) {//itensPedido é um array de objetos, cada objeto representa um item do pedido, com idProduto, quantidade e valorItem
                
                const sqlItensPedidos = 'INSERT INTO itens_pedidos (id_pedido, id_produto, quantidade, valor_item) VALUES (?, ?, ?, ?)';
                const valuesItensPedidos = [rowsPedido.insertId, element.idProduto, element.quantidade, element.valorItem];
                await conn.execute(sqlItensPedidos, valuesItensPedidos);
            }
            
            
            
            conn.commit();
            return { rowsPedido, itensPedido };

        } catch (error) {

            conn.rollback(); // desfaz as operações caso ocorra algum erro
            throw new Error(error);

        } finally {
            conn.release();
        }
    },

    editarRemover: async (pedido, idItemPedido) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction(); 
            
            const sqlItemPedidosDelete = 'DELETE FROM itens_pedidos WHERE id = ?';
            const valuesItemPedidosDelete = [idItemPedido];
            await conn.execute(sqlItemPedidosDelete, valuesItemPedidosDelete); //deleta os itens do pedido 

            const sqlPedido = 'UPDATE pedidos SET valor_total = ? WHERE id = ?';
            const valuesPedido = [pedido.valorTotal, pedido.id];
            await conn.execute(sqlPedido, valuesPedido); //atualiza o pedido

            await conn.commit();

        } catch (error) {
            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release();
        }
    },

    editarAdicionar: async (pedido, itemPedido) => {
        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction(); 

            const sqlItemPedidosInsert = 'INSERT INTO itens_pedidos (id_pedido, id_produto, quantidade, valor_item) VALUES (?, ?, ?, ?)';
            const valuesItemPedidosInsert = [pedido.id, itemPedido.idProduto, itemPedido.quantidade, itemPedido.valorItem];
            await conn.execute(sqlItemPedidosInsert, valuesItemPedidosInsert); //adiciona os itens do pedido

            const sqlPedido = 'UPDATE pedidos SET valor_total = ? WHERE id = ?';
            const valuesPedido = [pedido.valorTotal, pedido.id];
            await conn.execute(sqlPedido, valuesPedido); //atualiza o pedido

            await conn.commit();
            
        } catch (error) {
            conn.rollback();
            throw new Error(error);
        } finally{
            conn.release();
        }
    },

    editarQuantidade: async (pedido, itensPedido, idItem) => {
        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction(); 

            const sqlQuantidadeUpdate = 'UPDATE itens_pedidos SET quantidade = ? WHERE id = ?';
            const valuesItemUpdate = [itensPedido.quantidade, idItem];
            await conn.execute(sqlQuantidadeUpdate, valuesItemUpdate); 

            const sqlPedido = 'UPDATE pedidos SET valor_total = ? WHERE id = ?';
            const valuesPedido = [pedido.valorTotal, pedido.id];
            await conn.execute(sqlPedido, valuesPedido); //atualiza o pedido

            await conn.commit();
            
        } catch (error) {
             conn.rollback();
            throw new Error(error);
        } finally{
            conn.release();
        }
    },

    editarStatus: async (pedido) => {
        const sql = 'UPDATE pedidos SET status = ? WHERE id = ?';
        const values = [pedido.status, pedido.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
        
    },

    selecionar: async () => {
        const sql = 'SELECT p.id, p.valor_total, p.status, p.data_pedido, ip.id as id_item_pedido, ip.id_produto, ip.quantidade, ip.valor_item FROM pedidos as p INNER JOIN itens_pedidos as ip ON p.id = ip.id_pedido';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    recuperarItemPedido: async (idItem) => {
        const conn = await connection.getConnection();

        try {
            const sql = 'SELECT * FROM itens_pedidos WHERE id = ?';
            const values = [idItem];
            const [rows] = await conn.execute(sql, values);
            return rows[0];
        }
            catch (error) {
            throw new Error(error.message);
        }
        finally{
            conn.release();
        }
    },
    recuperarPedido: async (idPedido) => {
        const conn = await connection.getConnection();

        try {
            const sql = 'SELECT * FROM pedidos WHERE id = ?';
            const values = [idPedido];
            const [rows] = await conn.execute(sql, values);
            return rows[0];
        }
            catch (error) {
            throw new Error(error.message);
        }
        finally{
            conn.release();
        }
    }
}



export default pedidoRepository;