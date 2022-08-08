
// Modelo de la entidad.
export class EntidadModel {
    id: number = 0;
    nombre: string = '';
    correo: string = '';
    fecha: string = new Date().toLocaleDateString('es-Cl');
    porcentaje: number = 0;
    activo: boolean = true;
}

