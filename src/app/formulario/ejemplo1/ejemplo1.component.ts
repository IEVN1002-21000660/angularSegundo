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
export class Ejemplo1Component {
  fromGroup! : FormGroup;

  constructor(private fb:FormBuilder) { }

    ngOnInit(): void{
      this.fromGroup=this.initForm();
    }
    initForm():FormGroup{
      return this.fb.group({
        nombre:[''],
        edad:[''],
        email:[''],
      })
    }
    onSubmit():void{
      console.log(this.fromGroup.value);
    }
}
