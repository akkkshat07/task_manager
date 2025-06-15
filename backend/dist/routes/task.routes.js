"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();

router.use(auth_middleware_1.auth);
router.get('/', task_controller_1.getTasks);
router.post('/', [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').optional().trim(),
], task_controller_1.createTask);

router.put('/:id', [
    (0, express_validator_1.body)('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('description').optional().trim(),
    (0, express_validator_1.body)('status').optional().isBoolean().withMessage('Status must be a boolean'),
], task_controller_1.updateTask);

router.delete('/:id', task_controller_1.deleteTask);
exports.default = router;
