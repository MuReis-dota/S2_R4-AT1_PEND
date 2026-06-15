import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


// Singleton para a conexão com o banco de dados
class Database {
    static #instance = null;
    #pool = null;


    #createPool() {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }


    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }
        return Database.#instance;
    }


    getPool() {
        return this.#pool;
    }
}


export const connection = Database.getInstance().getPool();


export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'deploy';


        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(30) NOT NULL,
                descricao VARCHAR(300) NULL
            );
        `);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(50) NOT NULL,
                preco DECIMAL(10,2) NOT NULL,
                estoque INT NOT NULL,
                imagem VARCHAR(200) NOT NULL,
                id_categoria INT,
                FOREIGN KEY (id_categoria) REFERENCES categorias(id)
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                valor_total DECIMAL(10,2) NOT NULL,
                status ENUM("aberto", "finalizado", "pendente") NOT NULL,
                data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS itens_pedidos (
                id INT NOT NULL AUTO_INCREMENT,
                id_pedido INT NOT NULL,
                id_produto INT NOT NULL,
                quantidade INT NOT NULL,
                valor_item DECIMAL(10,2) NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
                FOREIGN KEY (id_produto) REFERENCES produtos(id)
            );
        `)


        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}
