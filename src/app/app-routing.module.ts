import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { ListaActionComponent } from './components/lista-action/lista-action.component';

const routes: Routes = [
  {  
    path: 'home', 
    component: ListaComponent
  },
  {  
    path: 'lista/:listaId', 
    component: ListaActionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
