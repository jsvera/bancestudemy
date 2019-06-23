import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';


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
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);