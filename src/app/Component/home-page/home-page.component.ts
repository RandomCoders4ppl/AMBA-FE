import { Component,OnInit } from '@angular/core';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { Project } from 'src/app/Models/project';
import { QuestionService } from 'src/app/Service/question.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   
  projectList : Project[] = [];


  constructor(private projectCardSerive : ProjectCardService,private questionService: QuestionService){ }

  ngOnInit(): void {
    this.projectCardSerive.getAllProjects().subscribe(res => this.projectList = res);
  }

}
