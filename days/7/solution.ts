const input = await Deno.readTextFile("days/7/input.txt");
const instructions = input.split("\n");

const folderPathes = ["/"];
const folderSizes: Record<string, number> = {};

for (const instruction of instructions) {
  const temporaryPathes = [...folderPathes];

  if (instruction.startsWith("$ cd")) {
    instruction.includes("..") ? folderPathes.pop() : folderPathes.push(instruction.split("$ cd ")[1]);
  } else if (instruction.match(/^\d/)) {
    const fileSize = +instruction.split(" ")[0];

    while (temporaryPathes.length > 0) {
      const key = temporaryPathes.join(".");

      temporaryPathes.pop();

      if (!(key in folderSizes)) folderSizes[key] = 0;

      folderSizes[key] += fileSize;
    }
  }
}

console.table({
  "First part answer": Object.values(folderSizes)
    .filter((folderSize) => folderSize <= 100_000)
    .reduce((acc, cur) => acc + cur, 0),
  "Second part answer": Math.min(
    ...Object.values(folderSizes).filter((folderSize) => folderSize >= folderSizes["/"] - 40_000_000)
  ),
});
