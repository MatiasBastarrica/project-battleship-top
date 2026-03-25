export function getRandomNumInRange(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}
