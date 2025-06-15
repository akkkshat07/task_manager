import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../../store/taskSlice';
import { RootState } from '../../store';
import { AppDispatch } from '../../store';
import { Task, TaskStatus } from '../../types';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);

  const categorizedTasks = {
    [TaskStatus.TODO]: tasks.filter(task => task.status === TaskStatus.TODO),
    [TaskStatus.DOING]: tasks.filter(task => task.status === TaskStatus.DOING),
    [TaskStatus.DONE]: tasks.filter(task => task.status === TaskStatus.DONE)
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const taskId = result.draggableId;
    const newStatus = destination.droppableId as TaskStatus;
    
    try {
      await dispatch(updateTask({
        id: taskId,
        taskData: { status: newStatus }
      })).unwrap();
      toast.success(`Task moved to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async (taskId: string, taskTitle: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success(`Task "${taskTitle}" deleted successfully`);
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

  const getAvailableStatuses = (currentStatus: TaskStatus) => {
    return Object.values(TaskStatus).filter(status => status !== currentStatus);
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await dispatch(updateTask({
        id: taskId,
        taskData: { status: newStatus }
      })).unwrap();
      toast.success(`Task moved to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .catch((error) => {
        toast.error(`Failed to fetch tasks: ${error.message}`);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="card animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg text-red-600 mb-2">Error loading tasks</h3>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => dispatch(fetchTasks())}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <h3 className="text-lg text-gray-600">No tasks found</h3>
        <p className="text-gray-500 mt-2">Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(categorizedTasks).map(([status, taskList]) => (
            <div 
              key={status} 
              className={`rounded-lg shadow-lg p-6 ${
                status === TaskStatus.TODO 
                  ? 'bg-red-50' 
                  : status === TaskStatus.DOING 
                  ? 'bg-yellow-50'
                  : 'bg-green-50'
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                {status}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({taskList.length})
                </span>
              </h2>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {taskList.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`group border rounded-lg p-4 mb-3 ${
                              snapshot.isDragging
                                ? 'bg-blue-100 shadow-lg'
                                : 'bg-gray-50 hover:bg-gray-100'
                            } transition-all relative`}
                          >
                            <h3 className="font-semibold">{task.title}</h3>
                            {task.description && (
                              <p className="text-gray-600 text-sm mt-2">
                                {task.description}
                              </p>
                            )}
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {getAvailableStatuses(task.status as TaskStatus).map((newStatus: TaskStatus) => (
                                  <button
                                    key={newStatus.toString()}
                                    onClick={() => handleStatusChange(task._id, newStatus)}
                                    className={`text-xs px-2 py-1 rounded ${
                                      newStatus === TaskStatus.DOING
                                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                                        : newStatus === TaskStatus.DONE
                                        ? 'bg-green-100 hover:bg-green-200 text-green-800'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    }`}
                                  >
                                    Move to {newStatus.toString()}
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={() => handleDelete(task._id, task.title)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
