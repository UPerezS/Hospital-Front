import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicina } from '../models/medicina';

@Injectable({
  providedIn: 'root'
})
export class MedicinaService {
  url = 'http://localhost:4000/api/medicina';

  constructor(private http: HttpClient ) { }

  getMedicinas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarMedicina(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  guardarMedicina(medicina: Medicina): Observable<any> {
    return this.http.post(this.url, medicina);
  }

  obtenerMedicina(id: string):  Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  editarMedicina(id: string, nuevasExistencias: number): Observable<any> {
    const actualizacion = {
      cantidad: nuevasExistencias
    };
  
    return this.http.put(`${this.url}/${id}`, actualizacion);
  }
  
  filtrarMedicinas(selectedCategoria: string): Observable<Medicina[]> {
    const filtroUrl = `${this.url}/filtrar?categoria=${selectedCategoria}`;
    return this.http.get<Medicina[]>(filtroUrl);
  }
  
  
}
