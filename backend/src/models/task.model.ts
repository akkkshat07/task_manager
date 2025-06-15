import mongoose from 'mongoose';

export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export interface ITask extends mongoose.Document {
    title: string;
    description?: string;
    status: TaskStatus;
    createdBy: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.TODO
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
