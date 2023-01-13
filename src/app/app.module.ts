import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';

// Importar ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { interceptorProvider } from './service/interceptor-service.service';
import { NuevaExperienciaComponent } from './modales/experiencia/nueva-experiencia/nueva-experiencia.component';
import { NuevaEducacionComponent } from './modales/educacion/nueva-educacion/nueva-educacion.component';
import { ActualizarExperienciaComponent } from './modales/experiencia/actualizar-experiencia/actualizar-experiencia.component';
import { ActualizarEducacionComponent } from './modales/educacion/actualizar-educacion/actualizar-educacion.component';
import { EditarinfoComponent } from './modales/editarinfo/editarinfo.component';
import { NuevaHysComponent } from './modales/hys/nueva-hys/nueva-hys.component';
import { ActualizarHysComponent } from './modales/hys/actualizar-hys/actualizar-hys.component';
import { NuevoProyectoComponent } from './modales/proyecto/nuevo-proyecto/nuevo-proyecto.component';
import { ActualizarProyectoComponent } from './modales/proyecto/actualizar-proyecto/actualizar-proyecto.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    BannerComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectoComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NuevaExperienciaComponent,
    NuevaEducacionComponent,
    ActualizarExperienciaComponent,
    ActualizarEducacionComponent,
    EditarinfoComponent,
    NuevaHysComponent,
    ActualizarHysComponent,
    NuevoProyectoComponent,
    ActualizarProyectoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
