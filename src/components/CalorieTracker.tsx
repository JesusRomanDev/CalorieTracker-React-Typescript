import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

const CalorieTracker = ({activities} : CalorieTrackerProps) => {
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total += activity.calories : total, 0) ,[activities])
    const caloriesBurned =  useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total += activity.calories : total, 0) ,[activities])
    const caloriesDiff = useMemo(() => caloriesConsumed - caloriesBurned , [caloriesBurned, caloriesConsumed])
  return (
    <>
        <h2 className=" text-white text-4xl font-black">Resume</h2>

        <div className="flex flex-col items-center md:flex-row md: justify-between gap-5 mt-10">
            <CalorieDisplay calories={caloriesConsumed} >
                Consumed
            </CalorieDisplay>
            <CalorieDisplay calories={caloriesBurned}>
                Burned
            </CalorieDisplay>
            <CalorieDisplay calories={caloriesDiff} applyClass={true}>
                {caloriesDiff >= 0 ? 'Calorie Surplus' : 'Calorie Deficit'}
            </CalorieDisplay>
        </div>
    </>
  )
}

export default CalorieTracker