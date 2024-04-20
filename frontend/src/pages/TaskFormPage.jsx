import { useForm } from 'react-hook-form'
import { useTasksContext } from '../context/TasksContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

function TaskFormPage() {

    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    const { createTask, getTask, updateTask } = useTasksContext();
    const [ titleForm, setTitleForm ] = useState("Add task");
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit((data) => {
        if(params.id){
            updateTask(params.id, {
                ...data,
                date: dayjs.utc(data.date).format()
            })
        }else{
            createTask({
                ...data,
                date: dayjs.utc(data.date).format()
            });            
        }
        navigate("/tasks");
    });

    useEffect(() => {
        async function loadTask(){
            if(params.id){
                const task = await getTask(params.id);
                setTitleForm("Edit task");
                setValue('title', task.title);
                setValue('description', task.description);
                setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
            }            
        }
        loadTask();
    }, []);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold'>{titleForm}</h1>
                <form onSubmit={onSubmit}>
                    <input type="text"
                    {...register("title", { 
                        required: {
                            value: true,
                            message: "Title is required"
                        }
                    })} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                    placeholder='Title' />
                    {errors.title && (<p className='text-red-500'>{errors.title.message}</p>)}

                    <textarea rows="3" placeholder='Description' className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Description is required"
                        }
                    })}></textarea>
                    {errors.description && (<p className='text-red-500'>{errors.description.message}</p>)}

                    <input type="date"
                    {...register("date", { 
                        required: {
                            value: true,
                            message: "Date is required"
                        }
                    })} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                    placeholder='Date' />
                    {errors.date && (<p className='text-red-500'>{errors.date.message}</p>)}
                    <button type='submit' className='bg-indigo-500 px-2 py-1 rounded-md'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage