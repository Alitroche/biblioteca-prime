import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Libro } from 'src/app/interfaces/libro.interfaces';
import { LibrosService } from 'src/app/servicios/libros.service'

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {

  codigo: number | null = null;
  titulo: string | null = null;
  autor: string | null = null;
  paginas : number | null = null;

  codigoValido: boolean = true;
  tituloValido: boolean = true;
  autorValido: boolean = true;
  paginasValido: boolean = true;
  
 guardado: boolean =false;
 mensajes: Message[] = [];


 modo: 'Registrar' | 'Editar' = 'Registrar';


 @Output()
 recargarLibros: EventEmitter<boolean> = new EventEmitter();

  constructor(
     private servicioLibros: LibrosService
   ){}

  ngOnInit(): void {
  }

  guardar(){
    this.validar();
    if(this.codigoValido && this.tituloValido && this.paginasValido){
      const libro: Libro= {
        id: this.codigo,
        titulo: this.titulo,
        autor: this.autor,
        paginas: this.paginas

      }
      if(this.modo === 'Registrar'){
        this.registrar(libro);
      }else{
        this.editar(libro);
      }

    }
  }

  private registrar(libro: Libro){

    this.guardado = true;
    this.servicioLibros.post(libro).subscribe({
      next: () => {
        this.guardado = false;
        this.mensajes=[{severity: 'success', summary: 'Éxito', detail: 'Se registro el libro'}];
        this.recargarLibros.emit(true);

      },
      error: (e) => {
        this.guardado = false;
        console.log(e);
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: e.error}];

      },
      
    });

  }
  private editar(libro: Libro){
    this.guardado = true;
    this.servicioLibros.put(libro).subscribe({
      next: () => {
        this.guardado = false;
        this.mensajes = [{ severity: 'sucess' , summary: 'Éxito', detail: 'Se edito el Libro'}];
        this.recargarLibros.emit(true);
      },
      error: (e) =>{
      this.guardado = false;
      console.log(e);
      this.mensajes = [{severity: 'error', summary: 'Error al editar' , detail: e.error}];
      }

    });

  }
  
  validar():boolean{
    this.codigoValido = this.codigo !== null;
    this.tituloValido = this.titulo !== null && this.titulo?.length > 0;
    this.autorValido = this.autor !== null && this.autor?.length > 0;
    this.paginasValido = this.paginas !== null;
    return this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido;
  }
  limpiarFormulario(){
    this.codigo = null;
    this.titulo = null;
    this.autor = null;
    this.paginas = null;

    this.codigoValido = true;
    this.tituloValido = true;
    this.autorValido = true;
    this.paginasValido = true;

    this.mensajes = [];
  }

}
