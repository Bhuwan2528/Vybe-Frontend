import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBtn } from './ai-btn';

describe('AiBtn', () => {
  let component: AiBtn;
  let fixture: ComponentFixture<AiBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(AiBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
