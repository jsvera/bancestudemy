import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//GUARDS
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard } from '../services/services.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard', descripcion: 'se encuentra en el Dashboard...' }},
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress', descripcion: 'se encuentra en el Progress...'}},
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas', descripcion: 'se encuentra en Gráficas...'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas',descripcion: 'se encuentra en Promesas...'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs',descripcion: 'se encuentra en el RxJs...' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema',descripcion: 'se encuentra en Ajustes del Tema...' }},
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario', descripcion: 'Muestra perfil del usuario'} },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador', descripcion: 'Muestra un buscador'} },

            //MANTENIMIENTOS
            { 
                path: 'usuarios', 
                component: UsuariosComponent, 
                canActivate: [ AdminGuard ],
                data: {titulo: 'Mantenimiento de Usuarios', descripcion: 'Muestra el mantenimiento de usuario'} 
            },
           
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales', descripcion: 'Muestra el mantenimiento de hospitales'} },
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos', descripcion: 'Muestra el mantenimiento de medicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico', descripcion: 'Muestra el formulario de medico'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);