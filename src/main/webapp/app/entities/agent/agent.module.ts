import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaLabSharedModule } from '../../shared';
import { ResaLabAdminModule } from '../../admin/admin.module';
import {
    AgentService,
    AgentPopupService,
    AgentComponent,
    AgentDetailComponent,
    AgentDialogComponent,
    AgentPopupComponent,
    AgentDeletePopupComponent,
    AgentDeleteDialogComponent,
    agentRoute,
    agentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agentRoute,
    ...agentPopupRoute,
];

@NgModule({
    imports: [
        ResaLabSharedModule,
        ResaLabAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AgentComponent,
        AgentDetailComponent,
        AgentDialogComponent,
        AgentDeleteDialogComponent,
        AgentPopupComponent,
        AgentDeletePopupComponent,
    ],
    entryComponents: [
        AgentComponent,
        AgentDialogComponent,
        AgentPopupComponent,
        AgentDeleteDialogComponent,
        AgentDeletePopupComponent,
    ],
    providers: [
        AgentService,
        AgentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaLabAgentModule {}
