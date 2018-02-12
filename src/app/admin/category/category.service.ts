import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Category } from './category';
@Injectable()
export class CategoryService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/category";
    getAll():Observable<Category[]>{
        return this.http.get(this.conn)
        .map(this.extractData)
        .catch(this.handleError)
    }
    create(category:Category):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.post(this.conn,category,options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    getbyid(categoryId:number):Observable<Category>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        console.log(this.conn+"/"+categoryId);
        return this.http.get(this.conn+"/"+categoryId)
        .map(this.extractData)
        .catch(this.handleError);
    }
    update(category:Category):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.put(this.conn+"/"+ category.cid, category, options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    deletebyId(categoryId:number):Observable<number>{
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.conn+"/"+ categoryId)
        .map(success=>success.status)
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