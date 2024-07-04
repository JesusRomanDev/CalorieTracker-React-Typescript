import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { acitivityReducer, initialState } from "./reducer/activityReducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  const [state, dispatch] = useReducer(acitivityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  //Funcion para comprobar si hay alguna actividad y asi poder usar el boton de restart
  const canAppRestart : boolean = useMemo(() => state.activities.length > 0,[state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calorie Tracker</h1>
          <button disabled={!canAppRestart} className={`disabled:opacity-10 bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm`} onClick={()=> dispatch({type: 'restart-activity'})}>Reiniciar App</button>
        </div>
      </header>
      <main className="bg-lime-500 py-20 px-5 grid grid-cols-2">
        <div className="w-full mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
        <div className="w-full p-10 mx-auto">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </div>
      </main>
      <section className="bg-gray-800 flex justify-center py-10">
        <div className="max-w-4xl text-center">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
    </>
  )
}

export default App
