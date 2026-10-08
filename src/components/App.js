import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import { useEffect,useReducer } from 'react';
import Progress from './Progress';


const initialState = {
  questions: [],

  // status : 'loading','error','ready','active','finished'
  status: 'loading',
  index: 0, // current question index
  answer: null, // current answer
  points: 0, // current points
}
function reducer(state, action) {
  switch (action.type){
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
      case 'dataFailed':
        return {
          ...state,
          status: 'error'
        }
      case 'start':
        return {
          ...state,
          status: 'active'
        } 
        
      case 'newAnswer':
        const question = state.questions.at(state.index);
        const isCorrect = action.payload ===question.correctOption  ;
        return{
          ...state,
          answer: action.payload,
          points : isCorrect ? state.points + question.points : state.points,
        }
      case 'nextQuestion':
        return {
          ...state,
          index:state.index+1,
          answer: null,
        }  
      default: {
        throw new Error('Unknown action type');
      }

  }

}

function App() {
  const [{questions, status,index,answer,points}, dispatch] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const maxPoints = questions.reduce((prev,cur) => prev + cur.points, 0);


  useEffect(function(){
    fetch('http://localhost:9000/questions')
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'dataReceived',
           payload: data});
      }).catch(error => {
        dispatch({type: 'dataFailed'});
      });

  },[]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress
           index={index+1}
            totalQuestions={totalQuestions}
            points={points}
            maxPoints={maxPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
