export class Pedido{
    #id;
    #valortotal;
    #status;
    #dataCad;

    //constructor
    constructor(pIdCliente, pValorTotal, pStatus, pId){
        this.idCliente = pIdCliente;
        this.valorTotal = pValorTotal;
        this.status = pStatus;
        this.id = pId;
    }

    //getters
    get id(){
        return this.#id;
    }

    get valorTotal(){
        return this.#valortotal;
    }

    get status(){
        return this.#status;
    }

    

    //setters

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    

    set valorTotal(value){
        this.#validarValorTotal(value);
        this.#valortotal = value;
    }

    set status(value){
        this.#validarStatus(value);
        this.#status = value;
    }

    //metodos auxiliares
    #validarId(value){
        if(value <= 0 && value){
            throw new Error("Verifique o id inserido!");
        }
    }



    #validarValorTotal(value){
        console.log(value);
        
        if(value < 0 || !value){
            throw new Error("Verifique o valor do valorTotal inserido!");
        }
    }

    #validarStatus(value){
        if(!value){
            throw new Error("Verifique o status inserido!");
        }
    }

    //design pattern 
    static criar(dados){
        console.log(dados.valortotal, dados.status);
        
        return new Pedido(dados.valortotal, dados.status, null);
    }

    static editar(dados){
        return new Pedido(dados.valortotal, dados.status, dados.id);
    }
}