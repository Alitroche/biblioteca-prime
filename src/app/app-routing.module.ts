import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { LibrosComponent } from './libros/libros.component';

const routes: Routes = [
  { path: 'libros', component:LibrosComponent },
  { path: 'autores', component:AutoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
