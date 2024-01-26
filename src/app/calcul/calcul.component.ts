import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-calcul',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcul.component.html',
  styleUrl: './calcul.component.css'
})
export class CalculComponent {
  finalResult: string | undefined;
  Afficher!: boolean;

  onSubmitConvertUnity(formData: NgForm){
    let c : Calc;
    c = new Calc(formData.value.value, 
      formData.value.depart, 
      formData.value.arrival);
      this.finalResult=Convertisseur.ajouterResultat(c);
      console.log(this.finalResult);
  }

  onClick() {
    this.Afficher = true;
    }
    

}

export class Convertisseur {

  static ajouterResultat(c: Calc): string|undefined {
    let frtemp;
    let sUnity = unityTranslate(c.startUnity);
    let fUnity = unityTranslate(c.endUnity); 
    let finalResulttemp = (c.nombre * sUnity) / fUnity;
    console.log(finalResulttemp);
    const epsilon = 1e-10;
    if (finalResulttemp > epsilon){
      frtemp = finalResulttemp.toLocaleString("fr", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      });
    }
    if (finalResulttemp <= epsilon){
      frtemp =finalResulttemp;
    }
    let finalResult = `${c.nombre}${c.startUnity} = ${frtemp}${c.endUnity} `;
  
  return finalResult;
   }
}

export class Calc {
  nombre: number;
  startUnity: string;
  endUnity: string;
  
  constructor(nombre: number, startUnity: string, endUnity: string){
    this.nombre = nombre;
    this.startUnity = startUnity;
    this.endUnity = endUnity;
}
}


function unityTranslate(u: string): number {
  switch(u){
    case "km" :
      return 1000;
    case "dcm" :
      return 10;
    case "m" :
      return 1;
    case "dm" :
      return 0.1;
    case "cm":
      return 1e-2;
    case "mm":
      return 1e-3;
    case "um":
      return 1e-6;
    case "nm" :
      return 1e-9;
    default:
      return 0;
  }
}

