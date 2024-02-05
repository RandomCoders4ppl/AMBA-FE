import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Service/report.service';

@Component({
  selector: 'app-user-question-view',
  templateUrl: './user-question-view.component.html',
  styleUrls: ['./user-question-view.component.css']
})
export class UserQuestionViewComponent implements OnInit{
  
  constructor(private route: ActivatedRoute,private report:ReportService){}

  @Input() questionID! : string;

  ngOnInit(): void {
   const email = this.route.snapshot.paramMap.get('email');
   if(email && this.questionID)
    this.report.getQuestion(email,this.questionID).subscribe(res=> console.log(res))
  }

}
