import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';

interface Usuarios{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styles: './ejemplo1.component.css'
})
export default class Ejemplo1Component {
  formGroup! : FormGroup;

  materia = "pwa"

  tem = ''

  alumnos:Usuarios={
    nombre: '',
    edad: 0,
    email:''
  }
  constructor(private fb:FormBuilder) { }

    ngOnInit(): void{
      this.formGroup=this.initForm();
    }
    initForm():FormGroup{
      return this.fb.group({
        nombre:[''],
        edad:[''],
        email:[''],
      })
    }
    onSubmit():void{
      const{nombre, edad, email}=this.formGroup.value;

      this.alumnos.nombre=nombre;
      this.alumnos.edad=edad;
      this.alumnos.email=email;
      let alumnosJSON=JSON.stringify(this.alumnos)

      console.log(this.formGroup.value);

      localStorage.setItem('materia', this.materia);
      localStorage.setItem('alumnos', alumnosJSON)
    }

    subImprimir():void{
      this.tem=localStorage.getItem('materia')!
      
      const alumnoGuardado=localStorage.getItem('alimno')
      if(alumnoGuardado){
        const alumno:Usuarios=JSON.parse(alumnoGuardado)
      }
    }
}
