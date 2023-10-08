import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { NavbarService } from 'src/app/Service/navbar.service';
import { Question } from 'src/app/Models/question';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {


  constructor(private http: HttpClient, private route: ActivatedRoute, private questionService: QuestionService,
    public NabarService: NavbarService) {

  }


  ProjectName: string = 'Loading'

  list_of_question: Question[] = []
  currentQuestionIndex: number = 0;
  errors: any
  QuestionPageSize!: string;
  Page_number = 0;

  LastQuestionOfProject: Boolean = false;

  ngOnInit(): void {
    console.log("Current NavBarSize " + this.NabarService.heightOfNavbar)
    this.QuestionPageSize = `calc(100vh - ${this.NabarService.heightOfNavbar}px)`;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.http.get('http://localhost:8080/project/' + id).subscribe(
        res => {
          this.ProjectName = res.hasOwnProperty('projectName') ? JSON.parse(JSON.stringify(res)).projectName : '';
          this.questionService.getAllQuestionByProject(id,this.Page_number).subscribe(res => {
            this.list_of_question.push(...res)
            this.Page_number++;
            console.log("Adding new Question to List");
          })
        },
        error => {
          this.ProjectName = 'Invalid Project';
        });
    }
  }

  moveTONext() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.list_of_question.length) {
      this.fecthMoreQuestions();
    }
    console.log("Current Index : "+this.currentQuestionIndex)
  }
  moveToPrev() {
    this.currentQuestionIndex--;
    console.log("Current Index : "+this.currentQuestionIndex)
  }


  fecthMoreQuestions() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null)
      this.questionService.getAllQuestionByProject(id,this.Page_number).subscribe(res => {
        this.list_of_question.push(...res)
        this.Page_number++;
        console.log("Adding new Question to List");
      })
  }

}
