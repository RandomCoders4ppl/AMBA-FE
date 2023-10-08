import { TestBed } from '@angular/core/testing';

import { ProjectTypesService } from './project-types.service';

describe('ProjectTypesService', () => {
  let service: ProjectTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
