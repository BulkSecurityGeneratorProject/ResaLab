import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaLabSharedModule } from '../../shared';
import {
    ReservationService,
    ReservationPopupService,
    ReservationComponent,
    ReservationDetailComponent,
    ReservationDialogComponent,
    ReservationPopupComponent,
    ReservationDeletePopupComponent,
    ReservationDeleteDialogComponent,
    reservationRoute,
    reservationPopupRoute,
    ReservationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reservationRoute,
    ...reservationPopupRoute,
];

@NgModule({
    imports: [
        ResaLabSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReservationComponent,
        ReservationDetailComponent,
        ReservationDialogComponent,
        ReservationDeleteDialogComponent,
        ReservationPopupComponent,
        ReservationDeletePopupComponent,
    ],
    entryComponents: [
        ReservationComponent,
        ReservationDialogComponent,
        ReservationPopupComponent,
        ReservationDeleteDialogComponent,
        ReservationDeletePopupComponent,
    ],
    providers: [
        ReservationService,
        ReservationPopupService,
        ReservationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaLabReservationModule {}
