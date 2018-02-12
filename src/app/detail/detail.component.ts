import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http } from '@angular/http';
import {  } from '@angular/common';
import { PostService } from '../admin/post/post.service';
import { Post } from '../admin/post/post';
import { CommentService} from '../_services/comment.service';
import { Comments } from '../_services/comment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[PostService,CommentService]
})
export class DetailComponent implements OnInit {
  id:number;
  post: Post;
  comment:Comments[];
  pages: any;
  constructor(private route: ActivatedRoute,private postService:PostService,private commentService:CommentService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params)=>{
      this.id = params['id'];
      this.getPost(this.id);
      this.getComment(this.id);
    });
    
  }
  getPost(id:number){
    this.postService.getbyid(id).subscribe(data=> this.post=data);
  }
  getComment(id:number){
    this.commentService.getAllByPid(id).subscribe(data=>this.comment=data);
  }
  commentPost(str:String){
    if(str===null||str===""){
      return;
    }
    console.log(this.getTimeStamp());
    let username=JSON.parse(localStorage.getItem("currentUser")).username;
    let comment=new Comments(0,str,this.id,username,this.getTimeStamp());
    this.commentService.create(comment).subscribe(data=>this.getComment(this.id));
    
  }

  checkLogin(){
    return localStorage.getItem('currentUser')===null?false:true;
  }
  getTimeStamp() {
    let now = new Date();
    return (
            now.getFullYear() + "-" +
            (now.getMonth() + 1) + '-' +
            (now.getDate()) + ' ' +
             
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
  }
}
