import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaLabSharedModule } from '../../shared';
import {
    ConfigurationSalleService,
    ConfigurationSallePopupService,
    ConfigurationSalleComponent,
    ConfigurationSalleDetailComponent,
    ConfigurationSalleDialogComponent,
    ConfigurationSallePopupComponent,
    ConfigurationSalleDeletePopupComponent,
    ConfigurationSalleDeleteDialogComponent,
    configurationSalleRoute,
    configurationSallePopupRoute,
} from './';

const ENTITY_STATES = [
    ...configurationSalleRoute,
    ...configurationSallePopupRoute,
];

@NgModule({
    imports: [
        ResaLabSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConfigurationSalleComponent,
        ConfigurationSalleDetailComponent,
        ConfigurationSalleDialogComponent,
        ConfigurationSalleDeleteDialogComponent,
        ConfigurationSallePopupComponent,
        ConfigurationSalleDeletePopupComponent,
    ],
    entryComponents: [
        ConfigurationSalleComponent,
        ConfigurationSalleDialogComponent,
        ConfigurationSallePopupComponent,
        ConfigurationSalleDeleteDialogComponent,
        ConfigurationSalleDeletePopupComponent,
    ],
    providers: [
        ConfigurationSalleService,
        ConfigurationSallePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaLabConfigurationSalleModule {}
