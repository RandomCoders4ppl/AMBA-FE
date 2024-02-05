import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Service/report.service';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit{

  QuestionCompleted : String[] = [];

  constructor(private route: ActivatedRoute,private report:ReportService){}

  ngOnInit(): void {
    const projectUuid = this.route.snapshot.paramMap.get('projectid');
    const email = this.route.snapshot.paramMap.get('email');
    if(projectUuid && email){
      this.report.getUserAnswerByProject(email,projectUuid).subscribe({
        next: (value) => {
          this.QuestionCompleted = value;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })
    }
  }


}
