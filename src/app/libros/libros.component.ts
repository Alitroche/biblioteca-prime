import { Component, OnInit, ViewChild } from '@angular/core';
import { Confirmation, ConfirmationService, Message } from 'primeng/api';
import { Libro} from '../interfaces/libro.interfaces';
import { LibrosService } from '../servicios/libros.service';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  @ViewChild('formulario') formLibro!: FormularioLibroComponent;

  listaLibros: Libro[] = [];
  cargando: boolean = false;
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar libro';

  constructor(
    private servicioLibros: LibrosService,
    private servivioConfirm: ConfirmationService
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
        this.mensajes = [{severity: 'error', summary: 'Error al cargar libros', detail:e.error}]
      }
    });
  }

  nuevo(){
    this.tituloDialogo = 'Registarar libro';
    this.formLibro.limpiarFormulario();
    this.formLibro.modo = 'Registrar';
    this.dialogoVisible = true;
  }

  editar(libro: Libro){
    this.formLibro.codigo = libro.id;
    this.formLibro.titulo = libro.titulo;
    this.formLibro.autor = libro.autor;
    this.formLibro.paginas = libro.paginas;
    this.formLibro.modo = 'Editar';
    this.dialogoVisible = true;
    this.tituloDialogo = 'Editar libro';
  }

  eliminar(libro: Libro){
    this.servivioConfirm.confirm({
      message: "¿Realmente desea eliminar el libro: '"+libro.id+"-"+libro.titulo+'-'+libro.autor+"'?",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      acceptIcon: 'pi pi-trash',
      accept:() => {
        this.servicioLibros.delete(libro).subscribe({
          next: ()=>{
            this.mensajes = [{severity: 'succes', summary: 'Éxito', detail: 'Se elimino correctamente el libro.'}];
            this.cargarLibros();
          },
          error: (e) =>{
            console.log(e);
            this.mensajes=[{severity: 'error', summary: 'Error al eliminar', detail: e.error}];
          }
        });
      }
    });
  }
}
