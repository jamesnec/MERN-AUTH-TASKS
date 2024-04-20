import { Router } from 'express'
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validate.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.get('/tasks/:id', authRequired, getTask);
router.put('/tasks/:id', authRequired, updateTask);

export default router;