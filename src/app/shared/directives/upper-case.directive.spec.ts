import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpperCaseDirective } from './upper-case.directive';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  template: ` <form [formGroup]="form">
    <input type="text" formControlName="name" placeholder="Name" appUpperCase />
  </form>`,
})
class TestHostComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }
}

describe('UpperCaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let des: DebugElement[]; // the three elements w/ the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [UpperCaseDirective, TestHostComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, NgControl],
    }).createComponent(TestHostComponent);

    fixture.detectChanges(); // initial binding
    des = fixture.debugElement.queryAll(By.directive(UpperCaseDirective));
  });

  it('should have one input with directive', () => {
    expect(des.length).toBe(1);
  });

  it('should bind <input> uppercase to value', () => {
    const input = des[0].nativeElement as HTMLInputElement;
    input.value = 'super';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(input.value).toBe('SUPER');
  });

  it('should bind <input> uppercase to value', () => {
    const input = des[0].nativeElement as HTMLInputElement;
    input.value = 'super';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    expect(input.value).toBe('SUPER');
  });
});
