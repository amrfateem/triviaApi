import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = data.results.map((item) => {
          let answers = item.incorrect_answers;
          answers.push(item.correct_answer);
          answers.sort(() => Math.random() - 0.5);
          item.answers = answers;
          return item;
        });
        setQuestionsAndAnswers(updatedQuestions);
      });

    document.getElementById("check").classList.remove("hidden");
  }, []);

  const handleChange = () => {
    const scoreDiv = document.getElementById("score");
    const checkButton = document.getElementById("check");
    const playAgainButton = document.getElementById("play-again");
    checkButton.classList.add("hidden");
    playAgainButton.classList.remove("hidden");
    scoreDiv.classList.remove("hidden");
  };
  return (
    <div className="container mx-auto p-4">
      <div id="intro">
        <h1 className="text-3xl font-bold text-center">Quizzical</h1>
        <p>Some Text</p>
        <button
          id="start"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
          onClick={() => {
            document.getElementById("intro").classList.add("hidden");
            document.getElementById("questions").classList.remove("hidden");
          }}
        >
          Start Quiz
        </button>
      </div>
      <div id="questions" className="hidden">
        {questionsAndAnswers.map((item, index) => {
          return (
            <div className="flex flex-col justify-center gap-5" key={index}>
              <h3 className="text-xl font-bold">{item.question}</h3>
              <div className="flex gap-5 mt-2 items-center justify-center">
                {item.answers.map((answer, answerIndex) => {
                  return (
                    <div key={answerIndex}>
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        className=""
                        value={answer}
                        checked={selectedAnswers[index] === answer}
                        onChange={() => {
                          const updatedSelectedAnswers = [...selectedAnswers];
                          updatedSelectedAnswers[index] = answer;
                          setSelectedAnswers(updatedSelectedAnswers);
                        }}
                      />
                      <label
                        className="ml-2 rounded-full cursor-pointer"
                        onClick={() => {
                          const updatedSelectedAnswers = [...selectedAnswers];
                          updatedSelectedAnswers[index] = answer;
                          setSelectedAnswers(updatedSelectedAnswers);
                        }}
                      >
                        {answer}
                      </label>
                    </div>
                  );
                })}
              </div>
              <hr className="my-4" />
            </div>
          );
        })}
        <div className="flex justify-center items-center mt-4">
          <button
            id="check"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
            onClick={() => {
              handleChange();
              setScore(0);
              questionsAndAnswers.forEach((item, index) => {
                if (item.correct_answer === selectedAnswers[index]) {
                  setScore((prevScore) => prevScore + 1);
                }
              });
            }}
          >
            Check Answers
          </button>
        </div>
      </div>
      <div className="text-center mt-4 hidden" id="score">
        You scored <span className="font-bold">{score}</span>/5 correct answers
        <button
          id="play-again"
          className="bg-blue-500 hover:bg-blue-700 ml-3 text-white font-bold py-2 px-4 rounded hidden "
          onClick={() => {
            window.location.reload();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
