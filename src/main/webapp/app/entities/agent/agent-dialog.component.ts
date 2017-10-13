import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agent } from './agent.model';
import { AgentPopupService } from './agent-popup.service';
import { AgentService } from './agent.service';
import { Reservation, ReservationService } from '../reservation';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-agent-dialog',
    templateUrl: './agent-dialog.component.html'
})
export class AgentDialogComponent implements OnInit {

    agent: Agent;
    isSaving: boolean;

    reservations: Reservation[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private agentService: AgentService,
        private reservationService: ReservationService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reservationService.query()
            .subscribe((res: ResponseWrapper) => { this.reservations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agentService.update(this.agent));
        } else {
            this.subscribeToSaveResponse(
                this.agentService.create(this.agent));
        }
    }

    private subscribeToSaveResponse(result: Observable<Agent>) {
        result.subscribe((res: Agent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Agent) {
        this.eventManager.broadcast({ name: 'agentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReservationById(index: number, item: Reservation) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-agent-popup',
    template: ''
})
export class AgentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agentPopupService: AgentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agentPopupService
                    .open(AgentDialogComponent as Component, params['id']);
            } else {
                this.agentPopupService
                    .open(AgentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
