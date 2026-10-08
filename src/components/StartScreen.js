


function StartScreen({totalQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{totalQuestions} questions to test you React Skills</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'start'})}>Start Quiz</button>

        </div>

    );
}
export default StartScreen;