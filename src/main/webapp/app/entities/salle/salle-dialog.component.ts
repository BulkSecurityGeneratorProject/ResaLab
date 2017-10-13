import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Salle } from './salle.model';
import { SallePopupService } from './salle-popup.service';
import { SalleService } from './salle.service';
import { Reservation, ReservationService } from '../reservation';
import { ConfigurationSalle, ConfigurationSalleService } from '../configuration-salle';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-salle-dialog',
    templateUrl: './salle-dialog.component.html'
})
export class SalleDialogComponent implements OnInit {

    salle: Salle;
    isSaving: boolean;

    reservations: Reservation[];

    configurationsalles: ConfigurationSalle[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salleService: SalleService,
        private reservationService: ReservationService,
        private configurationSalleService: ConfigurationSalleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reservationService.query()
            .subscribe((res: ResponseWrapper) => { this.reservations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.configurationSalleService.query()
            .subscribe((res: ResponseWrapper) => { this.configurationsalles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(
                this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<Salle>) {
        result.subscribe((res: Salle) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Salle) {
        this.eventManager.broadcast({ name: 'salleListModification', content: 'OK'});
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

    trackConfigurationSalleById(index: number, item: ConfigurationSalle) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-salle-popup',
    template: ''
})
export class SallePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sallePopupService: SallePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sallePopupService
                    .open(SalleDialogComponent as Component, params['id']);
            } else {
                this.sallePopupService
                    .open(SalleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
