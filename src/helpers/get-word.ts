export default function getWord(lines: string[]) {
  const wordLine = lines.pop();
  const word = wordLine.split(':')[1].trim();
  return word;
}
