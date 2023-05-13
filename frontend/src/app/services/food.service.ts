import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  //Inyectamos HttpClient
  constructor(private http:HttpClient) { }

  //con esto obtenedremos la comunicacion con la base de datos
  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm:string){
    //Este filtro ayudara a resolver el problema de una busqueda
    // con mayusculas y minusculas
    //return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }


  //Obtener todos los tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  //funcion condicional para verificar y filtrar las comidas
  //si es que el tag seleccionado es All o si no filtrarlas
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag== "All"?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
