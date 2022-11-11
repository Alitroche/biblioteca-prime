import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../interfaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private url: string = "http://localhost:3000/autor"

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Autor[]>{
    return this.http.get<Autor[]>(this.url);
  }
}
