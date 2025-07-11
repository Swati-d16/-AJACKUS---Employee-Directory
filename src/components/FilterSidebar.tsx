import { useState } from 'react';
import { FilterState } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters
}: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleInputChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApply = () => {
    onApplyFilters();
  };

  const handleReset = () => {
    const resetFilters = { firstName: '', department: '', role: '' };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onResetFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-80 bg-filter-sidebar border-l border-border z-50 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:w-72
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Filter Employees</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
             
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name:
              </Label>
              <Input
                id="firstName"
                value={localFilters.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="department" className="text-sm font-medium">
                Department:
              </Label>
              <Input
                id="department"
                value={localFilters.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                Role:
              </Label>
              <Input
                id="role"
                value={localFilters.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleApply}
                className="flex-1"
              >
                Apply
              </Button>
              <Button 
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};