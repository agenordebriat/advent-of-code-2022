const input = await Deno.readTextFile("days/1/input.txt");

const answer = input
  .split("\n\n")
  .map((s) => s.split("\n"))
  .map((arr) => arr.reduce((acc, cur) => +acc + +cur, 0))
  .sort((a, b) => b - a)
  .slice(0, 3);

console.table({
  "First part answer": answer[0],
  "Second part answer": answer.reduce((acc, cur) => acc + cur, 0),
});
