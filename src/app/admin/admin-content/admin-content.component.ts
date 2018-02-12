import { Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css'],
  providers:[CountService]
})
export class AdminContentComponent implements OnInit {
  countCategory:number;
  countPost:number;
  countUser:number;
  countComment:number;
  constructor(private countService:CountService,private http:Http) { }

  ngOnInit() {
    this.countService.getCategoryCount().subscribe(data=>this.countCategory=data);
    this.countService.getPostCount().subscribe(data=>this.countPost=data);
    this.countService.getCommentCount().subscribe(data=>this.countComment=data);
    this.countService.getUserCount().subscribe(data=>this.countUser=data);
  }

}
