import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  //con esto obtenedremos la comunicacion con la base de datos
  getAll():Food[]{
    return sample_foods;
  }
}
