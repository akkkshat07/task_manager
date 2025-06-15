import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TaskStatus } from '../../types';

export const TaskStats = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === TaskStatus.TODO).length,
    doing: tasks.filter(t => t.status === TaskStatus.DOING).length,
    done: tasks.filter(t => t.status === TaskStatus.DONE).length,
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase">{key}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      ))}
    </div>
  );
};
