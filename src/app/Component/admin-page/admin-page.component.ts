import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectType } from 'src/app/Models/project_type';
import { ProjectTypesService } from 'src/app/Service/project-types.service';
import { ProjectService } from 'src/app/Service/project.service';
import { NavbarService } from 'src/app/Service/navbar.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  Types! : ProjectType[]

  constructor(private formBuilder:FormBuilder,private ptSerivce : ProjectTypesService,private project : ProjectService, public NabarService: NavbarService){}

  NewTypeForm!: FormGroup;

  NewProjectForm!: FormGroup;

  ngOnInit(): void {
    this.NabarService.show();
    this.getProjects()
    this. NewTypeForm = this.formBuilder.group({
      NewType : new FormControl(null,Validators.required)
    })
    this.NewProjectForm = this.formBuilder.group({
      NewProjectType : new FormControl(null,Validators.required),
      NewProjectName : new FormControl(null,Validators.required),
      NewProjectImage : new FormControl(null)
    })

  }

  onNewTypeSubmit(){
      const newType : String= this.NewTypeForm.value.NewType;
      this.ptSerivce.saveNewProjectType(newType.trim()).subscribe(res=> this.getProjects())
  }


  onProjectSubmit(){
    const formData = new FormData();
    formData.append("projectName",this.NewProjectForm.value.NewProjectName)
    formData.append("ProjectType",this.NewProjectForm.value.NewProjectType)
    formData.append("image",this.NewProjectForm.value.NewProjectImage)
    this.project.saveNewProjectType(formData).subscribe(res => console.log(res))

  }
  
  setProjectFile(event : Event){
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      this.NewProjectForm.get('NewProjectImage')?.setValue(file)
    }
  }
   getProjects(){
    this.ptSerivce.getAllTypes().subscribe(res => { this.Types = res})
   }
}
