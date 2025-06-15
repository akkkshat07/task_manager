import { useState } from 'react';
import { TaskStatus } from '../../types';

interface TaskSearchProps {
  onSearch: (search: string) => void;
  onFilterStatus: (status: TaskStatus | 'ALL') => void;
}

export const TaskSearch = ({ onSearch, onFilterStatus }: TaskSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="input-field"
      />
      
      <select
        onChange={(e) => onFilterStatus(e.target.value as TaskStatus | 'ALL')}
        className="input-field"
      >
        <option value="ALL">All Status</option>
        {Object.values(TaskStatus).map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};
