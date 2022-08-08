import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntidadModel } from './entidad-dashboard.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-entidad-dashboard',
  templateUrl: './entidad-dashboard.component.html'
})
export class EntidadDashboardComponent implements OnInit {

  formValue !: FormGroup;
  entidadModelObj: EntidadModel = new EntidadModel();
  entidadData !: any;
  mostrarAgregar !: boolean;
  mostrarActualizar !: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    // Construye el formulario para obtener los datos.
    this.formValue = this.formBuilder.group({
      nombre: [''],
      correo: [''],
      porcentaje: [''],
      activo: [''],
    });

    // Obtiene las entidades al iniciar.
    this.getEntidades();
  }


  // Setea los valores de los botones al hacer click en agregar entidad.
  clickAgregarEntidad() {

    this.formValue.reset();
    this.mostrarAgregar = true;
    this.mostrarActualizar = false;

    if (!this.formValue.value.activo) {
      this.formValue.controls['activo'].setValue(this.entidadModelObj.activo);
    }
  }

  // Crea una entidad.
  postNuevaEntidad() {

    if (!this.formValue.value.activo) {
      this.formValue.controls['activo'].setValue(this.entidadModelObj.activo);
    }

    this.entidadModelObj.nombre = this.formValue.value.nombre;
    this.entidadModelObj.correo = this.formValue.value.correo;
    this.entidadModelObj.porcentaje = parseFloat(this.formValue.value.porcentaje);
    this.entidadModelObj.activo = this.formValue.value.activo;

    this.api.postEntidad(this.entidadModelObj)
      .subscribe(() => {

        alert('Entidad agregada con exito!');

        let ref = document.getElementById('Cancelar');
        ref?.click();

        this.formValue.reset();
        this.getEntidades();
      },
        err => {
          alert('Algo salió mal!');
        })
  }


  // Obtiene las entidades.
  getEntidades() {

    this.api.getEntidad()
      .subscribe((res) => {
        this.entidadData = res;
      })
  }


  // Inserta los campos a editar en el formulario.
  editarEntidad(row: any) {

    this.mostrarAgregar = false;
    this.mostrarActualizar = true;
    this.entidadModelObj.id = row.id;
    this.formValue.controls['nombre'].setValue(row.nombre);
    this.formValue.controls['correo'].setValue(row.correo);
    this.formValue.controls['porcentaje'].setValue(row.porcentaje);
    this.formValue.controls['activo'].setValue(row.activo);
  }


  //Actualiza una entidad.
  updateEntidad() {

    if (!this.formValue.value.activo) {
      this.formValue.value.activo = false;
    }

    this.entidadModelObj.nombre = this.formValue.value.nombre;
    this.entidadModelObj.correo = this.formValue.value.correo;
    this.entidadModelObj.porcentaje = parseFloat(this.formValue.value.porcentaje);
    this.entidadModelObj.activo = this.formValue.value.activo;

    this.api.updateEntidad(this.entidadModelObj, this.entidadModelObj.id)
      .subscribe(() => {
        alert('Entidad actualizada con éxito!');

        let ref = document.getElementById('Cancelar');
        ref?.click();

        this.formValue.reset();
        this.getEntidades();
      })
  }


  // Elimina una entidad.
  deleteEntidad(row: any) {

    this.api.deleteEntidad(row.id)
      .subscribe(() => {
        alert('Entidad eliminada');
        this.getEntidades();
      })
  }

}
