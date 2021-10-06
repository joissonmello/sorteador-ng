import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteadosDaSemanaComponent } from './sorteados-da-semana.component';

describe('SorteadosDaSemanaComponent', () => {
  let component: SorteadosDaSemanaComponent;
  let fixture: ComponentFixture<SorteadosDaSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteadosDaSemanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteadosDaSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
