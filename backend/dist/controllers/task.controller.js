"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = require("../models/task.model");
const express_validator_1 = require("express-validator");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.Task.find({ createdBy: req.user._id });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { title, description } = req.body;
        const task = new task_model_1.Task({
            title,
            description,
            createdBy: req.user._id,
        });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        const task = yield task_model_1.Task.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        if (title)
            task.title = title;
        if (description !== undefined)
            task.description = description;
        if (status !== undefined)
            task.status = status;
        yield task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteTask = deleteTask;
