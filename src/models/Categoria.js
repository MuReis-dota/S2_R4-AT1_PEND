export class Categoria {
    #id;
    #nome;
    #descricao;
    #dataCad;

    constructor(pNome, pDescricao, pId) {
        this.nome = pNome;
        this.descricao = pDescricao;
        this.id = pId;
        this.#dataCad = new Date();
    }

    get id() {
        return this.#id;
    }
    get nome() {
        return this.#nome
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value
    }
    get descricao() {
        return this.#descricao
    }
    get dataCad() {
        return this.#dataCad;
    }

    set descricao(value) {
        this.#validarDescricao(value);
        this.#descricao = value;
    }


    set id(value) {
        this.#validarId(value)
        this.#id = value
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 a 45 caracteres')
        }
    }

    #validarDescricao(value) {
        if (value && (value.trim().length < 5 || value.trim().length > 100)) {
            throw new Error('O campo descrição  deve ter entre 5 a 100 caracteres')
        }
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde ao esperado')
        }
    }

    static criar(dados) {
        return new Categoria(dados.nome, dados.descricao, null);
    }

    static editar(dados, id) {
        return new Categoria(dados.nome, dados.descricao, id);
    }


}
