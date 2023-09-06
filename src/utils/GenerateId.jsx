export default function generateUniqueId() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomAlphabets = Array.from(
    { length: 2 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join("");

  const randomNumbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return randomAlphabets + randomNumbers;
}
