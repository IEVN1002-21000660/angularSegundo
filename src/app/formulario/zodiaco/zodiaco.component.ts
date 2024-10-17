import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuarios {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  ano: number;
  sexo: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styles: []
})

export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  materia = "pwa";
  tem = '';
  edad: number = 0;
  signoChino: string = '';
  imagenSigno: string = '';
  
  usuario: Usuarios = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    ano: 0,
    sexo: ''
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      ano: [''],
      sexo: [''],
    });
  }

  onSubmit(): void {
    const { nombre, apaterno, amaterno, dia, mes, ano, sexo } = this.formGroup.value;

    this.usuario.nombre = nombre;
    this.usuario.apaterno = apaterno;
    this.usuario.amaterno = amaterno;
    this.usuario.dia = dia;
    this.usuario.mes = mes;
    this.usuario.ano = ano;
    this.usuario.sexo = sexo;

    let usuarioJSON = JSON.stringify(this.usuario);
    console.log(this.formGroup.value);

    localStorage.setItem('materia', this.materia);
    localStorage.setItem('usuario', usuarioJSON);

    this.calcularEdadYSigno();
  }

  subImprimir(): void {
    this.tem = localStorage.getItem('materia')!;

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario: Usuarios = JSON.parse(usuarioGuardado);
      console.log(usuario); 
    }
  }

  calcularEdadYSigno(): void {
    const dia = this.formGroup.value.dia;
    const mes = this.formGroup.value.mes;
    const ano = this.formGroup.value.ano;

    const fechaNacimiento = new Date(ano, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    if (mes > hoy.getMonth() + 1 || (mes === hoy.getMonth() + 1 && dia > hoy.getDate())) {
      this.edad--;
    }

    this.signoChino = this.obtenerSignoChino(ano);
    this.imagenSigno = this.obtenerImagen(ano);
  }

  obtenerSignoChino(ano: number): string {
    const signos = [   
      'Rata', 
      'Buey', 
      'Tigre', 
      'Conejo',
      'Dragon',
      'Serpiente',
      'Caballo', 
      'Cabra', 
      'Mono',
      'Gallo', 
      'Perro', 
      'Jabalí'
    ];
    return signos[ano % 12];
  }

  obtenerImagen(ano: number): string {
    const signos = [
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/5-dragon-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/6-serpiente-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/7-caballo-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/8-cabra-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/9-mono-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/10-gallo-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/11-perro-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/12-cerdo-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/1-rata-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/2-buey-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/3-tigre-zodiaco-chino-1.jpg',
      'https://www.elmagoarcano.com/wp-content/uploads/2017/10/4-conejo-zodiaco-chino-1.jpg',
    ];
    return signos[ano % 12];
  }
}
