import { Component,OnInit } from '@angular/core';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit{

  
  constructor(private http : HttpClient,private route: ActivatedRoute,private questionService : QuestionService){}
  
  errors : any

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !==null){
    this.http.get('http://localhost:8080/project/'+id).subscribe(res=> this.questionService.getAllQuestionByProject(id).subscribe(res => console.log(res)));
  }
    
  }

}
