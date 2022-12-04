const input = await Deno.readTextFile("days/4/input.txt");
const assignments = input
  .split("\n")
  .map((assignment) => assignment.split(",").map((assignment) => assignment.split("-").map(Number)));

const numberOfInvalidAssignments = (type?: string) =>
  assignments.reduce((acc, cur) => {
    const [[firstMin, firstMax], [secondMin, secondMax]] = cur;

    return type === "overlapping"
      ? secondMin <= firstMax && secondMax >= firstMin
        ? acc + 1
        : acc
      : (secondMin >= firstMin && secondMax <= firstMax) || (firstMin >= secondMin && firstMax <= secondMax)
      ? acc + 1
      : acc;
  }, 0);

console.table({
  "First part answer": numberOfInvalidAssignments(),
  "Second part answer": numberOfInvalidAssignments("overlapping"),
});
