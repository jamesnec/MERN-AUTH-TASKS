import { useEffect } from 'react'
import { useTasksContext } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

function TasksPage() {

    const { getListTasks, listTasks } = useTasksContext();

    useEffect(() => {
        getListTasks();
    }, []);

    if(listTasks.length == 0){
        return (<h1>No tasks</h1>)
    }

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
        {
            listTasks.map(task => (
                <TaskCard task={task} key={task._id} />
            ))
        }
        </div>
    )
}

export default TasksPage