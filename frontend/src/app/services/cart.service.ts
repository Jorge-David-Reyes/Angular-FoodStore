import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Debido a que era muy pesado estar guardando diferentes new Cart() se agrego 
  //dinamica para que esto fuera mediante formato json y se guardara de forma local
  private cart: Cart = this.getCartFromLocalStorage();
  //Permitira ver los cambio que se van haciendo sobre el carro de compras
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  //Funcion para añadir un pokemon
  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  //Para eliminar un prodcuto del carro de compras
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  //Suma la cantuidad de productos asi como el precio
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  //Limpiamos creando un nuevo carro de compras
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  //Observable para el cambio en el carro de compras
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Con esta funcion se van haciendo los cambios en el carro de compras
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  //De esta forma se va toma referencia del carro actual
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}