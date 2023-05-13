import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food; //Añadimos el tipo por lo sotros componentes

  //Inyectamos el activatedRoute para la busqueda de la comida
  //Inyectamos el foodservice para obtner la comida basado en su id
  //Inyectamos el cart service
  //Inyectamos un router
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private router: Router) {
    //Implementamos la dinamica de activated route para id
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      //this.food = foodService.getFoodById(params.id);
      foodService.getFoodById(params.id).subscribe(serverFood => {
        this.food = serverFood;
      });
    })
   }

  ngOnInit(): void {
  }

  //Inyectamos el cart service
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}