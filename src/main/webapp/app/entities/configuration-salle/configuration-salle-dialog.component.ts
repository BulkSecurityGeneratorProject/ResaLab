import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConfigurationSalle } from './configuration-salle.model';
import { ConfigurationSallePopupService } from './configuration-salle-popup.service';
import { ConfigurationSalleService } from './configuration-salle.service';
import { Salle, SalleService } from '../salle';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-configuration-salle-dialog',
    templateUrl: './configuration-salle-dialog.component.html'
})
export class ConfigurationSalleDialogComponent implements OnInit {

    configurationSalle: ConfigurationSalle;
    isSaving: boolean;

    salles: Salle[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private configurationSalleService: ConfigurationSalleService,
        private salleService: SalleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.salleService.query()
            .subscribe((res: ResponseWrapper) => { this.salles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.configurationSalle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.configurationSalleService.update(this.configurationSalle));
        } else {
            this.subscribeToSaveResponse(
                this.configurationSalleService.create(this.configurationSalle));
        }
    }

    private subscribeToSaveResponse(result: Observable<ConfigurationSalle>) {
        result.subscribe((res: ConfigurationSalle) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ConfigurationSalle) {
        this.eventManager.broadcast({ name: 'configurationSalleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSalleById(index: number, item: Salle) {
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
    selector: 'jhi-configuration-salle-popup',
    template: ''
})
export class ConfigurationSallePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configurationSallePopupService: ConfigurationSallePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.configurationSallePopupService
                    .open(ConfigurationSalleDialogComponent as Component, params['id']);
            } else {
                this.configurationSallePopupService
                    .open(ConfigurationSalleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
