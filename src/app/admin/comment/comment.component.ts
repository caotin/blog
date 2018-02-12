import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../_services/comment.service';
import { Comments } from '../../_services/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[CommentService]
})
export class CommentComponent implements OnInit {

  constructor(private commentService:CommentService) { }
  allComment:Comments[];
  ngOnInit() {
    this.getAllComment();
  }
  getAllComment(){
    this.commentService.getAll().subscribe(data=>this.allComment=data);
  }
  deleteComment(id:number){
    
    this.commentService.deletebyId(id).subscribe();
    this.getAllComment();
  }
}
