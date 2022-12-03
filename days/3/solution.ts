const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const input = await Deno.readTextFile("days/3/input.txt");
const rucksacks = input.split("\n");
const groupsOfThreeRucksacks = [];

for (let i = 0; i < rucksacks.length; i += 3) {
  groupsOfThreeRucksacks.push(rucksacks.slice(i, i + 3));
}

const getSumOfPriorities = (array: string[]) =>
  array.map((char) => ALPHABET.indexOf(char) + 1).reduce((acc, cur) => acc + cur, 0);

const firstPartAnswer = getSumOfPriorities(
  rucksacks
    .map((rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)])
    .map(
      ([firstCompartment, secondCompartment]) =>
        firstCompartment.split("").filter((s) => secondCompartment.includes(s))[0]
    )
);

const secondPartAnswer = getSumOfPriorities(
  groupsOfThreeRucksacks.map(([firstCompartment, secondCompartment, thirdCompartment]) => {
    return firstCompartment.split("").filter((s) => secondCompartment.includes(s) && thirdCompartment.includes(s))[0];
  })
);

console.table({
  "First part answer": firstPartAnswer,
  "Second part answer": secondPartAnswer,
});
