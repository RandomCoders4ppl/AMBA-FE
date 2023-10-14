import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { QuestionPageComponent } from './Component/question-page/question-page.component';
import { AdminPageComponent } from './Component/admin-page/admin-page.component';
import { AdminQuestionPageComponent } from './Component/admin-question-page/admin-question-page.component';
import { AuthComponent } from './Component/auth/auth.component';

const routes: Routes = [
  {path:'project/:id',component:QuestionPageComponent},
  {path:'admin',component:AdminPageComponent},
  {path:'admin/questions',component:AdminQuestionPageComponent},
  {path:'login',component:AuthComponent},
  {path:'',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
