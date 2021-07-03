export default function generateRandomNum() {
  const rand = Math.floor(Math.random() * 1001);
  console.log('This is the random num:', rand);
  return rand;
}
