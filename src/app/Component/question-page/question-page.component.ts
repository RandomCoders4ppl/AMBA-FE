import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { NavbarService } from 'src/app/Service/navbar.service';
import { Question } from 'src/app/Models/question';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {


  constructor(private http: HttpClient, private route: ActivatedRoute, private questionService: QuestionService,
    public NabarService: NavbarService, private formBuilder: FormBuilder, public dialog: MatDialog) {

  }


  ProjectName: string = 'Loading'

  list_of_question: Question[] = []
  currentQuestionIndex: number = 0;
  errors: any
  QuestionPageSize!: string;
  Page_number = 0;

  LastQuestionOfProject: Boolean = false;

  Answer!: FormGroup;

  ngOnInit(): void {
    this.Answer = this.formBuilder.group({
      answerIndex: new FormControl(null, Validators.required)
    })
    console.log("Current NavBarSize " + this.NabarService.heightOfNavbar)
    this.QuestionPageSize = `calc(100vh - ${this.NabarService.heightOfNavbar}px)`;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.http.get('http://localhost:8080/project/' + id).subscribe(
        res => {
          this.ProjectName = res.hasOwnProperty('projectName') ? JSON.parse(JSON.stringify(res)).projectName : '';
          this.questionService.getAllQuestionByProject(id, this.Page_number).subscribe(res => {
            this.list_of_question.push(...res)
            this.Page_number++;
            console.log("Adding new Question to List");
            if (this.list_of_question.length === 0) this.openDialog({ header: "congratulations | Project Completed", text: "Try some Other Project" })
          })
        },
        error => {
          this.ProjectName = 'Invalid Project';
        });
    }
  }

  moveTONext() {
    this.currentQuestionIndex++;
    this.currentQuestionIndex = this.currentQuestionIndex > this.list_of_question.length
      ? this.list_of_question.length : this.currentQuestionIndex
    if (this.currentQuestionIndex === this.list_of_question.length) {
      this.fecthMoreQuestions();
    }
    this.Answer.reset()
    console.log("Current Index : " + this.currentQuestionIndex + " Question no : " + this.list_of_question.at(this.currentQuestionIndex)?.questionNumber)
  }
  moveToPrev() {
    this.currentQuestionIndex--;
    if (this.currentQuestionIndex < 0) {
      console.log("No More Question")
      this.currentQuestionIndex = 0;
      this.openDialog({
        header: "NO Prev Question Available",
        text: "Try Next Button"
      })

    }
    this.Answer.reset()
    console.log("Current Index : " + this.currentQuestionIndex + " Question no : " + this.list_of_question.at(this.currentQuestionIndex)?.questionNumber)
  }


  fecthMoreQuestions() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null)
      this.questionService.getAllQuestionByProject(id, this.Page_number).subscribe(res => {
        this.Answer.reset()
        this.list_of_question.push(...res)
        this.Page_number++;
        console.log("Adding new Question to List");
        if (res.length === 0) {
          this.openDialog({
            header: "congratulations | Project Completed",
            text: "Try some Other Project"
          }); this.currentQuestionIndex--;
        }
      })
  }

  onAnswerChange() {
    const question = this.list_of_question.at(this.currentQuestionIndex);
    if (question && question.questionID) {
      console.log(this.Answer.value.answerIndex)
      this.questionService.subQuestionAnswer(question.questionID, this.Answer.value.answerIndex).subscribe(res => console.log(res))
    }
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(PopUpComponent, { data: data });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
