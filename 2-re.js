// Range Extraction : https://www.codewars.com/kata/51ba717bb08c1cd60f00002f
// Time: O(n^2) Space: O(n) BAD
function solution(list) {
  let result = [];
  let range = [];

  for (i = 0; i < list.length; i++) {
    //check if next number is next
    range.push(list[i]);
    while (list[i] + 1 === list[i + 1]) {
      i++;
      range.push(list[i]);
    }

    //add seperator "-" for range that is more than 2
    if (range.length > 2) {
      result.push([range[0] + "-" + range[range.length - 1]]);
    } else {
      result.push(range);
    }

    range = [];
  }

  return result.join(",");
}

// Time: O(n) Space: O(n) BEST
function solution(list) {
  let result = [];
  let range = [];

  let i = 0;
  while (i < list.length) {
    range.push(list[i]);

    if (list[i] + 1 !== list[i + 1]) {
      //add seperator "-" for range that is more than 2
      if (range.length > 2) {
        result.push([range[0] + "-" + range[range.length - 1]]);
      } else {
        result.push(range);
      }
      range = [];
    }

    i++;
  }
  return result.join(",");
}

console.log(
  solution([
    -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
  ])
); //"-6,-3-1,3-5,7-11,14,15,17-20"
