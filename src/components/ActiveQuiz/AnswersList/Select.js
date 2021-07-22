import React from "react";

const Select = props => {
  return (
    <select
      className="select"
      value={props.state.value}
      onChange={props.onAnswerClick}>
      {props.state.quiz[props.state.activeQuestion].answers.map(answer => {
        return (
          <option
            className="select__option"
            value={answer.id}
            key={answer.id}
          >
            {answer.text}
          </option>
        )
      })}
    </select>
  )
}

export default Select
