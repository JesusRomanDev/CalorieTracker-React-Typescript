import { Activity } from "../types"

export type ActivityActions = 
    {type: 'save-activity',payload: {newActivity : Activity}} |
    {type: 'save-activeId',payload: {id : Activity['id']}} |
    {type: 'delete-activity',payload: {id : Activity['id']}}

const localStorageActivities = () => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse('activities') : [];
}

export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const acitivityReducer = (state: ActivityState = initialState, action: ActivityActions) : ActivityState => {
    let updatedActivity : Activity[] = [];
    switch(action.type){
        case 'save-activity':
            if(state.activeId){
                updatedActivity = state.activities.map(el => el.id === state.activeId ? action.payload.newActivity : el)
            }else{

                //Porque hacemos una copia del estado anterior aun sabiendo que el segundo elemento va a mutarlo? 
                //Cuando actualizas el estado en React, es fundamental que mantengas el principio de inmutabilidad, lo que significa que no debes modificar directamente el estado existente, sino crear una nueva versión del estado con los cambios aplicados.
                //Al crear una copia del estado anterior antes de modificarlo, te aseguras de que el estado original permanezca intacto, lo que facilita el seguimiento de los cambios y ayuda a prevenir errores difíciles de depurar.
                updatedActivity = [...state.activities, action.payload.newActivity]
            }
            return {...state, activities: updatedActivity, activeId: ''} //Hay que vaciar el activeId porque si no, siempre hara referencia a ese id(y contendra nuestro reducer en su state ese activeId) y siempre caera en el if(state.activeId), 
            //por lo tanto siempre editara el id en el cual este activo en nuestro reducer

        case 'save-activeId':
            // console.log(state);
            return{...state, activeId: action.payload.id}

        case 'delete-activity':
            return {...state, activities: state.activities.filter(el => el.id !== action.payload.id) }
        default: return state;
    }
    // if(action.type === 'save-activity'){
    //     console.log('Caiste en save activity');
    // }
    // return state
}