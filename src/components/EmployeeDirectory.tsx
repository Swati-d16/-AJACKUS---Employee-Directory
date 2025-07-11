import { useState, useMemo } from 'react';
import { Employee, FilterState, SortOption } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';
import { EmployeeCard } from './EmployeeCard';
import { FilterSidebar } from './FilterSidebar';
import { EmployeeForm } from './EmployeeForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, ChevronDown } from 'lucide-react';

const sortOptions: SortOption[] = [
  { value: 'firstName-asc', label: 'First Name A-Z' },
  { value: 'firstName-desc', label: 'First Name Z-A' },
  { value: 'department-asc', label: 'Department A-Z' },
  { value: 'department-desc', label: 'Department Z-A' }
];

const pageOptions = [10, 25, 50, 100];

export const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('firstName-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    firstName: '',
    department: '',
    role: ''
  });
  
  const { toast } = useToast();

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.firstName || employee.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
        (!filters.department || employee.department.toLowerCase().includes(filters.department.toLowerCase())) &&
        (!filters.role || employee.role.toLowerCase().includes(filters.role.toLowerCase()));
      
      return matchesSearch && matchesFilters;
    });

    // Sort
    const [sortField, sortOrder] = sortBy.split('-') as [keyof Employee, 'asc' | 'desc'];
    filtered.sort((a, b) => {
      const aValue = a[sortField].toString().toLowerCase();
      const bValue = b[sortField].toString().toLowerCase();
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [employees, searchTerm, sortBy, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast({
        title: "Employee deleted",
        description: "The employee has been removed from the directory.",
      });
    }
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'id'> | Employee) => {
    if ('id' in employeeData) {
      // Editing existing employee
      setEmployees(prev => prev.map(emp => 
        emp.id === employeeData.id ? employeeData : emp
      ));
      toast({
        title: "Employee updated",
        description: "The employee information has been updated.",
      });
    } else {
      // Adding new employee
      const newEmployee: Employee = {
        ...employeeData,
        id: Date.now().toString()
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast({
        title: "Employee added",
        description: "New employee has been added to the directory.",
      });
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({ firstName: '', department: '', role: '' });
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize: string) => {
    setItemsPerPage(Number(newSize));
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-header-bg text-header-text p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-xl font-semibold">Employee Directory</h1>
          
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-foreground"
              />
            </div>
            
            <Button 
              variant="secondary"
              onClick={() => setIsFilterOpen(true)}
              className="whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Show:</label>
                  <Select value={itemsPerPage.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map(option => (
                        <SelectItem key={option} value={option.toString()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90">
                Add Employee
              </Button>
            </div>

            {/* Employee Grid */}
            {paginatedEmployees.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                  {paginatedEmployees.map(employee => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onEdit={handleEditEmployee}
                      onDelete={handleDeleteEmployee}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                      {Math.min(currentPage * itemsPerPage, filteredAndSortedEmployees.length)} of{' '}
                      {filteredAndSortedEmployees.length} employees
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {generatePageNumbers().map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8"
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No employees found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Employee Form Modal */}
      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        employee={editingEmployee}
        onSave={handleSaveEmployee}
      />
   
   
      <footer className="bg-gray-800 text-white text-sm p-4">
        <div className="max-w-7xl mx-auto text-left">
          © 2025 Employee Directory App. All rights reserved.
        </div>
      </footer>
      </div>
    </>
  );
};