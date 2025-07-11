// Mock employee data
let employees = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        role: 'Software Engineer'
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        role: 'Marketing Manager'
    },
    {
        id: '3',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@company.com',
        department: 'Sales',
        role: 'Sales Representative'
    },
    {
        id: '4',
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@company.com',
        department: 'HR',
        role: 'HR Specialist'
    },
    {
        id: '5',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@company.com',
        department: 'Finance',
        role: 'Financial Analyst'
    },
    {
        id: '6',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        department: 'Engineering',
        role: 'Senior Software Engineer'
    },
    {
        id: '7',
        firstName: 'Chris',
        lastName: 'Miller',
        email: 'chris.miller@company.com',
        department: 'Marketing',
        role: 'Marketing Coordinator'
    },
    {
        id: '8',
        firstName: 'Lisa',
        lastName: 'Garcia',
        email: 'lisa.garcia@company.com',
        department: 'Sales',
        role: 'Sales Manager'
    },
    {
        id: '9',
        firstName: 'Tom',
        lastName: 'Anderson',
        email: 'tom.anderson@company.com',
        department: 'HR',
        role: 'HR Manager'
    },
    {
        id: '10',
        firstName: 'Amanda',
        lastName: 'Taylor',
        email: 'amanda.taylor@company.com',
        department: 'Finance',
        role: 'Senior Financial Analyst'
    },
    {
        id: '11',
        firstName: 'Robert',
        lastName: 'Lee',
        email: 'robert.lee@company.com',
        department: 'Engineering',
        role: 'Software Engineer'
    },
    {
        id: '12',
        firstName: 'Jessica',
        lastName: 'White',
        email: 'jessica.white@company.com',
        department: 'Marketing',
        role: 'Marketing Manager'
    }
];

// State management
let currentPage = 1;
let itemsPerPage = 10;
let sortBy = 'firstName';
let searchTerm = '';
let filters = {
    firstName: '',
    department: '',
    role: ''
};
let editingEmployeeId = null;
let deletingEmployeeId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderEmployees();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking backdrop
    document.getElementById('employeeModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeEmployeeModal();
        }
    });
    
    document.getElementById('deleteModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModal();
        }
    });
    
    // Close sidebar when clicking backdrop
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('filterSidebar');
        const filterBtn = document.querySelector('.filter-toggle-btn');
        
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !filterBtn.contains(e.target)) {
            toggleFilterSidebar();
        }
    });
}

// Filter and search functions
function handleSearch() {
    searchTerm = document.getElementById('searchInput').value.toLowerCase();
    currentPage = 1;
    renderEmployees();
}

function applyFilters() {
    filters.firstName = document.getElementById('firstNameFilter').value.toLowerCase();
    filters.department = document.getElementById('departmentFilter').value;
    filters.role = document.getElementById('roleFilter').value;
    currentPage = 1;
    renderEmployees();
}

function clearFilters() {
    document.getElementById('firstNameFilter').value = '';
    document.getElementById('departmentFilter').value = '';
    document.getElementById('roleFilter').value = '';
    document.getElementById('searchInput').value = '';
    
    searchTerm = '';
    filters = {
        firstName: '',
        department: '',
        role: ''
    };
    currentPage = 1;
    renderEmployees();
}

function handleSort() {
    sortBy = document.getElementById('sortSelect').value;
    renderEmployees();
}

function handleItemsPerPageChange() {
    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    currentPage = 1;
    renderEmployees();
}

// Filter employees based on search and filters
function getFilteredEmployees() {
    return employees.filter(employee => {
        const matchesSearch = searchTerm === '' || 
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm);
            
        const matchesFirstName = filters.firstName === '' || 
            employee.firstName.toLowerCase().includes(filters.firstName);
            
        const matchesDepartment = filters.department === '' || 
            employee.department === filters.department;
            
        const matchesRole = filters.role === '' || 
            employee.role === filters.role;
            
        return matchesSearch && matchesFirstName && matchesDepartment && matchesRole;
    });
}

// Sort employees
function getSortedEmployees(filteredEmployees) {
    return [...filteredEmployees].sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return aValue.localeCompare(bValue);
    });
}

// Get paginated employees
function getPaginatedEmployees(sortedEmployees) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedEmployees.slice(startIndex, endIndex);
}

// Render employees
function renderEmployees() {
    const filteredEmployees = getFilteredEmployees();
    const sortedEmployees = getSortedEmployees(filteredEmployees);
    const paginatedEmployees = getPaginatedEmployees(sortedEmployees);
    
    const grid = document.getElementById('employeeGrid');
    
    if (paginatedEmployees.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-users"></i>
                <h3>No employees found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
    } else {
        grid.innerHTML = paginatedEmployees.map(employee => createEmployeeCard(employee)).join('');
    }
    
    renderPagination(sortedEmployees.length);
}

// Create employee card HTML
function createEmployeeCard(employee) {
    const initials = employee.firstName.charAt(0) + employee.lastName.charAt(0);
    
    return `
        <div class="employee-card">
            <div class="employee-header">
                <div class="employee-avatar">${initials}</div>
                <div class="employee-info">
                    <h3>${employee.firstName} ${employee.lastName}</h3>
                    <p>${employee.role}</p>
                </div>
            </div>
            <div class="employee-details">
                <div class="employee-detail">
                    <i class="fas fa-envelope"></i>
                    <span>${employee.email}</span>
                </div>
                <div class="employee-detail">
                    <i class="fas fa-building"></i>
                    <span>${employee.department}</span>
                </div>
                <div class="employee-detail">
                    <i class="fas fa-id-badge"></i>
                    <span>ID: ${employee.id}</span>
                </div>
            </div>
            <div class="employee-actions">
                <button class="edit-btn" onclick="editEmployee('${employee.id}')">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button class="delete-btn" onclick="openDeleteModal('${employee.id}')">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `;
}

// Render pagination
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-angle-double-left"></i>
        </button>
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-angle-left"></i>
        </button>
    `;
    
    // Show page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="goToPage(${i})" ${currentPage === i ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }
    
    paginationHTML += `
        <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-angle-right"></i>
        </button>
        <button onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-angle-double-right"></i>
        </button>
    `;
    
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    paginationHTML += `
        <div class="pagination-info">
            Showing ${startItem}-${endItem} of ${totalItems} employees
        </div>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Pagination functions
function goToPage(page) {
    currentPage = page;
    renderEmployees();
}

// Sidebar functions
function toggleFilterSidebar() {
    const sidebar = document.getElementById('filterSidebar');
    sidebar.classList.toggle('open');
}

// Modal functions
function openAddEmployeeModal() {
    editingEmployeeId = null;
    document.getElementById('modalTitle').textContent = 'Add Employee';
    document.getElementById('submitBtn').textContent = 'Add Employee';
    clearForm();
    document.getElementById('employeeModal').classList.add('show');
}

function editEmployee(id) {
    editingEmployeeId = id;
    const employee = employees.find(emp => emp.id === id);
    
    if (employee) {
        document.getElementById('modalTitle').textContent = 'Edit Employee';
        document.getElementById('submitBtn').textContent = 'Update Employee';
        
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        
        clearErrors();
        document.getElementById('employeeModal').classList.add('show');
    }
}

function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.remove('show');
    clearForm();
    clearErrors();
    editingEmployeeId = null;
}

function openDeleteModal(id) {
    deletingEmployeeId = id;
    document.getElementById('deleteModal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    deletingEmployeeId = null;
}

// Form functions
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value,
        role: document.getElementById('role').value.trim()
    };
    
    if (validateForm(formData)) {
        if (editingEmployeeId) {
            updateEmployee(editingEmployeeId, formData);
        } else {
            addEmployee(formData);
        }
        closeEmployeeModal();
        renderEmployees();
    }
}

function validateForm(data) {
    clearErrors();
    let isValid = true;
    
    if (!data.firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    }
    
    if (!data.lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    }
    
    if (!data.email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else if (isDuplicateEmail(data.email)) {
        showError('emailError', 'This email is already in use');
        isValid = false;
    }
    
    if (!data.department) {
        showError('departmentError', 'Department is required');
        isValid = false;
    }
    
    if (!data.role) {
        showError('roleError', 'Role is required');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isDuplicateEmail(email) {
    return employees.some(emp => 
        emp.email.toLowerCase() === email.toLowerCase() && 
        emp.id !== editingEmployeeId
    );
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function clearForm() {
    document.getElementById('employeeForm').reset();
}

// CRUD operations
function addEmployee(data) {
    const newEmployee = {
        id: generateId(),
        ...data
    };
    employees.push(newEmployee);
}

function updateEmployee(id, data) {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...data };
    }
}

function confirmDelete() {
    if (deletingEmployeeId) {
        deleteEmployee(deletingEmployeeId);
        closeDeleteModal();
        renderEmployees();
    }
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    
    // Adjust current page if necessary
    const filteredEmployees = getFilteredEmployees();
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (filteredEmployees.length === 0) {
        currentPage = 1;
    }
}

// Utility functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key to close modals and sidebar
    if (event.key === 'Escape') {
        const employeeModal = document.getElementById('employeeModal');
        const deleteModal = document.getElementById('deleteModal');
        const filterSidebar = document.getElementById('filterSidebar');
        
        if (employeeModal.classList.contains('show')) {
            closeEmployeeModal();
        } else if (deleteModal.classList.contains('show')) {
            closeDeleteModal();
        } else if (filterSidebar.classList.contains('open')) {
            toggleFilterSidebar();
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl/Cmd + N to add new employee
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        openAddEmployeeModal();
    }
});