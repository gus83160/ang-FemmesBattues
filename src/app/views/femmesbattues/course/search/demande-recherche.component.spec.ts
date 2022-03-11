import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRechercheComponent } from './demande-recherche.component';

describe('Test1Component', () => {
  let component: DemandeRechercheComponent;
  let fixture: ComponentFixture<DemandeRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
