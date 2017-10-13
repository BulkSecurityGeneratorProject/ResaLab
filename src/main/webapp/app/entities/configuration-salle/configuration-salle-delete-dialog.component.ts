import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigurationSalle } from './configuration-salle.model';
import { ConfigurationSallePopupService } from './configuration-salle-popup.service';
import { ConfigurationSalleService } from './configuration-salle.service';

@Component({
    selector: 'jhi-configuration-salle-delete-dialog',
    templateUrl: './configuration-salle-delete-dialog.component.html'
})
export class ConfigurationSalleDeleteDialogComponent {

    configurationSalle: ConfigurationSalle;

    constructor(
        private configurationSalleService: ConfigurationSalleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.configurationSalleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'configurationSalleListModification',
                content: 'Deleted an configurationSalle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-configuration-salle-delete-popup',
    template: ''
})
export class ConfigurationSalleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configurationSallePopupService: ConfigurationSallePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.configurationSallePopupService
                .open(ConfigurationSalleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
