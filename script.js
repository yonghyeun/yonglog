const fs = require('fs');

const inputs =
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n')
    : fs.readFileSync('input.txt', 'utf8').trim().split('\n');

let [_, ...arr] = inputs.map((item) => Number(item));

const bubbleSort = (arr) => {
  let isSorted = true;

  for (let start = 0, end = arr.length - 1; start < end && isSorted; ) {
    isSorted = false;

    for (let index = start; index < end; index++) {
      if (arr[index] > arr[index + 1]) {
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
        isSorted = true;
      }
    }
  }
};

bubbleSort(arr);
console.log(arr);
