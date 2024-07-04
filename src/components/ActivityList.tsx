import { useMemo } from "react"
import categories from "../data/categories"
import { Activity } from "../types"
import {PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducer/activityReducer"

type ActivityList = {
    activities: Activity[]
    dispatch: React.Dispatch<ActivityActions>
}
const ActivityList = ({activities, dispatch} : ActivityList) => {
    const categoryName = useMemo(() => (category : Activity['category']) => {
        return categories.map(cat => cat.id === category ? cat.name : '' )
    } ,[])

    const isEmpty = useMemo(() => activities.length === 0 ,[activities])
  return (
    <>
    <h2 className="text-4xl font-bold text-slate-600 text-center">Meals and Activities</h2>
    {isEmpty ? <p className="text-center">There are not any activities yet, start adding it in the form...</p> :
        activities.map(activity => (
            <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                <div className="space-y-2 relative">
                    <p className={`rounded px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoryName(activity.category)}   
                    </p>
                    <p className="text-xl font-bold pt-5">{activity.name}</p>
                    <p className="font-black text-2xl text-lime-500">
                        {activity.calories} {' '}
                        <span>Calories</span>
                    </p>
                </div>

                <div className="flex gap-5 items-center">
                    <button onClick={() => dispatch({type: 'save-activeId', payload: {id: activity.id}})}>
                        <PencilSquareIcon className="h-8 w-8 text-gray-500" />
                    </button>
                    <button onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}>
                        <XCircleIcon className="h-8 w-8 text-red-500" />
                    </button>
                </div>

            </div>
        ))}
    </>
  )
}

export default ActivityList