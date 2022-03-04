import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeListFilterComponent } from './demande-list-filter.component';

describe('TestComponent', () => {
  let component: DemandeListFilterComponent;
  let fixture: ComponentFixture<DemandeListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
