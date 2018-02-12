import { Component, OnInit } from '@angular/core';
import { Category } from '../admin/category/category';
import { CategoryService } from '../admin/category/category.service';
import { CommonModule } from '@angular/common';  
import { Post } from '../admin/post/post';
import { PostLimitService } from './postlimit.service';
import { NgControl,NgForm } from '@angular/forms';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { User } from '../admin/user/user';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  providers:[CategoryService,PostLimitService]
})
export class IndexPageComponent implements OnInit {
  category:Category;
  allCategory:Category[];
  allpostLimit:Post[];
  busy: any;
  src: any;
  user:User;
  constructor(private categoryService:CategoryService,private postLimit:PostLimitService) { }
  page=5;
  ngOnInit() {
    
    this.getAllCategory();
    this.getAllPostLimit(this.page);
    this.user=JSON.parse(localStorage.getItem('currentUser'));
  }
  getAllCategory() {
    this.categoryService.getAll()
    .subscribe(
           data => [this.allCategory = data,this.user=JSON.parse(localStorage.getItem('currentUser'))]
          );       
  }
  getAllPostLimit(page:number) {
    this.postLimit.getAll(page)
    .subscribe(
           data => this.allpostLimit=data['content']
    );  
    
  }
  checkLogin(){
    return localStorage.getItem('currentUser')===null?false:true;
  }
  randomPost(){
    
  }
  logout(){
    localStorage.removeItem('currentUser');
  }
  // constructor(private httpCall: HttpCall, private router: Router, private activedRoute: ActivatedRoute, public languageService: LanguageServiceService, private http: Http) {
  
  // }
  

  
  
}
