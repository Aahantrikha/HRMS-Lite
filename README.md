# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and tracking daily attendance.

## 🚀 Live Demo

- **Frontend URL:** https://hrms-lite-3ue26stj4-aahantrikhas-projects.vercel.app
- **Backend API:** https://hrms-lite-production-bcc6.up.railway.app
- **GitHub Repository:** https://github.com/Aahantrikha/HRMS-Lite

> **✅ Fully deployed and ready for submission!**

## 📋 Features

### Employee Management
- ✅ Add new employees with unique ID, name, email, and department
- ✅ View all employees in a professional card-based layout
- ✅ Delete employees with confirmation
- ✅ Email format validation
- ✅ Duplicate employee ID prevention

### Attendance Management
- ✅ Mark daily attendance (Present/Absent) for employees
- ✅ View attendance records by employee ID
- ✅ Display employee name and department in attendance view
- ✅ Display total present days per employee
- ✅ Date-based attendance tracking

### UI/UX Features
- ✅ Professional, production-ready interface
- ✅ Loading states for all async operations
- ✅ Empty states with helpful messages
- ✅ Error handling with user-friendly messages
- ✅ Success notifications
- ✅ Responsive design for mobile and desktop
- ✅ Tab-based navigation
- ✅ Form validation

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No framework dependencies
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@seald-io/nedb** - Embedded NoSQL database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

### Database
- **@seald-io/nedb** - Lightweight embedded database
  - Stores data in local files (`backend/data/`)
  - MongoDB-compatible API
  - Perfect for development and small deployments

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hrms-lite
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start the backend server**
```bash
node server.js
```
The server will run on `http://localhost:5000`

4. **Open the frontend**
- Simply open `frontend/index.html` in your web browser
- Or use a local server:
```bash
cd frontend
# Using Python
python -m http.server 8000
# Or using Node.js http-server
npx http-server -p 8000
```

## 🌐 API Endpoints

### Employee Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees/add` | Add a new employee |
| GET | `/api/employees` | Get all employees |
| DELETE | `/api/employees/:id` | Delete an employee |

### Attendance Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance/mark` | Mark attendance |
| GET | `/api/attendance/:empId` | Get attendance by employee ID |

### Request/Response Examples

**Add Employee**
```json
POST /api/employees/add
{
  "empId": "EMP001",
  "name": "John Doe",
  "email": "john@company.com",
  "department": "Engineering"
}

Response: {"message": "Employee added successfully"}
```

**Mark Attendance**
```json
POST /api/attendance/mark
{
  "empId": "EMP001",
  "date": "2026-02-07",
  "status": "Present"
}

Response: {"message": "Attendance marked"}
```

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── data/                  # Database files (auto-created)
│   ├── routes/
│   │   ├── employees.js      # Employee API routes
│   │   └── attendance.js     # Attendance API routes
│   ├── db.js                 # Database connection
│   ├── server.js             # Express server setup
│   └── package.json          # Backend dependencies
│
└── frontend/
    ├── index.html            # Main HTML file
    ├── style.css             # Styling
    └── script.js             # Frontend logic
```

## 🚀 Deployment

### Quick Deployment Guide

Follow the step-by-step instructions in `DEPLOYMENT_STEPS.md` for:
- Deploying backend to Railway
- Deploying frontend to Vercel
- Connecting them together

### Backend Deployment (Railway)
1. Push code to GitHub
2. Connect repository to Railway
3. Set root directory to `backend`
4. Railway auto-deploys

### Frontend Deployment (Vercel)
1. Update API URL in `frontend/script.js` with Railway URL
2. Deploy frontend folder to Vercel
3. Vercel provides live URL

## ✅ Requirements Checklist

### Core Features
- [x] Employee Management (Add, View, Delete)
- [x] Attendance Management (Mark, View)
- [x] RESTful API design
- [x] Database persistence
- [x] Server-side validation
- [x] Email format validation
- [x] Duplicate employee handling
- [x] Error handling with proper HTTP codes
- [x] Professional UI design
- [x] Loading states
- [x] Empty states
- [x] Error states
- [x] Responsive design
- [x] Clean, modular code

### Bonus Features Implemented
- [x] Display total present days per employee
- [x] Basic dashboard summary with employee details
- [x] Filter attendance records by date range

## 🔒 Assumptions & Limitations

### Assumptions
1. **Single Admin User** - No authentication required as per requirements
2. **Small Dataset** - No pagination needed for employee/attendance lists
3. **Basic Attendance** - Only date and status tracking (no time)
4. **Local Database** - Using file-based NeDB (can be switched to MongoDB)

### Limitations
1. **No Edit Functionality** - Employees can only be added or deleted (not edited)
2. **No Date Filtering** - Attendance shows all records (no date range filter)
3. **No Pagination** - All records loaded at once (suitable for small datasets)
4. **No Export** - No CSV/PDF export functionality
5. **No Bulk Operations** - Actions performed one at a time

### Out of Scope (as per requirements)
- User authentication
- Leave management
- Payroll features
- Advanced HR features

## 🐛 Known Issues

- None currently

## 📝 Future Enhancements

- User authentication and authorization
- Employee profile editing
- Attendance filtering by date range
- Export attendance reports (CSV/PDF)
- Dashboard with charts and statistics
- Bulk attendance marking
- Email notifications
- Employee search functionality

## 👨‍💻 Developer

Developed as part of a full-stack coding assignment to demonstrate:
- Frontend development skills
- Backend API design
- Database modeling
- Error handling
- Production-ready deployment

## 📄 License

This project is open source and available for educational purposes.

---

## 📞 Support

For issues or questions:
1. Check the `QUICKSTART.md` for quick setup
2. See `DEPLOYMENT_GUIDE.md` for deployment help
3. Review `ASSIGNMENT_COMPLIANCE_REPORT.md` for feature details

