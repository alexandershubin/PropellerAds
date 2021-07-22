import React from "react";

const AnswersList = props => {
  return (
    <ul className="quiz-list">
      {props.answers.map(answer => {
        return (
          <li className="quiz-list__item" key={answer.id}
              onClick={() => props.onAnswerClick(answer.id)}
          >
            {answer.text}
          </li>
        )
      })}
    </ul>
  )
}

export default AnswersList
