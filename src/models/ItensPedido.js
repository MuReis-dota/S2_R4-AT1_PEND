
export class ItensPedido{
    #id;
    #idPedido;
    #idProduto;
    #quantidade;
    #valorItem;


    //constructor
    constructor(pIdProduto, pQuantidade, pValorItem, pId, pIdPedido){
        this.idPedido = pIdPedido;
        this.idProduto = pIdProduto;
        this.quantidade = pQuantidade;
        this.valorItem = pValorItem;
        this.id = pId;
    }

    //getters
    get id(){
        return this.#id;
    }

    get idPedido(){
        return this.#idPedido;
    }

    get idProduto(){
        return this.#idProduto;
    }

    get quantidade(){
        return this.#quantidade;
    }

    get valorItem(){
        return this.#valorItem;
    }
    


    //setters
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    set idPedido(value){
        this.#validarIdPedido(value);
        this.#idPedido = value;
    }

    set idProduto(value){
        this.#validarIdProduto(value);
        this.#idProduto = value;
    }

    set quantidade(value){
        this.#validarQuantidade(value);
        this.#quantidade = value;
    }

    set valorItem(value){
        this.#validarValorItem(value);
        this.#valorItem = value;
    }

    //metodos auxiliares
    #validarId(value){
        if(value <= 0 && value){
            throw new Error("Verifique o id inserido!");
        }
    }

    #validarIdPedido(value){
        if(value <= 0 && value){
            throw new Error("Verifique o id do pedido inserido!");
        }
    }

    #validarIdProduto(value){
        if(value <= 0 || !value){
            throw new Error("Verifique o id do produto inserido!");
        }
    }

    #validarQuantidade(value){
        if(value <= 0 || !value){
            throw new Error("Verifique a quantidade inserida!");
        }
    }

    #validarValorItem(value){
        if(value < 0 || !value){
            throw new Error("Verifique o valor do item inserido!");
        }
    }


    static calcularTotal(itens){

        return(itens.reduce( //função de array para calcular o total do pedido, recebe como parametro um array de itens e retorna a soma da quantidade vezes o valor de cada item
            (total, item) => total + (item.quantidade * item.valorItem), 0 //valor inicial do total é 0
        ));
    }

    //design pattern 
    static criar(dados){
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, null, null);
    }

    static editar(dados){
        return new ItensPedido(dados.idPedido, dados.idProduto, dados.quantidade, dados.valorItem, id);
    }
}