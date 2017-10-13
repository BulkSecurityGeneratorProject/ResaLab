import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Salle } from './salle.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SalleService {

    private resourceUrl = SERVER_API_URL + 'api/salles';

    constructor(private http: Http) { }

    create(salle: Salle): Observable<Salle> {
        const copy = this.convert(salle);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(salle: Salle): Observable<Salle> {
        const copy = this.convert(salle);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Salle> {
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
     * Convert a returned JSON object to Salle.
     */
    private convertItemFromServer(json: any): Salle {
        const entity: Salle = Object.assign(new Salle(), json);
        return entity;
    }

    /**
     * Convert a Salle to a JSON which can be sent to the server.
     */
    private convert(salle: Salle): Salle {
        const copy: Salle = Object.assign({}, salle);
        return copy;
    }
}
