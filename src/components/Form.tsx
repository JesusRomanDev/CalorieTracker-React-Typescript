import { Dispatch, useEffect, useState } from "react"
import categories from "../data/categories"
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducer/activityReducer";
import {v4 as uuidv4} from 'uuid';

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const Form = ({dispatch, state} : FormProps) => {

    const initialState = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }
    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if(state.activeId){
            console.log('Ya hay algo en activeId');
            const selectedActivity = state.activities.filter(el => el.id === state.activeId)
            console.log(selectedActivity);
            setActivity(selectedActivity[0]); //le ponemos [0] porque activity espera un objeto, entonces del arreglo seleccionamos
            //el primer elemento, que es un objeto (que en realidad es el unico porque ID son unicos) 
        }
    }, [state.activeId, state.activities])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        console.log(e.target);
        //Comprobando que estemos afectando al select o input que tenga el id de category o calories y retornando un boolean
        //Para mas abajo usar un ternario
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        // console.log(isNumberField);

        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? parseInt(e.target.value) : e.target.value

        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity;
        // console.log(name.trim() === '' && calories <= 0);
        return name.trim() !== '' && calories > 0 //si esto se cumple retorna true, pero un disabled={true} esta deshabilitado el boton, entonces hay que negar esta funcion !isValidActivity
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: "save-activity", payload: {newActivity: activity}});
        //Reiniciando el formulario
        setActivity({...initialState, id: uuidv4()});
    }

    const verifyEdit = (id: string, category: number): string => {
        if (category === 1) {
            return id ? 'Editar Comida' : 'Guardar Comida';
        } else if (category === 2) {
            return id ? 'Editar Ejercicio' : 'Guardar Ejercicio';
        }
        return 'Desconocido';
    };
  return (
    <form onSubmit={e => handleSubmit(e)} className="space-y-5 bg-white shadow p-10 rounded-lg" action="">
        <div className="grid grid-cols-1 gap-3">
            <label className="font-bold" htmlFor="category">Category:</label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" name="" id="category" value={activity.category} onChange={handleChange}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label className="font-bold" htmlFor="name">Activity:</label>
            <input className="border border-slate-300 p-2 rounded-lg" type="text" name="" id="name" placeholder="i.e Food, Orange Juice, Salad, Excercise, Weight Training, Bicycle" value={activity.name} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label className="font-bold" htmlFor="calories">Calories:</label>
            <input className="border border-slate-300 p-2 rounded-lg" type="number" name="" id="calories" placeholder="Number of Calories i.e 300 o 500" value={activity.calories} onChange={handleChange}/>
        </div>

        <button disabled={!isValidActivity()} type="submit" className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer">
            {verifyEdit(state?.activeId, activity.category)}
        </button>
    </form>
  )
}

export default Form