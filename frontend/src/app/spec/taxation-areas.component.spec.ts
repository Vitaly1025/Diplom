import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationAreasComponent } from './taxation-areas.component';

describe('TaxationAreasComponent', () => {
  let component: TaxationAreasComponent;
  let fixture: ComponentFixture<TaxationAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
