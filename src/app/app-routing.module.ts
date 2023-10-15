import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMedicinasComponent } from './components/listar-medicinas/listar-medicinas.component';
import { RegActMedicinaComponent } from './components/reg-act-medicina/reg-act-medicina.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'reg-medicina', component: RegActMedicinaComponent },
  { path:'act-medicina/:id', component: RegActMedicinaComponent },
  { path:'listar-medicina', component: ListarMedicinasComponent },
  { path:'**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
