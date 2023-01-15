import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditarinfoComponent } from './modales/editarinfo/editarinfo.component';
import { ActualizarEducacionComponent } from './modales/educacion/actualizar-educacion/actualizar-educacion.component';
import { NuevaEducacionComponent } from './modales/educacion/nueva-educacion/nueva-educacion.component';
import { ActualizarExperienciaComponent } from './modales/experiencia/actualizar-experiencia/actualizar-experiencia.component';
import { NuevaExperienciaComponent } from './modales/experiencia/nueva-experiencia/nueva-experiencia.component';
import { ActualizarHysComponent } from './modales/hys/actualizar-hys/actualizar-hys.component';
import { NuevaHysComponent } from './modales/hys/nueva-hys/nueva-hys.component';
import { ActualizarProyectoComponent } from './modales/proyecto/actualizar-proyecto/actualizar-proyecto.component';
import { NuevoProyectoComponent } from './modales/proyecto/nuevo-proyecto/nuevo-proyecto.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'acercade/edit/:id',
    component: EditarinfoComponent,
    outlet: 'modal'
  },
  {
    path: 'experiencia/nueva',
    component: NuevaExperienciaComponent,
    outlet: 'modal'
  },
  {
    path: 'experiencia/actualizar/:id',
    component: ActualizarExperienciaComponent,
    outlet: 'modal'
  },
  {
    path: 'educacion/nueva',
    component: NuevaEducacionComponent,
    outlet: 'modal'
  },
  {
    path: 'educacion/actualizar/:id',
    component: ActualizarEducacionComponent,
    outlet: 'modal'
  },
  {
    path: 'proyectos/nuevo',
    component: NuevoProyectoComponent,
    outlet: 'modal'
  },
  {
    path: 'proyectos/actualizar/:id',
    component: ActualizarProyectoComponent,
    outlet: 'modal'
  },
  {
    path: 'skills/nueva',
    component: NuevaHysComponent,
    outlet: 'modal'
  },
  {
    path: 'skills/actualizar/:id',
    component: ActualizarHysComponent,
    outlet: 'modal'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
