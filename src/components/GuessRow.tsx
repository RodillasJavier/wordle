import type { EvaluatedGuess } from "../App";

type GuessRowProps = {
  row?: string;
  evaluatedRow?: EvaluatedGuess;
}

function GuessRow({row, evaluatedRow}: GuessRowProps) {
  const letters = [];
  const tileClassName = "flex aspect-square w-full items-center justify-center rounded sm:h-12 sm:w-12";
  const textClassName = "text-lg font-bold uppercase sm:text-2xl";

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
    <div className="grid w-full grid-cols-5 gap-2">
      {letters}
    </div>
  )
}

export default GuessRow;
