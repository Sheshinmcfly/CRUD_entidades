import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Obtiene las entidades.
  getEntidad() {
    return this.http.get<any>('http://localhost:3000/posts')
      .pipe(map((res: any) => res))
  }

  // Crea nueva entidad.
  postEntidad(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data)
      .pipe(map((res: any) => res))
  }

  // Actualiza entidad.
  updateEntidad(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/posts/${id}`, data)
      .pipe(map((res: any) => res))
  }

  // Elimina entidad.
  deleteEntidad(id: number) {
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
      .pipe(map((res: any) => res))
  }


}
