import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService) {
    //Implementamos la dinamica de activated route para id
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.food = foodService.getFoodById(params.id);
    })
   }

  ngOnInit(): void {
  }

}