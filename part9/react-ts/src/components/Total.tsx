interface TotalProps {
    totalExercises: number
}

const Total = (props: TotalProps) => {
    return (
        <p>
          Number of exercises {props.totalExercises}
        </p>
    )
}

export default Total