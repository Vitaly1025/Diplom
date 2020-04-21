import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInformationComponent } from './tree-information.component';

describe('TreeInformationComponent', () => {
  let component: TreeInformationComponent;
  let fixture: ComponentFixture<TreeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
