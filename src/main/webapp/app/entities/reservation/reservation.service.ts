import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Reservation } from './reservation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReservationService {

    private resourceUrl = SERVER_API_URL + 'api/reservations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reservation: Reservation): Observable<Reservation> {
        const copy = this.convert(reservation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reservation: Reservation): Observable<Reservation> {
        const copy = this.convert(reservation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Reservation> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Reservation.
     */
    private convertItemFromServer(json: any): Reservation {
        const entity: Reservation = Object.assign(new Reservation(), json);
        entity.jourResa = this.dateUtils
            .convertLocalDateFromServer(json.jourResa);
        return entity;
    }

    /**
     * Convert a Reservation to a JSON which can be sent to the server.
     */
    private convert(reservation: Reservation): Reservation {
        const copy: Reservation = Object.assign({}, reservation);
        copy.jourResa = this.dateUtils
            .convertLocalDateToServer(reservation.jourResa);
        return copy;
    }
}
