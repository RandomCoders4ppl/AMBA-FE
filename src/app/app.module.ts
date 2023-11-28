import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectCardsComponent } from './Shared/project-cards/project-cards.component';
import { MatCardModule } from '@angular/material/card'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuestionPageComponent } from './Component/question-page/question-page.component';
import { AdminPageComponent } from './Component/admin-page/admin-page.component';
import { AdminQuestionPageComponent } from './Component/admin-question-page/admin-question-page.component'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthComponent } from './Component/auth/auth.component';
import { JwtTokenInterceptor } from './jwt-token.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './Component/pop-up/pop-up.component';
import { UserTableComponent } from './Component/user-table/user-table.component';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { AdminManageComponent } from './Component/admin-manage/admin-manage.component';
import { ResponseInterceptor } from './response.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostSuccessInterceptor } from './successpost.inerceptor';
import { FooterComponent } from './footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './Component/profile/profile.component';
 
// register Handsontable's modules
registerAllModules();
 
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    ProjectCardsComponent,
    QuestionPageComponent,
    AdminPageComponent,
    AdminQuestionPageComponent,
    AuthComponent,
    PopUpComponent,
    UserTableComponent,
    AdminManageComponent,
    FooterComponent,
    ProfileComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatDialogModule,
    HotTableModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PostSuccessInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }