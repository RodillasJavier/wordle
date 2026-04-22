import GuessRow from "./GuessRow";
import type { EvaluatedGuess } from "../App";

type GuessesProps = {
  submittedGuesses: EvaluatedGuess[];
  currentGuess: string;
}

function Guesses({submittedGuesses, currentGuess}: GuessesProps) {
  const rows = [];

  for (let index = 0; index < 6; index++) {
    if (submittedGuesses[index]) {
      rows.push(<GuessRow evaluatedRow={submittedGuesses[index]} key={index} />)
    }

    else if (index == submittedGuesses.length) {
      rows.push(<GuessRow row={currentGuess} key={index} />)
    }

    else {
      rows.push(<GuessRow row={""} key={index} />)
    }
  }
  
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 sm:max-w-md">
      {rows}
    </div>
  )
}

export default Guesses;
