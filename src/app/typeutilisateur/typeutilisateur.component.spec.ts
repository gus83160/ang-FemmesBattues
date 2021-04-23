import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUtilisateurComponent } from './typeutilisateur.component';

describe('TypeUtilisateurComponent', () => {
  let component: TypeutilisateurComponent;
  let fixture: ComponentFixture<TypeutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
