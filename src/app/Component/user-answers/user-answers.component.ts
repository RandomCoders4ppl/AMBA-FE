import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit{

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    const projectUuid = this.route.snapshot.paramMap.get('projectid');
    const email = this.route.snapshot.paramMap.get('email');
    console.log(email,projectUuid)
  }


}
