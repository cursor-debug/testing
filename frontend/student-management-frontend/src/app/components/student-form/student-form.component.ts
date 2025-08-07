import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean = false;
  studentId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  
  majors: string[] = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Chemistry',
    'Engineering',
    'Business Administration',
    'Psychology',
    'English Literature',
    'History'
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
      major: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudent();
      }
    });
  }

  loadStudent(): void {
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (student) => {
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          age: student.age,
          major: student.major
        });
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      
      if (this.isEditMode) {
        this.studentService.updateStudent(this.studentId, student).subscribe({
          next: () => {
            this.successMessage = 'Student updated successfully!';
            setTimeout(() => this.router.navigate(['/students']), 2000);
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
      } else {
        this.studentService.createStudent(student).subscribe({
          next: () => {
            this.successMessage = 'Student created successfully!';
            setTimeout(() => this.router.navigate(['/students']), 2000);
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['min']) return `Age must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `Age must be at most ${field.errors['max'].max}`;
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}