import React, { useState, useEffect } from 'react'
import quizDataArray from '../quizData'
import axios from 'axios'

const Quiz = () => {
  const [questionNum, setQuestionNum] = useState(1)
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState([])
  const [quizDataArr, setQuizDataArr] = useState([])

  let quizData = quizDataArr

  // let quizData = quizDataArr

  axios.get("http://localhost:8080/data")
    .then(res => {
      let quizData = res.data
      let userQuizName = localStorage.getItem("userQuizName");
      console.log(userQuizName);
      // quizData.filter((data) => console.log(data.quizName == userQuizName))
      // .map((data) => {
      //   console.log(data);
      // })
      setQuizDataArr(quizData)
    })
    .catch(e => console.log(e))

  // console.log(quizData[0].question);
  // quizData.filter((data, i) => console.log(data.quizQuestions[i]))

  let totalQuestion = quizData.length


  let handleOptionClick = (e) => {
    let userChoosenAnswer = e.target.textContent

    setQuestionNum((prevValue) => prevValue + 1)

    {
      quizData.filter((data, i) => data.quizQuestions[i].questionNum == questionNum).map((data1, i) => {
        console.log(data1, "line 34");
        if (userChoosenAnswer == data1.quizQuestions[i].correctAnswer) {
          setCorrectAnswerCounter(prevValue => prevValue + 1)
          console.log(correctAnswerCounter);
        } else {
          let wrongAnsQuestion = data1.quizQuestions[i].question
          setWrongAnswer((prevValue) => [prevValue + wrongAnsQuestion])
          wrongAnswer.join(",")
          console.log(wrongAnswer);
        }
      })
    }
  }

  return (
    <div>

      {/* console.log(data.id); */}
      {/* <button type='button' onclick={window.location.reload()}>Reload</button> */}

      <div className="container">
        <div id="quiz">
          <h1>{questionNum > totalQuestion ? "Result" : "Quiz"}</h1>

          <hr style={{ marginBottom: "20px" }} />


          {quizData.filter((data, i) => data.quizQuestions[i].questionNum == questionNum).map((data1, i) => {
            return <p id="question">{data1.quizQuestions[i].question}</p>
          })}

          {quizData.filter((data, i) => data.quizQuestions[i].questionNum == questionNum).map((data1, i) => {

            return (
              <div className="button-grp">
                <button onClick={(e) => handleOptionClick(e)} id="btn0"><span id="choice0">{data1.quizQuestions[i].options.option1}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn1"><span id="choice1">{data1.quizQuestions[i].options.option2}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn2"><span id="choice2">{data1.quizQuestions[i].options.option3}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn3"><span id="choice3">{data1.quizQuestions[i].options.option4}</span></button>
              </div>
            )
          })}

          {/* </div> */}
          {/* }) : console.log("mm")} */}

          {questionNum <= totalQuestion ? (
            <div>
              <hr style={{ marginTop: "50px" }} />


              <footer>
                <p id="progress">Question {questionNum} of {totalQuestion}</p>
              </footer>
            </div>
          ) :

            <div className='score-container'>
              <footer>
                <h2 >Your Score is {correctAnswerCounter} of {totalQuestion}</h2>
              </footer>

              <button id='retry-btn' onClick={() => { setQuestionNum(1); setCorrectAnswerCounter(0); setWrongAnswer([]) }}>Retry</button>

              <h3>Wrong Answers Question:</h3>
              {wrongAnswer.map(answer => {
                return (
                  <ul>
                    <li>{answer}</li>
                  </ul>
                )
              })}
            </div>
          }

        </div>
      </div >

    </div >

  )
}

export default Quiz