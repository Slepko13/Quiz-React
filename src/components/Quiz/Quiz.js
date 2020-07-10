import React from 'react';
import './Quiz.scss';
import { Link } from 'react-router-dom';

const Quiz = (props) => {
    let { runningQuestion: { question, answers },
        runningQuestionIndex,
        lastQuestionIndex,
        nextQuestion,
        handleAnswer,
        userAnswer,
        getResult
    } = props;

    return (
        <div className="Quiz">
            <div className="title">
                <div className="question">Запитання № {runningQuestionIndex + 1}</div>
                <div className="question">{question}</div>
            </div>
            <form action="" className="form">
                <div className="form-group">
                    {answers.map(answer => {
                        return (
                            <div key={answer} className="form-check ">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="question"
                                    id={answer}
                                    value={answer}
                                    checked={userAnswer === answer}
                                    onChange={handleAnswer}
                                />
                                <label htmlFor={answer} className="form-check-label">{answer}</label>
                            </div>
                        )
                    })}
                </div>
            </form>
            <div className="bottom__wrapper">
                <div className="prog">Прогрес: {runningQuestionIndex + 1}/{lastQuestionIndex + 1}</div>
                {runningQuestionIndex <= lastQuestionIndex - 1 ?
                    <input
                        onClick={nextQuestion}
                        className="btn btn-primary result__button"
                        type="submit"
                        value="Наступне запитання"
                    /> :
                    <button className="result__button btn btn-danger">
                        <Link to='/result' className="result__link" onClick={getResult}> Отримати результат</Link>
                    </button>
                }
            </div>
        </div>
    );
}

export default Quiz;