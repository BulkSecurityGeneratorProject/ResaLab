import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ResaLabReservationModule } from './reservation/reservation.module';
import { ResaLabConfigurationSalleModule } from './configuration-salle/configuration-salle.module';
import { ResaLabAgentModule } from './agent/agent.module';
import { ResaLabSalleModule } from './salle/salle.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ResaLabReservationModule,
        ResaLabConfigurationSalleModule,
        ResaLabAgentModule,
        ResaLabSalleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaLabEntityModule {}
