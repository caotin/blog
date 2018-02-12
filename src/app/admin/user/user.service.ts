import {Injectable} from '@angular/core';
import {Http,Response,Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import { User } from './user';
@Injectable()
export class UserService{
    constructor(private http: Http){}
    conn="http://localhost:8888/api/user";
    getAll():Observable<User[]>{
        return this.http.get(this.conn)
        .map(this.extractData)
        .catch(this.handleError)
    }
    create(user:User):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.post(this.conn,user,options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    getbyid(username:String):Observable<User>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        console.log(this.conn+"/"+username);
        return this.http.get(this.conn+"/"+username)
        .map(this.extractData)
        .catch(this.handleError);
    }
    update(user:User):Observable<number>{
        let cpHeaders=new Headers({"Content-Type":"application/json"});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.put(this.conn+"/"+ user.username, user, options)
        .map(success=>success.status)
        .catch(this.handleError);
    }
    deletebyId(username:String):Observable<String>{
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.conn+"/"+ username)
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