import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Injectable()
export class CountService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/";
    getCategoryCount():Observable<number>{
        return this.http.get(this.conn+'categorycount')
        .map(this.extractData)
        .catch(this.handleError)
    }
    getUserCount():Observable<number>{
        return this.http.get(this.conn+'usercount')
        .map(this.extractData)
        .catch(this.handleError)
    }
    getPostCount():Observable<number>{
        return this.http.get(this.conn+'postcount')
        .map(this.extractData)
        .catch(this.handleError)
    }
    getCommentCount():Observable<number>{
        return this.http.get(this.conn+'commentcount')
        .map(this.extractData)
        .catch(this.handleError)
    }
    private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}