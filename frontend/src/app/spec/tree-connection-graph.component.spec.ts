import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeConnectionGraphComponent } from './tree-connection-graph.component';

describe('TreeConnectionGraphComponent', () => {
  let component: TreeConnectionGraphComponent;
  let fixture: ComponentFixture<TreeConnectionGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeConnectionGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeConnectionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
