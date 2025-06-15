import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';
import { TaskState, Task } from '../types';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await api.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData: { 
    title: string; 
    description?: string;
  }) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',  async ({ id, taskData }: { id: string; taskData: Partial<Task> }) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
     
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
  
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setCurrentTask, clearError } = taskSlice.actions;
export default taskSlice.reducer;
