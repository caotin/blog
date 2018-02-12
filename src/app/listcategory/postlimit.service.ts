import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import { Post } from '../admin/post/post';
@Injectable()
export class PostLimitService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/";
    getAll(page:number):Observable<Post[]>{
        return this.http.get(this.conn+"postcategory/"+page)
        .map(this.extractData)
        .catch(this.handleError)
    }
   
    getbyid(id:number):Observable<Post>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        console.log(this.conn+"post"+"/"+id);
        return this.http.get(this.conn+"/"+id)
        .map(this.extractData)
        .catch(this.handleError);
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