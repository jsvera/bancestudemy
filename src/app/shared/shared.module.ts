import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { FaviconComponent } from '../components/favicon/favicon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        AngularSvgIconModule,
        InlineSVGModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        FaviconComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        FaviconComponent
    ]
})
export class SharedModule{ }