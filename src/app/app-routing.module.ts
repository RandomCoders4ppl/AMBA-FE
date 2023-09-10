import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { QuestionPageComponent } from './Component/question-page/question-page.component';

const routes: Routes = [
  {path:'project/:id',component:QuestionPageComponent},
  { path:'',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
