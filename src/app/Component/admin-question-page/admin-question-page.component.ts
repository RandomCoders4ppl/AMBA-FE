import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl,Validators,FormGroup, FormArray} from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Answer } from 'src/app/Models/answer';
import { Project } from 'src/app/Models/project';
import { Question } from 'src/app/Models/question';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { QuestionService } from 'src/app/Service/question.service';


@Component({
  selector: 'app-admin-question-page',
  templateUrl: './admin-question-page.component.html',
  styleUrls: ['./admin-question-page.component.css']
})
export class AdminQuestionPageComponent implements OnInit{

  
  projects : Project[] = [];
  question : Question[] = [];


  answer_index : String = '';
  
  form!: FormGroup;
  
  
  constructor(private formBuilder:FormBuilder,private projectService:ProjectCardService,private questionService : QuestionService){}

  ngOnInit(): void {
    this.projectService.getAllProjectsNoImage().subscribe(res => this.projects = res);
    this.form = this.formBuilder.group({
      projectId : new FormControl(null,Validators.required),
      QuestionImage :  new FormControl(null,Validators.required),
      questionText : new FormControl(null),
      Options: new FormArray([]),
      answer_id :new FormControl(null,Validators.required),
    })
  }
  newQuestion = true; 
  bulkUpload = false; 
     
 DisplayDiv() {  
    this.newQuestion = true; 
    this.bulkUpload = false;  
  }  
  DisplayDiv2() {  
    this.newQuestion = false; 
    this.bulkUpload = true;   
  }  
  

  onSubmit(){
    this.form.controls['answer_id'].setValue(this.answer_index)
    // before this need tto validate values 
    const formData = new FormData();
    formData.append('projectId', this.form.value.projectId);
    formData.append('QuestionImage', this.form.value.QuestionImage);
    formData.append('question_text',this.form.value.questionText)
    const ans : Answer[] = this.form.value.Options;
    formData.append('options', new Blob([JSON.stringify(ans)],{  type: "application/json"}));
    formData.append('answer_id', this.form.value.answer_id);
    this.questionService.postNewQuestion("http://localhost:8080/Question/new",formData)
    .subscribe(res=> console.log(res));
    console.log(this.projects)
    
  }

  get getAllOptions(){
    return (this.form.get('Options') as FormArray).controls
  }

  addOption(){
   (this.form.get('Options') as FormArray).push(this.formBuilder.group({answer : '',answerImage: ['']}))
  }
  
  setQuestionFile(event:Event){
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      this.form.get('QuestionImage')?.setValue(file)
    }
  }


  setOptionImageFile(event : Event,index :number){
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      this.convertFileToBase64(file).then(base64 => {
          (this.form.get('Options') as FormArray).at(index).patchValue({answerImage:base64})
      });
    }

  }
  downloadExcel() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/Question.docx';
    link.download = 'Question.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
}
  

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
  
      reader.onerror = error => reject(error);
  
      reader.readAsDataURL(file);
    });
  }
  
}
