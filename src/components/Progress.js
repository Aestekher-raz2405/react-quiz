function Progress({index,totalQuestions,points,maxPoints}) {
    return (
        <header className="progress">
            <progress max={totalQuestions} value={index}/>
            <p>Question <strong>{index}</strong> of <strong>{totalQuestions}</strong></p>
             <p>Points: {points} <strong></strong> / <strong>{maxPoints}</strong></p>

        </header>

    );

}
export default Progress;