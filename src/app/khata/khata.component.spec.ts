import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhataComponent } from './khata.component';

describe('KhataComponent', () => {
  let component: KhataComponent;
  let fixture: ComponentFixture<KhataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
