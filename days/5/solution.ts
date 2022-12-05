const input = await Deno.readTextFile("days/5/input.txt");
const [schema, instructions] = input.split("\n\n");
const cratesSchema = schema.split("\n").slice(0, -1);

type Crates = string[][];
const crates: Crates = [];

const CRATE_LENGTH = "[X]".length;

for (const line of cratesSchema) {
  for (let i = 0; i < line.length; i += CRATE_LENGTH + 1) {
    const lineIndex = i / (CRATE_LENGTH + 1);

    if (!crates[lineIndex]) crates[lineIndex] = [];

    const crate = line
      .slice(i, i + CRATE_LENGTH)
      .split("")[1]
      .trim();

    if (crate) crates[lineIndex].push(crate);
  }
}

crates.forEach((crate) => crate.reverse());

const parsedInstructions = instructions.split("\n").map((instruction) => {
  const { quantity, from, to } = instruction.match(/move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/)
    ?.groups as Record<"quantity" | "from" | "to", string>;

  return [+quantity, +from - 1, +to - 1];
});

const rearrangeCrates = ({ oneByOne = true } = {}) => {
  const cratesCopy = JSON.parse(JSON.stringify(crates));

  for (const [quantity, from, to] of parsedInstructions) {
    const cratesToMove = cratesCopy[from].splice(cratesCopy[from].length - quantity, quantity);

    if (oneByOne) cratesToMove.reverse();
    cratesCopy[to].push(...cratesToMove);
  }

  return cratesCopy;
};

const listTopCrates = (crates: Crates) => crates.map((crate) => crate.at(-1)).join("");

console.table({
  "First part answer": listTopCrates(rearrangeCrates()),
  "Second part answer": listTopCrates(rearrangeCrates({ oneByOne: false })),
});
