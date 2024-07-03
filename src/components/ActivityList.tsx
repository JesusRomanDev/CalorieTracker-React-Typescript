import { useMemo } from "react"
import categories from "../data/categories"
import { Activity } from "../types"

type ActivityList = {
    activities: Activity[]
}
const ActivityList = ({activities} : ActivityList) => {
    const categoryName = useMemo(() => (category : Activity['category']) => {
        return categories.map(cat => cat.id === category ? cat.name : '' )
    } ,[])
  return (
    <>
    <h2 className="text-4xl font-bold text-slate-600 text-center">Meals and Activities</h2>
    {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
            <div className="space-y-2 relative">
                {categoryName(activity.category)}
                <p className="text-xl font-bold pt-5">{activity.name}</p>
                <p className="font-black text-2xl text-lime-500">
                    {activity.calories} {' '}
                    <span>Calories</span>
                </p>
            </div>

            <div>

            </div>

        </div>
    ))}
    </>
  )
}

export default ActivityList