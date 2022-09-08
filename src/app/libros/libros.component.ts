import { Component, OnInit } from '@angular/core';
import { Libro} from '../interfaces/libro.interfaces';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  listaLibros: Libro[] = [];
  cargando: boolean = false;

  constructor(
    private servicioLibros: LibrosService
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void{
    this.cargando = true;
    this.servicioLibros.get().subscribe({
      next: (datos) =>{
        this.listaLibros = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
      }
    });
  }
}
