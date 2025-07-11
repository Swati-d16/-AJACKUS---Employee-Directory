export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

export interface FilterState {
  firstName: string;
  department: string;
  role: string;
}

export interface SortOption {
  value: string;
  label: string;
}