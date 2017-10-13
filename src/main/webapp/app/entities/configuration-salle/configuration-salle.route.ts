import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConfigurationSalleComponent } from './configuration-salle.component';
import { ConfigurationSalleDetailComponent } from './configuration-salle-detail.component';
import { ConfigurationSallePopupComponent } from './configuration-salle-dialog.component';
import { ConfigurationSalleDeletePopupComponent } from './configuration-salle-delete-dialog.component';

export const configurationSalleRoute: Routes = [
    {
        path: 'configuration-salle',
        component: ConfigurationSalleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigurationSalles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'configuration-salle/:id',
        component: ConfigurationSalleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigurationSalles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const configurationSallePopupRoute: Routes = [
    {
        path: 'configuration-salle-new',
        component: ConfigurationSallePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigurationSalles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'configuration-salle/:id/edit',
        component: ConfigurationSallePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigurationSalles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'configuration-salle/:id/delete',
        component: ConfigurationSalleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigurationSalles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
