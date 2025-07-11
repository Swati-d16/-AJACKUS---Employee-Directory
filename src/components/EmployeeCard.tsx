import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
  return (
    <Card className="bg-employee-card border-employee-card-border">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">
            {employee.firstName} {employee.lastName}
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p><span className="font-medium">Email:</span> {employee.email}</p>
            <p><span className="font-medium">Department:</span> {employee.department}</p>
            <p><span className="font-medium">Role:</span> {employee.role}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(employee)}
              className="text-xs"
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(employee.id)}
              className="text-xs"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};