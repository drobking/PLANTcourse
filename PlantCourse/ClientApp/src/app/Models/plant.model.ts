export class Plant{
    public id:number;
    public name:string;
    public humidity:number;
    public temperature:number;
    public humidityGras:number;
    public water:number;
    constructor(  id:number,
         name:string,
         humidity:number,
         temperature:number,
         humidityGras:number,
         water:number,){
             this.id=id;
             this.humidity=humidity;
             this.name=name;
             this.temperature=temperature;
             this.water=water;
             this.humidityGras=humidityGras;
         }
}