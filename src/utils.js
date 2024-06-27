export function getRandomElements(arr, x, k) {
  if (x > arr.length || k < 0 || k > arr.length) {
    return []
  }

  // Fisher-Yates shuffle
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
  }

  // Ensure the element at index k is included
  const resultSet = [];
  resultSet.push(arr[k]);

  // Create a new array excluding the element at index k
  const arrWithoutElementK = arr.filter((_, index) => index !== k);

  // Shuffle the remaining elements
  shuffle(arrWithoutElementK);

  // Add elements until we reach x elements
  for (let i = 0; i < arrWithoutElementK.length && resultSet.length < x; i++) {
      resultSet.push(arrWithoutElementK[i]);
  }

  shuffle(resultSet);
  // Convert the set to an array and return
  return resultSet;
}