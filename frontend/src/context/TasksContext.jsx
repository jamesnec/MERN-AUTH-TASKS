import { createContext, useContext, useState } from 'react';
import { getTasksRequest, createTaskRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext();

export const useTasksContext = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}

export function TaskProvider({ children }){
    const [task, setTask] = useState(null);
    const [listTasks, setListTasks] = useState([]);

    const getListTasks = async () => {
        try {
            const res = await getTasksRequest()
            console.log(res.data);
            setListTasks(res.data);
        } catch (error) {
            console.log(error)
        }
    }    

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res);            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            console.log(res)
            getListTasks();
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task);
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider value={{
            listTasks,
            getListTasks,
            createTask,
            deleteTask,
            getTask,
            updateTask
        }}>
            { children }
        </TaskContext.Provider>
    )
}