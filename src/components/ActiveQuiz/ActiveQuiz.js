import AnswersList from "./AnswersList/AnswersList";
import Select from "../../components/ActiveQuiz/AnswersList/Select";

const ActiveQuiz = props => {
  return (
    <div className="quiz-question">
      <h3 className="quiz-question__h3 title-h3">
        <span className="quiz-question__number">{props.answerNumber}.&nbsp;</span>
        {props.question}
      </h3>
      {props.state.quiz[props.state.activeQuestion].type === 'select'
        ? <Select
          value={props.value}
          onAnswerClick={props.onAnswerClick}
          state={props.state}
        />
        : <AnswersList
          state={props.state}
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
        />
      }
    </div>
  )
}

export default ActiveQuiz
