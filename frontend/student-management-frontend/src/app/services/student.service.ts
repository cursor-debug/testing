import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student)
      .pipe(catchError(this.handleError));
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchStudentsByFirstName(firstName: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search/firstname/${firstName}`)
      .pipe(catchError(this.handleError));
  }

  searchStudentsByLastName(lastName: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search/lastname/${lastName}`)
      .pipe(catchError(this.handleError));
  }

  getStudentsByMajor(major: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/major/${major}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
    }
    return throwError(() => errorMessage);
  }
}