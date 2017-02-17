import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LayoutService {
    constructor(private http: Http) {
    }

    public getLayout(url: string): Observable<any> {
        return this.http.get(url).map((response: Response) => response.json());
    }
}