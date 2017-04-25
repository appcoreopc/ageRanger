import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Person } from '../Person';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from './SearchParameterUrl';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

    private _dataList: any;
    private _searchResult: any;
    private _localhost: string = "http://localhost:62028";
    private _urlPersonAdd: string = this._localhost + "/api/person/add";
    private _urlPersonList: string = this._localhost + "/api/person/list";
    private _urlPersonSearch: string = this._localhost + "/api/person/search";

    isLoading: boolean = false;

    constructor(private http: Http) {
    }

    addPerson(person: Person): Observable<any> {
        if (person) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            return this.http.post(this._urlPersonAdd, JSON.stringify(person), options
            );
        }
        return null;
    };

    listPerson(): Observable<any> {
        return this.http.get(this._urlPersonList).map(data => {
            console.log(data);
            data.json();
        });
    };

    search(firstname: string, lastname: string) {

        var searchUrlParser = new URLSearchParams();
        var searchUrl =
            searchUrlParser.getSearchParameter(firstname, lastname);

        return this.http.get(this._urlPersonSearch + searchUrl).map(x => x.json()).subscribe(searchData => {
            this._searchResult = searchData;
        });
    }
}