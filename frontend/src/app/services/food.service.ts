import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  //con esto obtenedremos la comunicacion con la base de datos
  getAll():Food[]{
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm:string){
    //Este filtro ayudara a resolver el problema de una busqueda
    // con mayusculas y minusculas
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }


  //Obtener todos los tags
  getAllTags():Tag[]{
    return sample_tags
  }

  //funcion condicional para verificar y filtrar las comidas
  //si es que el tag seleccionado es All o si no filtrarlas
  getAllFoodsByTag(tag:string):Food[]{
    return tag== "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }
}
