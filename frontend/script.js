const API = "https://hrms-lite-production-bcc6.up.railway.app/api";

// Tab switching
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(tabName + '-tab').classList.add('active');
  event.target.classList.add('active');
  
  if(tabName === 'employees') {
    loadEmployees();
  }
}

// Show/hide elements
function showElement(id) {
  document.getElementById(id).classList.add('show');
}

function hideElement(id) {
  document.getElementById(id).classList.remove('show');
}

function showMessage(elementId, message, duration = 3000) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// Add Employee
function addEmployee(event) {
  event.preventDefault();
  
  const empId = document.getElementById('empId').value.trim();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const department = document.getElementById('dept').value.trim();
  
  hideElement('employeeError');
  hideElement('employeeSuccess');
  
  fetch(API + "/employees/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({empId, name, email, department})
  })
  .then(r => r.json())
  .then(data => {
    if(data.error) {
      showMessage('employeeError', data.error);
    } else {
      showMessage('employeeSuccess', '✅ ' + data.message);
      document.getElementById('employeeForm').reset();
      loadEmployees();
    }
  })
  .catch(err => {
    showMessage('employeeError', '❌ Failed to add employee. Please try again.');
  });
}

// Load Employees
function loadEmployees() {
  const list = document.getElementById('empList');
  const loading = document.getElementById('employeeLoading');
  const empty = document.getElementById('employeeEmpty');
  
  list.innerHTML = '';
  hideElement('employeeEmpty');
  showElement('employeeLoading');
  
  fetch(API + "/employees")
  .then(r => r.json())
  .then(data => {
    hideElement('employeeLoading');
    
    if(data.length === 0) {
      showElement('employeeEmpty');
      return;
    }
    
    data.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'employee-card';
      card.innerHTML = `
        <h3>${emp.name}</h3>
        <p><strong>ID:</strong> ${emp.empId}</p>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <div style="margin-top: 15px;">
          <button class="btn-delete" onclick="deleteEmp('${emp._id}')">🗑️ Delete</button>
        </div>
      `;
      list.appendChild(card);
    });
  })
  .catch(err => {
    hideElement('employeeLoading');
    showElement('employeeEmpty');
  });
}

// Delete Employee
function deleteEmp(id) {
  if(!confirm('Are you sure you want to delete this employee?')) return;
  
  fetch(API + "/employees/" + id, {method: "DELETE"})
  .then(r => r.json())
  .then(data => {
    showMessage('employeeSuccess', '✅ Employee deleted successfully');
    loadEmployees();
  })
  .catch(err => {
    showMessage('employeeError', '❌ Failed to delete employee');
  });
}

// Mark Attendance
function markAttendance(event) {
  event.preventDefault();
  
  const empId = document.getElementById('attEmpId').value.trim();
  const date = document.getElementById('date').value;
  const status = document.getElementById('status').value;
  
  hideElement('attendanceError');
  hideElement('attendanceSuccess');
  
  fetch(API + "/attendance/mark", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({empId, date, status})
  })
  .then(r => r.json())
  .then(data => {
    if(data.error) {
      showMessage('attendanceError', data.error);
    } else {
      showMessage('attendanceSuccess', '✅ ' + data.message);
      document.getElementById('attendanceForm').reset();
    }
  })
  .catch(err => {
    showMessage('attendanceError', '❌ Failed to mark attendance');
  });
}

// View Attendance
function viewAttendance() {
  const empId = document.getElementById('viewAttEmpId').value.trim();
  
  if(!empId) {
    viewAllAttendance();
    return;
  }
  
  const fromDate = document.getElementById('filterFromDate').value;
  const toDate = document.getElementById('filterToDate').value;
  
  const list = document.getElementById('attendanceList');
  const loading = document.getElementById('attendanceLoading');
  const empty = document.getElementById('attendanceEmpty');
  
  list.innerHTML = '';
  hideElement('attendanceEmpty');
  hideElement('attendanceError');
  showElement('attendanceLoading');
  
  // Fetch employee details first
  fetch(API + "/employees")
  .then(r => r.json())
  .then(employees => {
    const employee = employees.find(e => e.empId === empId);
    
    if(!employee) {
      hideElement('attendanceLoading');
      showMessage('attendanceError', '❌ Employee not found');
      return;
    }
    
    // Then fetch attendance
    fetch(API + "/attendance/" + empId)
    .then(r => r.json())
    .then(data => {
      hideElement('attendanceLoading');
      
      if(data.length === 0) {
        showElement('attendanceEmpty');
        return;
      }
      
      // Filter by date range if provided
      let filteredData = data;
      if(fromDate || toDate) {
        filteredData = data.filter(record => {
          const recordDate = new Date(record.date);
          const from = fromDate ? new Date(fromDate) : null;
          const to = toDate ? new Date(toDate) : null;
          
          if(from && to) {
            return recordDate >= from && recordDate <= to;
          } else if(from) {
            return recordDate >= from;
          } else if(to) {
            return recordDate <= to;
          }
          return true;
        });
      }
      
      if(filteredData.length === 0) {
        list.innerHTML = '<div class="empty-state show"><p>📊 No records found for the selected date range</p></div>';
        return;
      }
      
      let presentCount = filteredData.filter(a => a.status === 'Present').length;
      let absentCount = filteredData.filter(a => a.status === 'Absent').length;
      
      let filterInfo = '';
      if(fromDate || toDate) {
        filterInfo = '<p><strong>📅 Filtered:</strong> ';
        if(fromDate && toDate) {
          filterInfo += `${fromDate} to ${toDate}`;
        } else if(fromDate) {
          filterInfo += `From ${fromDate}`;
        } else {
          filterInfo += `Until ${toDate}`;
        }
        filterInfo += '</p>';
      }
      
      let html = `
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3>${employee.name}</h3>
          <p><strong>Employee ID:</strong> ${empId}</p>
          <p><strong>Department:</strong> ${employee.department}</p>
          ${filterInfo}
          <p><strong>Total Records:</strong> ${filteredData.length} | <strong>Present:</strong> <span class="status-present">${presentCount}</span> | <strong>Absent:</strong> <span class="status-absent">${absentCount}</span></p>
        </div>
        <table class="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      // Sort by date (newest first)
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      filteredData.forEach(record => {
        const statusClass = record.status === 'Present' ? 'status-present' : 'status-absent';
        const statusIcon = record.status === 'Present' ? '✅' : '❌';
        html += `
          <tr>
            <td>${record.date}</td>
            <td class="${statusClass}">${statusIcon} ${record.status}</td>
          </tr>
        `;
      });
      
      html += '</tbody></table>';
      list.innerHTML = html;
    })
    .catch(err => {
      hideElement('attendanceLoading');
      showMessage('attendanceError', '❌ Failed to load attendance records');
    });
  })
  .catch(err => {
    hideElement('attendanceLoading');
    showMessage('attendanceError', '❌ Failed to load employee details');
  });
}

// View All Attendance Records
function viewAllAttendance() {
  const fromDate = document.getElementById('filterFromDate').value;
  const toDate = document.getElementById('filterToDate').value;
  
  const list = document.getElementById('attendanceList');
  const loading = document.getElementById('attendanceLoading');
  const empty = document.getElementById('attendanceEmpty');
  
  list.innerHTML = '';
  hideElement('attendanceEmpty');
  hideElement('attendanceError');
  showElement('attendanceLoading');
  
  // Fetch all employees
  fetch(API + "/employees")
  .then(r => r.json())
  .then(employees => {
    if(employees.length === 0) {
      hideElement('attendanceLoading');
      list.innerHTML = '<div class="empty-state show"><p>📊 No employees found</p></div>';
      return;
    }
    
    // Fetch attendance for all employees
    Promise.all(employees.map(emp => 
      fetch(API + "/attendance/" + emp.empId).then(r => r.json())
    ))
    .then(allAttendance => {
      hideElement('attendanceLoading');
      
      let html = '<div style="margin-bottom: 20px;">';
      let totalRecords = 0;
      let totalPresent = 0;
      let totalAbsent = 0;
      
      employees.forEach((emp, index) => {
        let empAttendance = allAttendance[index];
        
        // Filter by date range if provided
        if(fromDate || toDate) {
          empAttendance = empAttendance.filter(record => {
            const recordDate = new Date(record.date);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;
            
            if(from && to) {
              return recordDate >= from && recordDate <= to;
            } else if(from) {
              return recordDate >= from;
            } else if(to) {
              return recordDate <= to;
            }
            return true;
          });
        }
        
        if(empAttendance.length > 0) {
          const present = empAttendance.filter(a => a.status === 'Present').length;
          const absent = empAttendance.filter(a => a.status === 'Absent').length;
          
          totalRecords += empAttendance.length;
          totalPresent += present;
          totalAbsent += absent;
          
          html += `
            <div class="employee-card" style="margin-bottom: 15px;">
              <h3>${emp.name}</h3>
              <p><strong>ID:</strong> ${emp.empId} | <strong>Department:</strong> ${emp.department}</p>
              <p><strong>Records:</strong> ${empAttendance.length} | <strong>Present:</strong> <span class="status-present">${present}</span> | <strong>Absent:</strong> <span class="status-absent">${absent}</span></p>
              <button onclick="document.getElementById('viewAttEmpId').value='${emp.empId}'; viewAttendance();" class="btn-secondary" style="margin-top: 10px;">View Details</button>
            </div>
          `;
        }
      });
      
      if(totalRecords === 0) {
        list.innerHTML = '<div class="empty-state show"><p>📊 No attendance records found</p></div>';
        return;
      }
      
      let filterInfo = '';
      if(fromDate || toDate) {
        filterInfo = '<p><strong>📅 Filtered:</strong> ';
        if(fromDate && toDate) {
          filterInfo += `${fromDate} to ${toDate}`;
        } else if(fromDate) {
          filterInfo += `From ${fromDate}`;
        } else {
          filterInfo += `Until ${toDate}`;
        }
        filterInfo += '</p>';
      }
      
      // Add summary at the top
      const summary = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: white; margin-bottom: 10px;">📊 All Employees Attendance Summary</h3>
          ${filterInfo}
          <p style="font-size: 1.1rem;"><strong>Total Employees:</strong> ${employees.length}</p>
          <p style="font-size: 1.1rem;"><strong>Total Records:</strong> ${totalRecords} | <strong>Present:</strong> ${totalPresent} | <strong>Absent:</strong> ${totalAbsent}</p>
        </div>
      `;
      
      list.innerHTML = summary + html + '</div>';
    })
    .catch(err => {
      hideElement('attendanceLoading');
      showMessage('attendanceError', '❌ Failed to load attendance records');
    });
  })
  .catch(err => {
    hideElement('attendanceLoading');
    showMessage('attendanceError', '❌ Failed to load employees');
  });
}

// Clear date filters
function clearFilters() {
  document.getElementById('filterFromDate').value = '';
  document.getElementById('filterToDate').value = '';
  document.getElementById('viewAttEmpId').value = '';
  document.getElementById('attendanceList').innerHTML = '';
  hideElement('attendanceError');
  showElement('attendanceEmpty');
}

// Set today's date as default
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').value = today;
  loadEmployees();
});
