import { Component, OnInit } from '@angular/core';
import { PostLimitService } from '../index-page/postlimit.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CountService } from '../admin/count.service';
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
  providers:[PostLimitService,CountService]
})
export class ContentPageComponent implements OnInit {

  allpostLimit:Post[];
  firstPost:Post;
  id:number;
  constructor(private postLimit:PostLimitService,private countSerive:CountService) { }
  pag=5;
  totalElements:number;

  post1:Post;
  post2:Post;
  post3:Post;
  ngOnInit() {
    
   
    this.getAllPostLimit(this.pag);
    this.randomPost();
  }
  getAllPostLimit(page:number) {
    
    this.postLimit.getAll(page)
    .subscribe(
           data => [this.allpostLimit=data['content'],this.firstPost=data.content[0],this.totalElements=data.totalElements]
          );  
  }
  randomPost(){
    let num=5;
    this.countSerive.getPostCount().subscribe(data=>num=data);
    let rand=Math.floor((Math.random() * (num-2)) + 2);
    console.log(num);
    this.postLimit.getAll(num)
    .subscribe(
           data => [this.post1=data.content[rand],this.post2=data.content[rand-1],this.post3=data.content[rand+1]]
          );  
  }
}

export  class Post{
  constructor(public pid:number,public name:String,public picture:String,public preview_text:String,public detail_text:String,public created_at:String,public updated_at:String,public cid:number,public user:String){
  }
}