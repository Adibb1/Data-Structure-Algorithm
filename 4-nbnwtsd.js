// Next bigger number with the same digits : https://www.codewars.com/kata/55983863da40caa2c900004e
// Time: O(n^2) Space: O(n) BAD
function nextBigger(num) {
  //early return
  let sorted = num
    .toString()
    .split("")
    .sort((a, b) => b - a)
    .join(""); //sort the number
  if (sorted == num.toString()) return -1; //if sorted and num is same, that means the num is the biggest possible number

  let focusedArray = [];
  let pastNum = [];
  let tempArray = [];
  let nextNum = -1;
  num = num.toString().split(""); //change input(integers) into array for easy iteration

  //from right
  for (i = num.length - 1; i > 0; i--) {
    pastNum.unshift(num[i]); //keep track for the past numbers
    nextNum = num[i - 1]; //-1 bcs we're moving from right to left
    if (num[i] > nextNum) {
      break; //found the pair of num
    }
  }

  //find in the pastNum, next bigger number to the nextNum
  let nextBigToNextNum = 9; //9 is the biggest possible number. can also put infinity
  pastNum.map((num) => {
    if (num > nextNum && num < nextBigToNextNum) nextBigToNextNum = num;
  });
  focusedArray.push(nextBigToNextNum);

  //delete the nextBigToNextNum in pastNum
  pastNum.splice(pastNum.indexOf(nextBigToNextNum.toString()), 1);

  //add pastNum and nextNum to tempArray, to sort
  tempArray = [...pastNum, nextNum];
  tempArray.sort((a, b) => a - b); //#########################

  //add tempArray into focusedArray
  focusedArray = [...focusedArray, ...tempArray];

  num = num.slice(0, num.length - focusedArray.length); //take only the front numbers that are not changed
  return parseInt([...num, ...focusedArray].join("")); //combine all numbers
}

// Time: O(n) Space: O(n) BEST
function nextBigger(num) {
  num = num
    .toString()
    .split("")
    .map((n) => parseInt(n)); //change input(integers) into array for easy iteration
  let numLength = num.length;

  // find the first pair of digits where right is bigger than left
  let i = numLength - 2;
  while (i >= 0 && num[i] >= num[i + 1]) {
    //if right is bigger than left, it will not go to this loop and we will get the value (i), which is the index of the smaller number
    i--;
  }

  // if no pair is found, return -1
  if (i === -1) return -1;

  // find the next bigger digit on the right side of (i)
  let j = numLength - 1;
  while (num[j] <= num[i]) {
    j--;
  }

  // make the bigger digit in the front (swap) --- 1321 --> 2311
  [num[i], num[j]] = [num[j], num[i]]; // swap

  // reverse
  let left = i + 1; //left pointer
  let right = numLength - 1; //right pointer
  while (left < right) {
    [num[left], num[right]] = [num[right], num[left]]; //normal swap
    left++;
    right--;
  }

  // Convert back to integer and return the result
  return parseInt(num.join(""));
}

console.log(nextBigger(531)); //-1
console.log(nextBigger(12)); //21
console.log(nextBigger(2017)); //2071
console.log(nextBigger(1234567890)); //1234567908
console.log(nextBigger(123459870)); //123470589

/*
  123459870
  1234 59870
  5 9870
  7 9850
  7 0589
  70589
  123470589
  
  START
  loop until find number that is bigger next to current num
  group all numbers that already passed in the loop excluding the number u want to swap
  find the number that is next biggest to the number you want to swap
  make that number the leftest number
  group the other numbers including the number you want to swap
  sort that grouped numbers
  order will be: next biggest number to the one you want to swap + everything else, sorted
  join and happy
  END
  */
