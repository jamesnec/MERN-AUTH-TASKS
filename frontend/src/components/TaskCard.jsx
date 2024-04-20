import { useTasksContext } from '../context/TasksContext'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

function TaskCard({task}) {

    const { deleteTask } = useTasksContext();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div className="flex gap-x-2 items-center">
                <button className="bg-red-500 px-4 py-1 rounded-md" onClick={() => {
                    deleteTask(task._id)
                }}>delete</button>
                <Link to={`/task/${task._id}`} className="bg-indigo-500 px-4 py-1 rounded-md">edit</Link>
            </div>            
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{task.date &&
          new Date(task.date).toLocaleDateString("es-PE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        {/* <p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p> */}
    </div>        
  )
}

export default TaskCard