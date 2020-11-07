import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Plant } from '../Models/plant.model';
import { PlantService } from '../Services/Plant.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
//import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls:["fetch-data.component.css"],
  providers: [DatePipe]
})
export class FetchDataComponent {
  
  constructor(private plantService:PlantService,private datePipe: DatePipe,private spinner:NgxSpinnerService) { }
listOfDataPlant:Plant[]=[];

  ngOnInit(): void {
    this.spinner.show();
    this.plantService.getAllPlants().subscribe(data=>{
     // console.log(data);
        this.listOfDataPlant=data;
        //console.log("temperature");
       // console.log(this.listOfDataPlant.map(function(plant:Plant){return plant.temperature}));
        this.spinner.hide(); 
        //this.pushArrayHum(this.listOfDataPlant.map(function(plant:Plant){return plant.humidity}));
        this.pushArrayTem(this.listOfDataPlant.map(function(plant:Plant){return plant.temperature}),this.listOfDataPlant.map(function(plant:Plant){return plant.humidity}));

    this.pushArrayTem10(this.listOfDataPlant.map(function(plant:Plant){return plant.temperature}).slice(this.listOfDataPlant.length-10),this.listOfDataPlant.map(function(plant:Plant){return plant.humidity}).slice(this.listOfDataPlant.length-10));
    
      });
    
    
   
    
  }

  pushRoundHum(num:number): void{
   
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
  public pieChartLabels: Label[] = ['Humidity','%'];
  public pieChartDataHum: number[] = [300,100];
  public pieChartDataTem: number[] = [300,100];
  public pieChartDataWater: number[] = [300,100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }










  pushArrayTem10(arg0: number[],arg1:number[]) {
    var status=[arg0,arg1];
    console.log(status);
status.forEach((element,i) => {

  element.forEach(element1 => {
    this.pushOneStat10(element1,i);
  });
});
  
  }



  pushArrayTem(arg0: number[],arg1:number[]) {
    var status=[arg0,arg1];
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
    //{ data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'humidity' },
    { data: [], label: 'temperature' },
    //{ data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
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
 // public lineChartPlugins = [pluginAnnotations];

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
  // public pushOneHum(hum:number): void {
  //   this.lineChartData.filter(x=>x.label=="humidity").forEach((x) => {
  //     const num = hum;
  //     const data: number[] = x.data as number[];
  //     data.push(num);
  //   });
  //   this.lineChartLabels.push("|");
  // }

  
  public pushOneStat10(stat:number,index:number): void {
    var num;
    var data:number[];

//this.lineChartData.forEach((x, i) => {
     // console.log(x);
     // console.log(i);
   
      // if(i==1&&index==0){
      //   console.log("i==1&&index==0")
      //    num=stat;const data: number[] = x.data as number[];
      //    data.push(num);
         
      // }
      // else if(i==0&&index==1){
      //   console.log("i==0&&index==1")
      //   num=stat;const data: number[] = x.data as number[];
      // data.push(num);
      // this.lineChartLabels.push("|");
      // }
     // console.log(num);
      
   // });
    
    if(index==0){
      this.lineChartData10.filter(x=>x.label=="temperature").forEach((x)=>{
       num  = stat;
       data  = x.data as number[];
      })
      data.push(num);
      console.log(num);
     // this.lineChartLabels.push("|");
    }
    else if(index==1){
      this.lineChartData10.filter(x=>x.label=="humidity").forEach((x)=>{
         num = stat;
       data  = x.data as number[];
      })
      data.push(num);
      console.log(num);
      this.lineChartLabels10.push("|");
    }
  }


  public pushOneStat(stat:number,index:number): void {
    var num;
    var data:number[];

//this.lineChartData.forEach((x, i) => {
     // console.log(x);
     // console.log(i);
   
      // if(i==1&&index==0){
      //   console.log("i==1&&index==0")
      //    num=stat;const data: number[] = x.data as number[];
      //    data.push(num);
         
      // }
      // else if(i==0&&index==1){
      //   console.log("i==0&&index==1")
      //   num=stat;const data: number[] = x.data as number[];
      // data.push(num);
      // this.lineChartLabels.push("|");
      // }
     // console.log(num);
      
   // });
    
    if(index==0){
      this.lineChartData.filter(x=>x.label=="temperature").forEach((x)=>{
       num  = stat;
       data  = x.data as number[];
      })
      data.push(num);
      console.log(num);
     // this.lineChartLabels.push("|");
    }
    else if(index==1){
      this.lineChartData.filter(x=>x.label=="humidity").forEach((x)=>{
         num = stat;
       data  = x.data as number[];
      })
      data.push(num);
      console.log(num);
      this.lineChartLabels.push("|");
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
