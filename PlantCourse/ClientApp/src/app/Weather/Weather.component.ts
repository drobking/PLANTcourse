import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../Models/User';
import { Weather } from '../Models/Weather';
import { WeatherService } from '../Services/Weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './Weather.component.html',
  styleUrls: ['./Weather.component.css']
  //providers:[User]
})
export class WeatherComponent implements OnInit {
  userModel: User;

  constructor(private weatherService:WeatherService,private spinner:NgxSpinnerService,private notifier:NotifierService) { }
dataRes:Weather=new Weather();
image:string;
  ngOnInit() {
    this.spinner.show();
    
    this.userModel=JSON.parse(localStorage.getItem('user'));
   this.dataRes=JSON.parse(localStorage.getItem('Weather'));
    
//  this.weatherService.getWeather(this.userModel.address).subscribe(
//     data=>{ 
//       if(data.cod==404){
//         this.notifier.notify("error","city not found");
//       }
//       else{
//         this.notifier.notify('success', 'Success');
//       localStorage.setItem('Weather',JSON.stringify(data));
//       this.dataRes=data;
//       console.log(this.dataRes);

//       this.image = "http://openweathermap.org/img/wn/"+this.dataRes.weather[0].icon+"@4x.png";
      
//       //console.log(data);
//     }});
    
    this.spinner.hide();
  }
  Search(name:string):void{
   
    this.weatherService.getWeather(name).subscribe(
      data=>{  this.spinner.show();
        if(data.cod==404){
          this.notifier.notify("error","city not found");
        }
        else{
          this.notifier.notify('success', 'Success');
        localStorage.setItem('Weather',JSON.stringify(data));
        //console.log(data);
        this.dataRes=data;
        }this.spinner.hide();
       // console.log(this.dataRes);
      } 
    );
   
  }
}
