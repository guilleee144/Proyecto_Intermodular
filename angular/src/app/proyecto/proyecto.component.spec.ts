import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoComponent } from './proyecto.component';

describe('ProyectoComponent', () => {
  let component: ProyectoComponent;
  let fixture: ComponentFixture<ProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
