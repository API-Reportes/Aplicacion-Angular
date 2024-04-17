import { Routes } from '@angular/router';
import { LoginComponent } from './aplicacion/login/login.component';
import { SingupComponent } from './aplicacion/singup/singup.component';
import { HomeComponent } from './aplicacion/home/home.component';
import { CrearPreguntasComponent } from './preguntas/crear-preguntas/crear-preguntas.component';
import { EditarPreguntaComponent } from './preguntas/editar-pregunta/editar-pregunta.component';
import { CrearReportesComponent } from './reportes/crear-reportes/crear-reportes.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { PerfilUsuarioComponent } from './aplicacion/perfil-usuario/perfil-usuario.component';
import { RegistroReportesComponent } from './reportes/registro-reportes/registro-reportes.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path : 'Login', component : LoginComponent },
  { path : 'Registro', component : SingupComponent },
  { path : 'Home', component : HomeComponent, },
  { path : '', component : HomeComponent, },
  { path : 'Preguntas', component : CrearPreguntasComponent, canActivate: [authGuard] },
  { path : 'borrarPregunta', component : EditarPreguntaComponent, canActivate: [authGuard] },
  { path : 'Reportes', component : CrearReportesComponent, canActivate: [authGuard] },
  { path : 'borrarUsuario', component : EditarUsuarioComponent, canActivate: [authGuard] },
  { path : 'perfilUsuario', component : PerfilUsuarioComponent, canActivate: [authGuard] },
  { path : 'registroReportes', component : RegistroReportesComponent, canActivate: [authGuard] },
];
