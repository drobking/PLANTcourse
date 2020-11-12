import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponce';
import { Plant } from '../Models/plant.model';
import { UserAndPlants } from '../Models/UserAndPlants';

@Injectable({
    providedIn: 'root'
  })
export class PlantService{
    constructor(private http: HttpClient) { }

    baseUrl = "/api/Plant"
  
    getAllPlants(): Observable<Plant[]> {
      return this.http.get<Plant[]>(this.baseUrl);
    }
    postNamePlants(plant:string,userName:string):Observable<ApiResponse>{
     var body:UserAndPlants
        
      
      body={namePlant: plant,nameUser:userName};
     
      return  this.http.post<ApiResponse>(this.baseUrl+'/addNamePlants',body);
    }
    
}