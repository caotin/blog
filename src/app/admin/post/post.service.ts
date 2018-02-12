import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import { Post } from './post';
@Injectable()
export class PostService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/post";
    getAll():Observable<Post[]>{
        return this.http.get(this.conn)
        .map(this.extractData)
        .catch(this.handleError)
    }
    create(post:Post):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.post(this.conn,post,options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    getbyid(id:number):Observable<Post>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        console.log(this.conn+"/"+id);
        return this.http.get(this.conn+"/"+id)
        .map(this.extractData)
        .catch(this.handleError);
    }
    searchByName(search:String):Observable<Post[]>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        
        return this.http.get("http://localhost:8888/api/postsearch/"+search)
        .map(this.extractData)
        .catch(this.handleError);
    }
    update(post:Post):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.put(this.conn+"/"+ post.pid, post, options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    deletebyId(id:number):Observable<number>{
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.conn+"/"+ id)
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