import { useCallback, useEffect, useState } from "react"
import Guesses from "./components/Guesses"

const TARGET_WORD = 'apple';

type LetterStatus = 'correct' | 'present' | 'absent';

type EvaluatedLetter = {
  letter: string;
  status: LetterStatus;
}

export type EvaluatedGuess = EvaluatedLetter[];

function evaluateGuess(guess: string, answer: string) {
  guess = guess.toLowerCase();
  answer = answer.toLowerCase();

  const evaluatedLetters: EvaluatedLetter[] = [];

  for (let index = 0; index < guess.length; index++) {
    if (guess.charAt(index) === answer.charAt(index)) {
      evaluatedLetters.push({
        letter: guess.charAt(index),
        status: 'correct'
      });

      continue;
    }

    if (answer.includes(guess.charAt(index))) {
      evaluatedLetters.push({
        letter: guess.charAt(index),
        status: 'present'
      });

      continue;
    }

    evaluatedLetters.push({
      letter: guess.charAt(index),
      status: 'absent'
    });
  }

  return evaluatedLetters;
}

function App() {
  const [submittedGuesses, setSubmittedGuesses] = useState<EvaluatedGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      return;
    }

    if (submittedGuesses.length >= 6) {
      return;
    }

    
    setSubmittedGuesses([...submittedGuesses, evaluateGuess(currentGuess, TARGET_WORD)]);
    setCurrentGuess("");
  }, [currentGuess, submittedGuesses]);

  useEffect(() => {
    function handleKeyDown (e: KeyboardEvent) {
      if (e.key === "Enter") {
        submitGuess();
        return;
      }

      if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        setCurrentGuess((prev) => {
          if (prev.length >= 5) return prev;
          return prev + e.key.toLowerCase();
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submitGuess]);

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <Guesses submittedGuesses={submittedGuesses} currentGuess={currentGuess}/>
    </div>
  )
}

export default App
