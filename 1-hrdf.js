// Human readable duration format : https://www.codewars.com/kata/52742f58faf5485cae000b9a
// Time: O(n) Space: O(1) BAD
function formatDuration(seconds) {
  let result = [
    [0, "year"],
    [0, "day"],
    [0, "hour"],
    [0, "minute"],
    [0, "second"],
  ];
  let output = [];

  //early return
  if (seconds === 0) return "now";

  //substract the input
  while (seconds >= 31536000) {
    seconds -= 31536000;
    //update 'result' variable
    result[0][0] += 1;
  }
  while (seconds >= 86400) {
    seconds -= 86400;
    result[1][0] += 1;
  }
  while (seconds >= 3600) {
    seconds -= 3600;
    //update 'result' variable
    result[2][0] += 1;
  }
  while (seconds >= 60) {
    seconds -= 60;
    //update 'result' variable
    result[3][0] += 1;
  }
  //update 'result' variable
  result[4][0] += seconds;

  //format the output and add seperators
  result = result.filter((unit) => {
    //put 's'
    if (unit[0] > 1) unit[1] = unit[1] + "s";
    return unit[0] !== 0;
  });

  result.map((unit, index) => {
    //push the unit into output first
    output.push(unit.join(" "));

    //followed by seperator, except the last unit
    if (index !== result.length - 1) {
      if (index === result.length - 2) {
        output.push(" and ");
      } else {
        output.push(", ");
      }
    }
  });

  return output.join("");
}

// Time: O(1) Space: O(1) BEST
function formatDuration(seconds) {
  let result = [
    [0, "year"],
    [0, "day"],
    [0, "hour"],
    [0, "minute"],
    [0, "second"],
  ];
  let output = [];

  //early return
  if (seconds === 0) return "now";

  //divide and update the 'result variable
  result[0][0] = Math.floor(seconds / 31536000);
  //get remainder
  seconds = seconds % 31536000;

  result[1][0] = Math.floor(seconds / 86400);
  seconds = seconds % 86400;

  result[2][0] = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  result[3][0] = Math.floor(seconds / 60);
  seconds = seconds % 60;

  result[4][0] = seconds;

  //format the output and add seperators
  result = result.filter((unit) => {
    //put s
    if (unit[0] > 1) unit[1] = unit[1] + "s";
    return unit[0] !== 0;
  });

  result.map((unit, index) => {
    //push the unit into output first
    output.push(unit.join(" "));

    //followed by seperator
    if (index !== result.length - 1) {
      if (index === result.length - 2) {
        output.push(" and ");
      } else {
        output.push(", ");
      }
    }
  });

  return output.join("");
}

console.log(formatDuration(0)); //now
console.log(formatDuration(1)); //1 second
console.log(formatDuration(62)); //1 minute and 2 seconds
console.log(formatDuration(7262)); //
console.log(formatDuration(31536062)); //1 year, 1 minute and 2 seconds
