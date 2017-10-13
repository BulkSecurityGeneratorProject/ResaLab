import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaLabSharedModule } from '../../shared';
import {
    SalleService,
    SallePopupService,
    SalleComponent,
    SalleDetailComponent,
    SalleDialogComponent,
    SallePopupComponent,
    SalleDeletePopupComponent,
    SalleDeleteDialogComponent,
    salleRoute,
    sallePopupRoute,
} from './';

const ENTITY_STATES = [
    ...salleRoute,
    ...sallePopupRoute,
];

@NgModule({
    imports: [
        ResaLabSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SalleComponent,
        SalleDetailComponent,
        SalleDialogComponent,
        SalleDeleteDialogComponent,
        SallePopupComponent,
        SalleDeletePopupComponent,
    ],
    entryComponents: [
        SalleComponent,
        SalleDialogComponent,
        SallePopupComponent,
        SalleDeleteDialogComponent,
        SalleDeletePopupComponent,
    ],
    providers: [
        SalleService,
        SallePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaLabSalleModule {}
