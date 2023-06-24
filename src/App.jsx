import { useEffect, useState } from "react";

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
    <div className=" mx-auto p-4 bg-gradient-to-r min-h-screen from-purple-500 to-blue-500 flex flex-col justify-center">
      <div id="intro" className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Quizzical</h1>
        <p className="text-white text-lg mb-8">Some Text</p>
        <button
          id="start"
          className="bg-pink-500 transition-all hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto w-1/2"
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
            <div className="flex flex-col justify-center gap-5 bg-white bg-opacity-80 p-6 rounded-lg" key={index}>
              <h3 className="text-2xl font-bold">{item.question}</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                {item.answers.map((answer, answerIndex) => {
                  return (
                    <button
                      key={answerIndex}
                      className={`bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selectedAnswers[index] === answer ? "bg-blue-800" : ""
                      }`}
                      onClick={() => {
                        const updatedSelectedAnswers = [...selectedAnswers];
                        updatedSelectedAnswers[index] = answer;
                        setSelectedAnswers(updatedSelectedAnswers);
                      }}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
              <hr className="my-4 border-gray-500" />
            </div>
          );
        })}
        <div className="flex justify-center items-center mt-8">
          <button
            id="check"
            className="bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
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
      <div className="text-center mt-8 hidden" id="score">
        <p className="text-lg text-white">
          You scored <span className="font-bold">{score}</span>/5 correct answers
        </p>
        <button
          id="play-again"
          className="bg-blue-500 transition-all hover:bg-blue-700 ml-3 text-white font-bold py-2 px-4 rounded hidden"
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
