import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../Models/plant.model';

@Injectable({
    providedIn: 'root'
  })
export class PlantService{
    constructor(private http: HttpClient) { }

    baseUrl = "/api/Plant"
  
    getAllPlants(): Observable<Plant[]> {
      return this.http.get<Plant[]>(this.baseUrl);
    }
    postNamePlants(plant:string,userName:string):void{
//const body={name: plant.name}
     // this.http.post(this.baseUrl,plant,userName);
    }
    
}