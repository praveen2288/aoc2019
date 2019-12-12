const RANGE = [353096, 843212];

function check(number) {
  // Number within range
  if (!(number >= RANGE[0] && number <= RANGE[1])) {
    // console.log('Not in range');
    return false;
  }

  // 4 Part 2 Increasing pair of digits or same
  var numString = number.toString().split('');
  return isValidPassword(numString);
}

function isValidPassword(digits) {
  const hasDoubleNotTriple = (
    (digits[0] === digits[1] && digits[1] !== digits[2])
    || (digits[1] === digits[2] && digits[0] !== digits[1] && digits[2] !== digits[3])
    || (digits[2] === digits[3] && digits[1] !== digits[2] && digits[3] !== digits[4])
    || (digits[3] === digits[4] && digits[2] !== digits[3] && digits[4] !== digits[5])
    || (digits[4] === digits[5] && digits[3] !== digits[4]));
  // const noDecrease = (digits[0] < digits[1] && digits[1] < digits[2] && digits[2] < digits[3] && digits[3] < digits[4] && digits[4] < digits[5])
  const noDecrease = (!(digits[0] > digits[1] || digits[1] > digits[2] || digits[2] > digits[3] || digits[3] > digits[4] || digits[4] > digits[5]));
  return hasDoubleNotTriple && noDecrease;
}

let count = 0;
for(let i=RANGE[0]; i<=RANGE[1]; i++) {
  if(check(i)) {count++};
}
// console.log(check(455699));
console.log(count);
