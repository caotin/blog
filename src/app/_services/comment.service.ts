import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Comments } from './comment';
@Injectable()
export class CommentService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/";
    getAll():Observable<Comments[]>{
        return this.http.get(this.conn+"comment")
        .map(this.extractData)
        .catch(this.handleError)
    }
    getAllByPid(pid:number):Observable<Comments[]>{
        return this.http.get(this.conn+"findcomment/"+pid)
        .map(this.extractData)
        .catch(this.handleError)
    }
    create(comment:Comments):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.post(this.conn+"comment",comment,options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    getbyid(categoryId:number):Observable<Comments>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        console.log(this.conn+"/"+categoryId);
        return this.http.get(this.conn+"/"+categoryId)
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    deletebyId(commentId:number):Observable<number>{
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.conn+"comment/"+ commentId)
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