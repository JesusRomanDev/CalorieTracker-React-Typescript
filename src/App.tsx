import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import { acitivityReducer, initialState } from "./reducer/activityReducer"
import ActivityList from "./components/ActivityList";

function App() {

  const [state, dispatch] = useReducer(acitivityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  return (
    <>
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">Calorie Tracker</h1>
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
    </>
  )
}

export default App
