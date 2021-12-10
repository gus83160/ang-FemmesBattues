import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandenewComponent } from './demandenew.component';

describe('DemandenewComponent', () => {
  let component: DemandenewComponent;
  let fixture: ComponentFixture<DemandenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
