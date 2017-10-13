/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ResaLabTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SalleDetailComponent } from '../../../../../../main/webapp/app/entities/salle/salle-detail.component';
import { SalleService } from '../../../../../../main/webapp/app/entities/salle/salle.service';
import { Salle } from '../../../../../../main/webapp/app/entities/salle/salle.model';

describe('Component Tests', () => {

    describe('Salle Management Detail Component', () => {
        let comp: SalleDetailComponent;
        let fixture: ComponentFixture<SalleDetailComponent>;
        let service: SalleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ResaLabTestModule],
                declarations: [SalleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SalleService,
                    JhiEventManager
                ]
            }).overrideTemplate(SalleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Salle(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.salle).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
