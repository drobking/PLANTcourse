import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../Models/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }
City:string="";

  
getWeather(nameCity:string): Observable<Weather> {
  this.City=nameCity;
 const baseUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q="+this.City+"&units=metric&appid=0d11d3289d4b9b97b55347e872cc7f4c";
  return this.http.get<Weather>(baseUrl);
}


}
