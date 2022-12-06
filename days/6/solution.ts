const input = await Deno.readTextFile("days/6/input.txt");

const markerPosition = (packetLength: number) => {
  for (let index = 0; index < input.length; index++) {
    if (new Set(input.substring(index, index + packetLength)).size === packetLength) return index + packetLength;
  }

  return "No marker detected.";
};

console.table({
  "First part answer": markerPosition(4),
  "Second part answer": markerPosition(14),
});
