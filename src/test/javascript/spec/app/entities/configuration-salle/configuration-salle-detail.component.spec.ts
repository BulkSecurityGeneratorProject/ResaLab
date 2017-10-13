/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ResaLabTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConfigurationSalleDetailComponent } from '../../../../../../main/webapp/app/entities/configuration-salle/configuration-salle-detail.component';
import { ConfigurationSalleService } from '../../../../../../main/webapp/app/entities/configuration-salle/configuration-salle.service';
import { ConfigurationSalle } from '../../../../../../main/webapp/app/entities/configuration-salle/configuration-salle.model';

describe('Component Tests', () => {

    describe('ConfigurationSalle Management Detail Component', () => {
        let comp: ConfigurationSalleDetailComponent;
        let fixture: ComponentFixture<ConfigurationSalleDetailComponent>;
        let service: ConfigurationSalleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResaLabTestModule],
                declarations: [ConfigurationSalleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConfigurationSalleService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConfigurationSalleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfigurationSalleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfigurationSalleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ConfigurationSalle(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.configurationSalle).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
