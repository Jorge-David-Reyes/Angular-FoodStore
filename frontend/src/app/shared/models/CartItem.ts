import { Food } from "./Food";

export class CartItem{
    //en el contructor para evitar hacer que 
    //food!:Food; se repita en el contructor
    // con this.food = food
    // lo hacemos publico en el contructor de modo 
    //de que se tenga acceso en el en cualquier 
    //parte de clase
    constructor(public food:Food){

    }

    quantity:number = 1;
    price:number = this.food.price;
}