import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  searchTerm: string = '';
  searchType: string = 'firstName';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error;
        this.students = [];
      }
    });
  }

  searchStudents(): void {
    if (!this.searchTerm.trim()) {
      this.loadStudents();
      return;
    }

    if (this.searchType === 'firstName') {
      this.studentService.searchStudentsByFirstName(this.searchTerm).subscribe({
        next: (data) => {
          this.students = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else if (this.searchType === 'lastName') {
      this.studentService.searchStudentsByLastName(this.searchTerm).subscribe({
        next: (data) => {
          this.students = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else if (this.searchType === 'major') {
      this.studentService.getStudentsByMajor(this.searchTerm).subscribe({
        next: (data) => {
          this.students = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }

  editStudent(id: number): void {
    this.router.navigate(['/edit-student', id]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.successMessage = 'Student deleted successfully!';
          this.loadStudents();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadStudents();
  }
}