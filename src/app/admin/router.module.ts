import { Component,OnInit } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin.component';
import { IndexPageComponent } from '../index-page/index-page.component';
import { UploaderComponent } from './uploader/uploader.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentPageComponent } from '../content-page/content-page.component';
import { DetailComponent } from '../detail/detail.component';
import { ListcategoryComponent } from '../listcategory/listcategory.component';
import { LoginComponent } from '../login/login.component';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthGuardService as AuthGuard} from './auth-guard.service';
import { CommentComponent } from './comment/comment.component';
import { RegisterComponent } from '../register/register.component';


const routesConfig: Routes = [
    
    {path: 'admin',component:AdminComponent,canActivate:[AuthGuard],children:[
      {path:'',redirectTo:'admin',pathMatch:"full"},
      {path: 'news',component:PostComponent},
      {path: 'admin', component:AdminContentComponent},
      {path: 'category',component:CategoryComponent},
      {path: 'user',component:UserComponent},
      {path: 'comment',component:CommentComponent},
    ]},
    {path: '',component:IndexPageComponent,children:[
      {path: '',component:ContentPageComponent},
      {path: 'detail/:id',component:DetailComponent},
      {path:'cate/:id',component:ListcategoryComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]},
    {path: '**', component: IndexPageComponent}
  ]

  @NgModule({
    declarations: [
        AdminContentComponent,
        CategoryComponent,
        UserComponent,
        UploaderComponent,
        PostComponent,
        AdminComponent,
        IndexPageComponent,
        HeaderComponent,
        FooterComponent,
        CommentComponent
    ],
    imports: [
      RouterModule.forRoot(routesConfig,{ enableTracing: true }),
      CommonModule,
      FormsModule
    ],
    exports: [RouterModule],
    providers:[AuthGuard]
  })
  export class ContactModule { }
