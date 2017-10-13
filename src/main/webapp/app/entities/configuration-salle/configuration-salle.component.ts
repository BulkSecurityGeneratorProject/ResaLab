import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ConfigurationSalle } from './configuration-salle.model';
import { ConfigurationSalleService } from './configuration-salle.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-configuration-salle',
    templateUrl: './configuration-salle.component.html'
})
export class ConfigurationSalleComponent implements OnInit, OnDestroy {
configurationSalles: ConfigurationSalle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private configurationSalleService: ConfigurationSalleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.configurationSalleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.configurationSalles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConfigurationSalles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ConfigurationSalle) {
        return item.id;
    }
    registerChangeInConfigurationSalles() {
        this.eventSubscriber = this.eventManager.subscribe('configurationSalleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
