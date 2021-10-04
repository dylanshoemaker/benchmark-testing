const Benchmark = require('benchmark');
const { linearSearch, binarySearch } = require('./search');
const { bubbleSort } = require('./sort');
const { quickSort } = require('./sort');
const numbers = [];
for (let i = 0; i < 1000; i++) {
  numbers.push(Math.floor(Math.random() * 10000) + 1);
}

// grab the last number in the array as the number we want to find
const target = numbers[numbers.length-1];

const suite = new Benchmark.Suite;

suite
  .add('linear search', function() {
    linearSearch(numbers, target);
  })
  .add('binary search', function() {
    binarySearch(numbers, target, 0, numbers.length-1)
  })
  .add('bubble sort', function() {
    const testArray = [...numbers];

    bubbleSort(testArray);
  })
  .add('quick sort', function() {
    const testArray = [...numbers];

    quickSort(testArray);
  })
  .on('complete', function() {
    this.forEach(result => console.log(`${result.name} averaged ${result.stats.mean*1000} milliseconds.`));
  })
  .run();