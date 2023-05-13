import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{
  //Importamos el modelo de tags
  tags?:Tag[];

  //Inyectamos el foodservice
  constructor(foodService:FoodService){
    //this.tags = foodService.getAllTags();
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
  
  ngOnInit(): void {
   
  }
}
