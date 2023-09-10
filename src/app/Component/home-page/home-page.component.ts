import { Component,OnInit } from '@angular/core';
import { ProjectCardService } from 'src/app/Service/Shared/project-cards/project-card.service';
import { Project } from 'src/app/Models/project';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   
  projectList : Project[] = [];


  constructor(private projectCardSerive : ProjectCardService){ }

  ngOnInit(): void {
    this.projectCardSerive.getAllProjects().subscribe(res => this.projectList = res);
  }

}
