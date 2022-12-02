const input = await Deno.readTextFile("days/2/input.txt");

const SCORING: Record<string, number[]> = {
  "A X": [4, 3],
  "A Y": [8, 4],
  "A Z": [3, 8],
  "B X": [1, 1],
  "B Y": [5, 5],
  "B Z": [9, 9],
  "C X": [7, 2],
  "C Y": [2, 6],
  "C Z": [6, 7],
};

const getAnswer = (column: number) =>
  input
    .replaceAll("\r", "")
    .split("\n")
    .map((turn) => SCORING[turn][column])
    .reduce((a, b) => a + b, 0);

console.table({
  "First part answer": getAnswer(0),
  "Second part answer": getAnswer(1),
});
