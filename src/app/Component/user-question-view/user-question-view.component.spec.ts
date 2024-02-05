import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuestionViewComponent } from './user-question-view.component';

describe('UserQuestionViewComponent', () => {
  let component: UserQuestionViewComponent;
  let fixture: ComponentFixture<UserQuestionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserQuestionViewComponent]
    });
    fixture = TestBed.createComponent(UserQuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
