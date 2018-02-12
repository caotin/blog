import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../admin/category/category.service';
import { PostService } from '../admin/post/post.service';
import { Category } from '../admin/category/category';
import { Post } from '../content-page/content-page.component';
import { PostLimitService } from './postlimit.service';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css'],
  providers:[PostLimitService,CategoryService]
})
export class ListcategoryComponent implements OnInit {
  allCategory:Category[];
  postLimit:Post[];
  id:number;
  paramsSub:any;
  category:Category; 
  constructor(private route: ActivatedRoute,private categoryService:CategoryService,private postService:PostLimitService) { }

  ngOnInit() {
    this.paramsSub=this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getAllPostLimit(this.id);
      this.getCategory(this.id);
    });
    this.getAllPostLimit(this.id);
  }

  getAllPostLimit(page:number) {
    this.postService.getAll(page)
    .subscribe(
          data => this.postLimit=data
    );  
  }
  getCategory(id:number){
    this.categoryService.getbyid(id).subscribe(data=>this.category=data);
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
