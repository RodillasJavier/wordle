import type { EvaluatedGuess } from "../App";

type GuessRowProps = {
  row?: string;
  evaluatedRow?: EvaluatedGuess;
}

function GuessRow({row, evaluatedRow}: GuessRowProps) {
  const letters = [];
  const tileClassName = "aspect-square w-12.5 h-12.5 rounded flex items-center justify-center";
  const textClassName = "text-xl font-bold uppercase sm:text-2xl";

  // Previous guesses
  if (evaluatedRow) {
    evaluatedRow.forEach((letter, index) => {
      let bgClass = "bg-neutral-300";

      if (letter.status === "correct") {
        bgClass = "bg-green-400";
      } else if (letter.status === "present") {
        bgClass = "bg-yellow-300";
      } else if (letter.status === "absent") {
        bgClass = "bg-gray-400";
      }

      letters.push(
        <div 
          className={`${tileClassName} ${bgClass}`}
          key={index}
        >
            <p className={textClassName}>
              {letter.letter}
            </p>
        </div>
      );
    });
    
  }

  // Current guess or empty rows
  else {
    for (let index = 0; index < 5; index++) {
      const displayRow = row ?? "";
      const letter = displayRow[index] ?? "";

      letters.push(
        <div className={`${tileClassName} bg-neutral-300`} key={index}>
          <p className={textClassName}>
            {letter}
          </p>
        </div>
      );
    }
  }

  return(
    <div className="flex flex-row gap-2 w-full items-center justify-center space-between">
      {letters}
    </div>
  )
}

export default GuessRow;
