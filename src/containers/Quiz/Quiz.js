import React, {Component} from "react";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import Comment from "../../components/UI/Comment";
import {Text} from "../../components/UI/Text";

class Quiz extends Component {
  state = {
    testName: "title",
    isFinished: false,
    activeQuestion: 0,
    value: 0,
    quiz: [
      {
        question: "Укажите пол",
        id: 1,
        type: 'text',
        answers: [
          {text: 'Мужской', id: 1},
          {text: 'Женский', id: 2},
        ]
      },
      {
        question: "В каком городе Вы живете",
        id: 2,
        type: 'select',
        answers: [
          {text: 'Москва', id: 1},
          {text: 'Санкт-Петербург', id: 2},
          {text: 'Казань', id: 3},
          {text: 'Нижний Новгород', id: 4}
        ]
      }
    ]
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('app_state', JSON.stringify(this.state));
  }

  componentDidMount() {
    const data = localStorage.getItem('app_state');

    if (!data) {
      return;
    }

    try {
      this.setState(JSON.parse(data));
    } catch (e) {
      console.error('Ошибка при получении данных из localStorage');
    }
  }

  onAnswerClickHandler = (answerId, value) => {
    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true
        })
      } else {
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          value
        })
      }
      window.clearTimeout(timeout)
    }, 1000)
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  handleClick = () => {
    if (this.state.testName === 'title') {
      this.setState({
        testName: 'titleEn',
      })
    } else {
      this.setState({
        testName: 'title',
      })
    }
  }

  render() {
    return (
      <div className="quiz">
        {!this.state.isFinished &&
        <button className="quiz__btn-lang"
                onClick={() => this.handleClick(this.state.quiz[this.state.activeQuestion].id)}>ru/en</button>}
        {this.state.activeQuestion === 0 &&
        <h2 className="title-h2"><Text id={this.state.testName}/></h2>}
        {this.state.isFinished
          ? <FinishedQuiz/>
          : <>
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={value => this.onAnswerClickHandler(value)}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              value={this.state.value}
              state={this.state}
            />
            <Comment/>
          </>
        }
      </div>
    )
  }
}

export default Quiz
