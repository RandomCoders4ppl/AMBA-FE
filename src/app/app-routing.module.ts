import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { QuestionPageComponent } from './Component/question-page/question-page.component';
import { AdminPageComponent } from './Component/admin-page/admin-page.component';
import { AdminQuestionPageComponent } from './Component/admin-question-page/admin-question-page.component';
import { AuthComponent } from './Component/auth/auth.component';
import { RoleGuard} from './Ngguard/guard.guard';
import { AdminManageComponent } from './Component/admin-manage/admin-manage.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { UserTableComponent } from './Component/user-table/user-table.component';
import { UserAnswersComponent } from './user-answers/user-answers.component';

const routes: Routes = [
  {path:'project/:id',component:QuestionPageComponent,canActivate:[RoleGuard]},
  {path:'admin/questions',component:AdminQuestionPageComponent,canActivate:[RoleGuard]},
  {path:"admin/managetool",component:AdminManageComponent,canActivate:[RoleGuard]},
  {path:"admin/report",component:UserTableComponent,canActivate:[RoleGuard]},
  {path:'admin/useranswers/:projectid/:email',component:UserAnswersComponent,canActivate:[RoleGuard]},
  {path:'admin',component:AdminPageComponent,canActivate:[RoleGuard]},
  {path:'login',component:AuthComponent},
  {path:'',component:HomePageComponent,canActivate:[RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
