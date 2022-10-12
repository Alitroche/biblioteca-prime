import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = 'http://localhost:3000/libro';

  constructor(
    private http: HttpClient
  ) { }

 get():Observable<Libro[]> {
  return this.http.get<Libro[]>(this.url);

 }
 post(libro: Libro): Observable<any>{
  return this.http.post(this.url, libro, { responseType: 'text' });
 }

 put(libro: Libro): Observable<any>{
  return this.http.put(this.url, libro, { responseType: 'text'});
 }
  
}
