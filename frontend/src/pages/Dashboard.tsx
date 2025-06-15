import { useState } from 'react';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';

export const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div 
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/images/tasks dashboard bg image.jpg')`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="animate-slideDown">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-md 
              hover:bg-primary-dark transition-colors duration-200 flex items-center 
              justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary 
              focus:ring-offset-2 animate-slideUp"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New Task</span>
          </button>
        </div>

        <div className="animate-slideUp delay-100">
          <TaskList />
        </div>

        {isFormOpen && (
          <TaskForm onClose={() => setIsFormOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
