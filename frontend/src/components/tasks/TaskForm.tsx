import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../store/taskSlice';
import { Task } from '../../types';
import { AppDispatch } from '../../store';
import { toast } from 'react-toastify';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
  });
  const [error, setError] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.title.trim()) {
      setError('Title is required');
      setIsSubmitting(false);
      return;
    }

    try {
      if (task) {
        await dispatch(updateTask({
          id: task._id,
          taskData: formData
        })).unwrap();
        toast.success(`Task "${formData.title}" updated successfully`);
      } else {
        await dispatch(createTask(formData)).unwrap();
        toast.success(`Task "${formData.title}" created successfully`);
      }
      onClose();
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to save task. Please try again.');
      toast.error('Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                if (e.target.value.trim()) setError('');
              }}
              className={`input-field mt-1 ${error && !formData.title.trim() ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter task title"
              disabled={isSubmitting}
            />
            {error && !formData.title.trim() && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field mt-1"
              rows={3}
              placeholder="Enter task description"
              disabled={isSubmitting}
            />
          </div>

          {error && formData.title.trim() && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {task ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                task ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
