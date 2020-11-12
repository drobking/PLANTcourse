import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Plant } from '../Models/plant.model';
import { PlantService } from '../Services/Plant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthSrviceService } from '../Services/AuthSrvice.service';
import { User } from '../Models/User';
import { NotifierService } from 'angular-notifier';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
//import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls:["fetch-data.component.css"],
  providers: [DatePipe]
})
export class FetchDataComponent {
  
  constructor(private authService:AuthSrviceService,private plantService:PlantService,private datePipe: DatePipe,private spinner:NgxSpinnerService,private notifier: NotifierService) { }
listOfDataPlant:Plant[]=[];
userModel = new User();
currentPlantName:string;
lastHumidity:number;
lastTemperature:number;
lastHumidityGras:number;
//lastHumidity
public pieChartLabels: Label[] = ['Humidity','%'];
public pieChartDataHum: number[]=[];
//lastTemperature
public pieChartLabelsTem: Label[] = ['Temperature','C'];
public pieChartDataTem: number[] = [];
//lastHumidityGras
public pieChartLabelsWater: Label[] = ['Dirt','%'];
public pieChartDataWater: number[] = [];
  ngOnInit(): void {
    this.spinner.show();
    console.log(JSON.parse(localStorage.getItem('user')));
    this.userModel=JSON.parse(localStorage.getItem('user'));
    
    this.plantService.getAllPlants().subscribe(data=>{
        this.listOfDataPlant=data;
        this.currentPlantName=this.userModel.plantNames[0];
        this.lastHumidity=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.humidity}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0];
this.lastHumidityGras=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.humidityGras}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0]/10;
this.lastTemperature=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.temperature}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0] 
this.pushRoundHum(this.lastHumidity);
this.pushRoundTem(this.lastTemperature);
this.pushRoundGras(this.lastHumidityGras);

this.pushArrayTem(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.temperature}),
this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidity}),
this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidityGras}));


    this.pushArrayTem10(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.temperature}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10),
    this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidity}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10),
    this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidityGras}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10));
    
      });
    
    
     this.spinner.hide(); 
    
  }
  AddPlant(NamePlant:string){

 this.plantService.postNamePlants(NamePlant,this.userModel.fullName).subscribe(
   data=>{
console.log(data);
this.authService.getUser(this.userModel.email).subscribe(data=>{
  localStorage.setItem('user',JSON.stringify(data));
  this.userModel=JSON.parse(localStorage.getItem('user'));
  this.currentPlantName=NamePlant;

 });
   }
 );
  
  }
  DELETEFULLCHARTS(){
    this.lineChartData=[
      { data: [], label: 'humidity' },
      { data: [], label: 'temperature' },
      { data: [], label: 'dirt' }
    ];
    this.lineChartData10=[
      { data: [], label: 'humidity' },
      { data: [], label: 'temperature' },
      { data: [], label: 'dirt' }
    ];
    this.lineChartLabels= [];
    this.lineChartLabels10= [];
   
  }
  ShowChart(product:string){
    console.log(product);
   
    console.log(this.listOfDataPlant);
    if(this.listOfDataPlant.filter(x=>x.name==product).length==0){
      this.notifier.notify('error','Not Find this name plant in DataBase');
    }
    else{
      console.log(this.listOfDataPlant.filter(x=>x.name==product));
      this.currentPlantName=product;
      this.notifier.notify('success', 'Success');
      this.DELETEFULLCHARTS();
    this.pushArrayTem(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.temperature}),
    this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidity}),
    this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidityGras}));
    if(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.temperature}).length>10){
  this.pushArrayTem10(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.temperature}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10),
  this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidity}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10),
  this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map(function(plant:Plant){return plant.humidityGras}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-10));
    
    }
    
    this.lastHumidity=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.humidity}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0];
    this.lastTemperature=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.temperature}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0];
    this.lastHumidityGras=this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).map((plant:Plant)=>{return plant.humidityGras}).slice(this.listOfDataPlant.filter(x=>x.name==this.currentPlantName).length-1)[0]/10;
    this.pushRoundHum(this.lastHumidity);
    this.pushRoundTem(this.lastTemperature);
    this.pushRoundGras(this.lastHumidityGras);
     
  }
  }
  pushRoundGras(num:number):void{
    if(num<40){
      this.notifier.notify("error","Humidity Dirt Bad!")
    }
    this.pieChartDataWater=[num,100-num];
  }
  pushRoundHum(num:number): void{
    if(num<40){
      this.notifier.notify("error","Humidity Bad!")
    }
    console.log(this.pieChartDataHum);
  console.log(num);
    this.pieChartDataHum=[num,100-num];
    console.log(this.pieChartDataHum);
  }
  pushRoundTem(num:number): void{
    if(num<10||num>30){
      this.notifier.notify("error","Temperature Bad!")
    }
    console.log(this.pieChartDataHum);
  console.log(num);
    this.pieChartDataTem=[num,40-num];
    console.log(this.pieChartDataHum);
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
 

  
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(0,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  pushArrayTem10(arg0: number[],arg1:number[],arg2:number[]) {
    var status=[arg0,arg1,arg2];
    console.log(status);
status.forEach((element,i) => {

  element.forEach(element1 => {
    this.pushOneStat10(element1,i);
  });
});
  
  }



  pushArrayTem(arg0: number[],arg1:number[],arg2:number[]) {
    var status=[arg0,arg1,arg2];
    console.log(status);
status.forEach((element,i) => {

  element.forEach(element1 => {
    this.pushOneStat(element1,i);
  });
});
  
  }
 
 
  public lineChartData10: ChartDataSets[] = [
    { data: [], label: 'humidity' },
    { data: [], label: 'temperature' },
    { data: [], label: 'dirt' }
  ];
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'humidity' },
    { data: [], label: 'temperature' },
    { data: [], label: 'dirt' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartLabels10: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#F37947',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      console.log(x);
      console.log(i);
      const num = this.generateNumber(i);
      console.log(num);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }
  

  
  public pushOneStat10(stat:number,index:number): void {
    var num;
    var data:number[];


    
    if(index==0){
      this.lineChartData10.filter(x=>x.label=="temperature").forEach((x)=>{
       num  = stat;
       data  = x.data as number[];
      })
      data.push(num);
    }
    else if(index==1){
      this.lineChartData10.filter(x=>x.label=="humidity").forEach((x)=>{
         num = stat;
       data  = x.data as number[];
      })
      data.push(num);
      this.lineChartLabels10.push("|");
    }
    else if(index==2){
      this.lineChartData10.filter(x=>x.label=="dirt").forEach((x)=>{
         num = stat;
       data  = x.data as number[];
      })
      data.push(num/10);
      
    }
  }


  public pushOneStat(stat:number,index:number): void {
    var num;
    var data:number[];

    
    if(index==0){
      this.lineChartData.filter(x=>x.label=="temperature").forEach((x)=>{
       num  = stat;
       data  = x.data as number[];
      })
      data.push(num);
    }
    else if(index==1){
      this.lineChartData.filter(x=>x.label=="humidity").forEach((x)=>{
         num = stat;
       data  = x.data as number[];
      })
      data.push(num);
      this.lineChartLabels.push("|");
    }
    else if(index==2){
      this.lineChartData.filter(x=>x.label=="dirt").forEach((x)=>{
        num = stat;
      data  = x.data as number[];
     })
     data.push(num/10);
    }
  }
  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }
}
