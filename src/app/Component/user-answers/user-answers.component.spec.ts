import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswersComponent } from './user-answers.component';

describe('UserAnswersComponent', () => {
  let component: UserAnswersComponent;
  let fixture: ComponentFixture<UserAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAnswersComponent]
    });
    fixture = TestBed.createComponent(UserAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
