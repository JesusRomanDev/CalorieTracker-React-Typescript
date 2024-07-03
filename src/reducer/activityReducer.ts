import { Activity } from "../types"

export type ActivityActions = {type: 'save-activity',payload: {newActivity : Activity}}

type ActivityState = {
    activities: Activity[];
}

export const initialState : ActivityState = {
    activities: []
}

export const acitivityReducer = (state: ActivityState = initialState, action: ActivityActions) : ActivityState => {
    switch(action.type){
        case 'save-activity':
            //Porque hacemos una copia del estado anterior aun sabiendo que el segundo elemento va a mutarlo? 
            //Cuando actualizas el estado en React, es fundamental que mantengas el principio de inmutabilidad, lo que significa que no debes modificar directamente el estado existente, sino crear una nueva versión del estado con los cambios aplicados.
            //Al crear una copia del estado anterior antes de modificarlo, te aseguras de que el estado original permanezca intacto, lo que facilita el seguimiento de los cambios y ayuda a prevenir errores difíciles de depurar.
            return {...state, activities:[...state.activities, action.payload.newActivity]}

        default: return state;
    }
    // if(action.type === 'save-activity'){
    //     console.log('Caiste en save activity');
    // }
    // return state
}