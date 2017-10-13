import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SalleComponent } from './salle.component';
import { SalleDetailComponent } from './salle-detail.component';
import { SallePopupComponent } from './salle-dialog.component';
import { SalleDeletePopupComponent } from './salle-delete-dialog.component';

export const salleRoute: Routes = [
    {
        path: 'salle',
        component: SalleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salle/:id',
        component: SalleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sallePopupRoute: Routes = [
    {
        path: 'salle-new',
        component: SallePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle/:id/edit',
        component: SallePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle/:id/delete',
        component: SalleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
