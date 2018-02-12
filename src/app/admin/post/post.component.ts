// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-post',
//   templateUrl: './post.component.html',
//   styleUrls: ['./post.component.css']
// })
// export class PostComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators ,ReactiveFormsModule ,NgControl} from "@angular/forms";


import {PostService} from './post.service';
import {Post} from './post';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers:[PostService,CategoryService]
})
export class PostComponent implements OnInit {

  allpost: Post[];
  allCategory:Category[];
  formPost:NgForm;
  statusCode: number;
  requestProcessing = false;
  postIdToUpdate = null;
  processValidation = false;
  
  //Create constructor to get service instance
  constructor(private postService: PostService,private categoryService:CategoryService) {
    
  }

  //Create ngOnInit() and and load 
  ngOnInit(): void {
    this.getAll();
    this.getAllCategory();
    console.log(this.allCategory);
  }   
  getAllCategory(){
    this.categoryService.getAll()
    .subscribe(
           data => this.allCategory = data
          );  
  }
  //Fetch all 
  getAll() {
        this.postService.getAll()
        .subscribe(
               data => this.allpost = data,
               errorCode =>  this.statusCode = errorCode
              );   
  }
  //pid:number,name:String,picture:String,preview_text:String,detail_text:String,created_at:String, updated_at:String, cid:number, uid:String
  create(name:String,picture:String,preview_text:String,detail_text:String,cid:number,uid:String){
    let created_at:String;
    created_at=this.getTimeStamp();
    let post=new Post(null,name,picture,preview_text,detail_text,created_at,null,cid,uid);
    console.log(post);
    this.postService.create(post)
          .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAll();	
          },
            errorCode => this.statusCode = errorCode
          );
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

  save(pid:number,name:String,picture:String,preview_text:String,detail_text:String,created_at:String,updated_at:String,cid:number,uid:String){
    let post=new Post(pid,name,picture,preview_text,detail_text,created_at,updated_at,cid,uid);
    this.postService.update(post)
    .subscribe(successCode => {
    this.statusCode = successCode;
    this.getAll();	
    },
    errorCode => this.statusCode = errorCode);
  }	
  search(name:String){
    if(name===""||name===null) this.getAll();
    this.postService.searchByName(name).subscribe(data=>this.allpost=data);
  }
  //Delete article
  delete(id:number) {
     this.preProcessConfigurations();
     this.postService.deletebyId(id)
       .subscribe(successCode => {
          this.statusCode = 204;
           this.getAll();	
         },
           errorCode => this.statusCode = errorCode);    
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }

}
