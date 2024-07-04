type CalorieDisplayProps = {
    calories: number,
    applyClass?: boolean,
    children: React.ReactNode,
}

const CalorieDisplay = ({calories, applyClass=false, children} : CalorieDisplayProps) => {
    const classApplied = applyClass ? (calories >= 0 ? 'text-green-500 ' : 'text-red-600 ') : '';
    console.log(classApplied);
  return (
    <>
        <p className={`${classApplied}text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center`}>
            
            <span className="font-black text-4xl text-orange">{calories}</span>
            {children}
        </p>
    </>
  )
}

export default CalorieDisplay