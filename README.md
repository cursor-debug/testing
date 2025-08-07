# Student Management System

A full-stack web application for managing student records, built with Java Spring Boot backend and Angular frontend.

## Features

- **Student CRUD Operations**: Create, Read, Update, and Delete student records
- **Search Functionality**: Search students by first name, last name, or major
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Modern UI with Bootstrap styling
- **RESTful API**: Well-structured backend API endpoints
- **In-Memory Database**: H2 database for development and testing

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database**
- **Maven**

### Frontend
- **Angular 17**
- **TypeScript**
- **Bootstrap 5**
- **RxJS**

## Project Structure

```
student-management-app/
├── backend/                          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/studentmanagement/app/
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── model/           # Entity classes
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── StudentManagementApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql         # Initial data
│   │   └── test/
│   └── pom.xml
└── frontend/
    └── student-management-frontend/  # Angular frontend
        ├── src/
        │   ├── app/
        │   │   ├── components/       # Angular components
        │   │   ├── models/          # TypeScript models
        │   │   ├── services/        # HTTP services
        │   │   └── app.module.ts
        │   ├── index.html
        │   └── styles.css
        ├── angular.json
        ├── package.json
        └── tsconfig.json
```

## Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** (comes with Node.js)
- **Maven 3.6** or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`

4. Access H2 Console (optional):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:studentdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/student-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. The frontend will start on `http://localhost:4200`

## API Endpoints

### Students API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/search/firstname/{firstName}` | Search by first name |
| GET | `/api/students/search/lastname/{lastName}` | Search by last name |
| GET | `/api/students/major/{major}` | Get students by major |

### Student Model

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "age": 20,
  "major": "Computer Science"
}
```

## Features Overview

### 1. Student List View
- Display all students in a table format
- Search functionality with filters
- Edit and delete actions for each student
- Add new student button

### 2. Student Form
- Add new students
- Edit existing students
- Form validation with error messages
- Dropdown for selecting majors

### 3. Search Functionality
- Search by first name
- Search by last name
- Filter by major
- Clear search results

## Development

### Running Tests

Backend tests:
```bash
cd backend
mvn test
```

Frontend tests:
```bash
cd frontend/student-management-frontend
npm test
```

### Building for Production

Backend:
```bash
cd backend
mvn clean package
```

Frontend:
```bash
cd frontend/student-management-frontend
npm run build
```

## Configuration

### Backend Configuration
The backend configuration is in `backend/src/main/resources/application.properties`:

- Server port: 8080
- Database: H2 in-memory
- CORS: Enabled for localhost:4200

### Frontend Configuration
The frontend API base URL is configured in `src/app/services/student.service.ts`:

```typescript
private baseUrl = 'http://localhost:8080/api/students';
```

## Sample Data

The application comes with sample student data that is automatically loaded on startup:

1. John Doe - Computer Science
2. Jane Smith - Mathematics
3. Mike Johnson - Physics
4. Sarah Williams - Biology
5. David Brown - Engineering

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running on port 8080 and frontend on port 4200
2. **Database Issues**: H2 database is recreated on each startup, so data will be lost between restarts
3. **Port Conflicts**: Ensure ports 8080 and 4200 are available

### Logs

Backend logs can be found in the console where Spring Boot is running.
Frontend logs can be found in the browser's developer console.

## License

This project is for educational purposes and is not licensed for commercial use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For questions or issues, please create an issue in the repository or contact the development team.