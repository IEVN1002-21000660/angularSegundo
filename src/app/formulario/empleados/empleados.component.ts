import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleados {
  matricula: number;
  nombre: string;
  mail: string;
  edad: number;
  horas: number;
  horasPagadas?: number;
  horasExtra?: number;
  horasExtraPagadas?: number;
  total?: number;
}

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styles: ``,
})
export default class EmpleadoComponent implements OnInit {
  formGroup!: FormGroup;
  empleadosVista: Empleados[] = [];

  datos: Empleados = {
    matricula: 0,
    nombre: '',
    mail: '',
    edad: 0,
    horas: 0,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      mail: [''],
      edad: [0],
      horas: [0],
    });
  }

  private obtenerEmpleados(): Empleados[] {
    const empleadosLocal = localStorage.getItem('empleados');
    return empleadosLocal ? JSON.parse(empleadosLocal) : [];
  }


  private guardarEmpleados(empleados: Empleados[]): void {
    localStorage.setItem('empleados', JSON.stringify(empleados));
  }


  private buscarEmpleado(matricula: number): Empleados | undefined {
    const empleados = this.obtenerEmpleados();
    return empleados.find(emp => emp.matricula === matricula);
  }


  private actualizarEmpleado(empleado: Empleados, nuevosDatos: Partial<Empleados>): Empleados {
 
    const actualizacionSegura: Partial<Empleados> = {};
    if (nuevosDatos.nombre && nuevosDatos.nombre.trim() !== '') actualizacionSegura.nombre = nuevosDatos.nombre;
    if (nuevosDatos.mail && nuevosDatos.mail.trim() !== '') actualizacionSegura.mail = nuevosDatos.mail;
    if (nuevosDatos.edad && nuevosDatos.edad > 0) actualizacionSegura.edad = nuevosDatos.edad;
    if (nuevosDatos.horas && nuevosDatos.horas > 0) actualizacionSegura.horas = nuevosDatos.horas;

    return { ...empleado, ...actualizacionSegura };
  }

  modificar(): void {
    const { matricula, nombre, mail, edad, horas } = this.formGroup.value;
    const empleados = this.obtenerEmpleados();
    const empleadoIndex = empleados.findIndex(emp => emp.matricula === matricula);

    if (empleadoIndex !== -1) {
      const empleado = empleados[empleadoIndex];
      empleados[empleadoIndex] = this.actualizarEmpleado(empleado, { nombre, mail, edad, horas });
      
      this.guardarEmpleados(empleados);
      alert('Empleado modificado correctamente.');
      this.imprimir();
    } else {
      alert('Empleado no encontrado.');
    }
  }

  eliminar(): void {
    const { matricula } = this.formGroup.value;
    let empleados = this.obtenerEmpleados();
    
    const nuevoEmpleados = empleados.filter(emp => emp.matricula !== matricula);
    
    if (empleados.length !== nuevoEmpleados.length) {
      this.guardarEmpleados(nuevoEmpleados);
      alert('Empleado eliminado correctamente.');
      this.imprimir();
    } else {
      alert('Empleado no encontrado.');
    }
  }

  onSubmit(): void {
    const nuevoEmpleado = this.formGroup.value as Empleados;
    const empleados = this.obtenerEmpleados();
  

    if (!this.buscarEmpleado(nuevoEmpleado.matricula)) {
      empleados.push(nuevoEmpleado);
      this.guardarEmpleados(empleados);
      alert('Empleado añadido correctamente.');
    } else {
      alert('Ya existe un empleado con esa matrícula.');
    }
  
  }

  calcularTotalPagado(): number {
    return this.empleadosVista.reduce((sum, empleado) => sum + (empleado.total || 0), 0);
  }
  
  imprimir(): void {
    const empleados = this.obtenerEmpleados();
    empleados.forEach(empleado => {
      const horasExtras = Math.max(empleado.horas - 40, 0);
      empleado.horasPagadas = (empleado.horas - horasExtras) * 70;
      empleado.horasExtra = horasExtras;
      empleado.horasExtraPagadas = horasExtras * 140;
      empleado.total = empleado.horasPagadas + empleado.horasExtraPagadas;
      
    });
  
    this.empleadosVista = empleados;
  }
  
}
