export function timeToHuman(time) {
  const seconds = time.toString().slice(0, -3);
  const milliseconds = time.toString().slice(-3, -1);
  const millisecondsRounded = Math.round(Number(milliseconds) / 10);
  return `${seconds}.${millisecondsRounded}`;
}
