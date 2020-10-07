import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  municipios = ['Cali', 'Candelaria', 'Dagua', 'Florida', 'Jamundí'];
  areas = ['Administración', 'Dirección', 'Ventas'];
  cargos = ['Analista', 'Director', 'Operario'];
  generos = ['Femenino', 'Masculino'];
  edad: number;
  antiguedad: string;
  dias_vacaciones: number;
  dias_suplementarios: number;
  active_modal = false;
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nacimiento: ['', Validators.required],
      municipio: ['', Validators.required],
      area: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required],
      ingreso: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  calcularEdad(nacimiento) {
    let fecha_nacimiento = new Date(nacimiento);
    let now = new Date();
    let diff = Math.floor(now.getTime() - fecha_nacimiento.getTime());
    let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 31 * 12));
    this.edad = years;
    return years;
  }

  antiguedadAños(ingreso) {
    let fecha_ingreso = new Date(ingreso);
    let now = new Date();
    let diff = Math.floor(now.getTime() - fecha_ingreso.getTime());
    let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 31 * 12));
    return years;
  }

  antiguedadMeses(ingreso) {
    let fecha_ingreso = new Date(ingreso);
    let now = new Date();
    let diff = Math.floor(now.getTime() - fecha_ingreso.getTime());
    let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 31));
    return months;
  }

  calcularAntiguedad() {
    this.antiguedad =
      this.antiguedadMeses(this.ingreso.value) >= 12
        ? `${this.antiguedadAños(this.ingreso.value)} años`
        : `${this.antiguedadMeses(this.ingreso.value)} meses`;
  }

  diasVacaciones() {
    this.dias_suplementarios = 0;
    this.dias_vacaciones = 0;
    if (
      this.cargo.value == 'Director' &&
      this.calcularEdad(this.nacimiento.value) <= 35 &&
      this.antiguedadAños(this.ingreso.value) >= 3
    )
      this.dias_suplementarios = 2;
    if (
      this.cargo.value == 'Director' &&
      this.calcularEdad(this.nacimiento.value) <= 45 &&
      this.antiguedadAños(this.ingreso.value) >= 5
    )
      this.dias_suplementarios = 4;
    if (this.antiguedadMeses(this.ingreso.value) >= 12)
      this.dias_vacaciones =
        10 * this.antiguedadAños(this.ingreso.value) + this.dias_suplementarios;
    else
      this.dias_vacaciones =
        Math.floor(0.5 * this.antiguedadMeses(this.ingreso.value)) +
        this.dias_suplementarios;
  }

  createEmployee() {
    this.calcularAntiguedad();
    this.diasVacaciones();
    this.active_modal = true;
  }

  closeModal() {
    this.active_modal = false;
  }

  get cedula() {
    return this.employeeForm.get('cedula');
  }
  get nombre() {
    return this.employeeForm.get('nombre');
  }
  get apellido() {
    return this.employeeForm.get('apellido');
  }
  get nacimiento() {
    return this.employeeForm.get('nacimiento');
  }
  get municipio() {
    return this.employeeForm.get('municipio');
  }
  get area() {
    return this.employeeForm.get('area');
  }
  get cargo() {
    return this.employeeForm.get('cargo');
  }
  get salario() {
    return this.employeeForm.get('salario');
  }
  get ingreso() {
    return this.employeeForm.get('ingreso');
  }
  get genero() {
    return this.employeeForm.get('genero');
  }
}
