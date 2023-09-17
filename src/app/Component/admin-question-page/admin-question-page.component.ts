import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl,Validators,FormGroup, FormArray} from '@angular/forms';
import { Project } from 'src/app/Models/project';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';


@Component({
  selector: 'app-admin-question-page',
  templateUrl: './admin-question-page.component.html',
  styleUrls: ['./admin-question-page.component.css']
})
export class AdminQuestionPageComponent implements OnInit{

  
  projects : Project[] = [];

  answer_index : String = '';
  
  form!: FormGroup;
  
  
  constructor(private formBuilder:FormBuilder,private projectService:ProjectCardService){}

  ngOnInit(): void {
    this.projectService.getAllProjectsNoImage().subscribe(res => this.projects = res);
    this.form = this.formBuilder.group({
      projectId : new FormControl(null),
      QuestionImage :  new FormControl(null),
      Options: new FormArray([]),
      answer_id :new FormControl(null),
    })
  }
  

  onSubmit(){
    this.form.controls['answer_id'].setValue(this.answer_index)
    console.log(this.form)
  }

  get getAllOptions(){
    return (this.form.get('Options') as FormArray).controls
  }

  addOption(){
   (this.form.get('Options') as FormArray).push(this.formBuilder.group({answer : '',answerImage: '',answer_index:''}))
  }
  
  

}
