import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CommonModule} from '@angular/common'
import { Routes,RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// import { AdminComponent } from './admin/admin.component';
// import { CategoryComponent } from './admin/category/category.component';
// import { AdminContentComponent } from './admin/admin-content/admin-content.component';

// import { IndexPageComponent } from './index-page/index-page.component';
import { LoginComponent } from './login/login.component';
import { ContactModule } from './admin/router.module';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { DetailComponent } from './detail/detail.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    // AdminComponent,
    // IndexPageComponent,
    LoginComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    DetailComponent,
    ListcategoryComponent,
    ContentPageComponent,
    RegisterComponent
    // CategoryComponent,
    // AdminContentComponent,
    
  ],
  imports: [
    BrowserModule,
    ContactModule,
    NgbModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
