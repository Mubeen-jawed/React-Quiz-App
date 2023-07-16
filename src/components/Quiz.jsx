import React, { useState, useEffect } from 'react'
import quizDataArray from '../quizData'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Quiz = () => {
  const [questionNum, setQuestionNum] = useState(1)
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState([])
  const [quizDataArr, setQuizDataArr] = useState([])

  let quizData = quizDataArr


  axios.get("http://localhost:8080/data")
    .then(res => {
      let userQuizName = localStorage.getItem("userQuizName");

      let inputData = res.data

      let filteredData = inputData?.find((data) => data?.quizName == userQuizName)
      // console.log(filteredData)
      let updatedFiltered = filteredData?.quizQuestions?.map((data) => {
        return data
      })

      setQuizDataArr(updatedFiltered)

    })
    .catch(e => console.log(e))

  // console.log(quizDataArr, "quizDataArr");
  // quizData.filter((data) => data)
  //   .map((data1, i) => {
  //     console.log(data1, i);
  //   })

  let totalQuestion = quizData.length


  let handleOptionClick = (e, correctAnswer) => {
    let userChoosenAnswer = e.target.textContent

    setQuestionNum((prevValue) => prevValue + 1)

    {
      if (userChoosenAnswer == correctAnswer) {
        setCorrectAnswerCounter(prevValue => prevValue + 1)
        console.log(correctAnswerCounter);
      } else {
        let wrongAnsQuestion = userChoosenAnswer
        setWrongAnswer((prevValue) => [prevValue + wrongAnsQuestion])
        wrongAnswer.join(",")
        console.log(wrongAnswer);
      }
    }
  }

  return (
    <div>
      {/* <Link to="/form" type='submit' class="button buttonRed">Create A Quiz
        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
      </Link> */}

      {/* console.log(data.id); */}
      {/* <button type='button' onclick={window.location.reload()}>Reload</button> */}

      <div className="container">
        <div id="quiz">
          <h1>{questionNum > totalQuestion ? "Result" : "Quiz"}</h1>

          <hr style={{ marginBottom: "20px" }} />


          {quizData.filter((data) => data.questionNum == questionNum)



            .map((data1, i) => {
              return (
                <>
                  <p id="question">{data1?.question}</p>
                  <div className="button-grp">
                    <button onClick={(e) => handleOptionClick(e, data1.correctAnswer)} id="btn0"><span id="choice0">{data1.options.option1}</span></button>
                    <button onClick={(e) => handleOptionClick(e, data1.correctAnswer)} id="btn1"><span id="choice1">{data1.options.option2}</span></button>
                    <button onClick={(e) => handleOptionClick(e, data1.correctAnswer)} id="btn2"><span id="choice2">{data1.options.option3}</span></button>
                    <button onClick={(e) => handleOptionClick(e, data1.correctAnswer)} id="btn3"><span id="choice3">{data1.options.option4}</span></button>
                  </div>
                </>
              )
            })

          }

          {/* quizData?.map((data1, i) => {
            
          })
          } */}
          {/* .filter((data) => data.questionNum == 1) */}

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