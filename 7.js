const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

class Computer {
  constructor(input, program) {
    this.input = input;
    this.inputCounter = 0;
    this.program = program;
  }

  splitcode(value) {
    return {
      opcode: value % 100,
      param1mode: (parseInt(value / 100) % 10),
      param2mode: (parseInt(value / 1000) % 10),
      param3mode: (parseInt(value / 10000) % 10),
    }
  }

  getValue(arr, val, mode) {
    switch (mode) {
      case POSITION_MODE:
        return arr[val];
      case IMMEDIATE_MODE:
        return val;
      default:
        console.log('Invalid Mode');
    }
  }

  compute() {
    let arr = this.program;
    let pointer = 0;
    while (true) {
      let split = this.splitcode(arr[pointer]);
      let opcode = split.opcode;
      //console.log(split);
      if (opcode === 1) {
        let [opc, param1, param2, position] = arr.slice(pointer, pointer + 4);
        arr[position] = this.getValue(arr, param1, split.param1mode) + this.getValue(arr, param2, split.param2mode);
        pointer += 4;
      } else if (opcode === 2) {
        let [opc, param1, param2, position] = arr.slice(pointer, pointer + 4);
        arr[position] = this.getValue(arr, param1, split.param1mode) * this.getValue(arr, param2, split.param2mode);
        pointer += 4;
      } else if (opcode === 3) {
        // Input
        let [opc, position] = arr.slice(pointer, pointer + 2);
        arr[position] = this.input[this.inputCounter++];
        pointer += 2;
      } else if (opcode === 4) {
        // Output
        let [opc, position] = arr.slice(pointer, pointer + 2);
        return arr[position];
        pointer += 2;
      } else if (opcode === 5) {
        let [opc, param1, param2, postition] = arr.slice(pointer, pointer + 3);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value !== 0) {
          pointer = param2Value;
        } else {
          pointer += 3;
        }
      } else if (opcode === 6) {
        let [opc, param1, param2, postition] = arr.slice(pointer, pointer + 3);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value === 0) {
          pointer = param2Value;
        } else {
          pointer += 3;
        }
      } else if (opcode === 7) {
        let [opc, param1, param2, postition] = arr.slice(pointer, pointer + 4);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value < param2Value) {
          arr[postition] = 1;
        } else {
          arr[postition] = 0;
        }
        pointer += 4;
      } else if (opcode === 8) {
        let [opc, param1, param2, postition] = arr.slice(pointer, pointer + 4);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value === param2Value) {
          arr[postition] = 1;
        } else {
          arr[postition] = 0;
        }
        pointer += 4;
      } else if (opcode === 99) {
        console.log('Program Halted!');
        // return arr;
      } else {
        // return arr;
      }
    }
  }
}

const getAllPermutations = (string) => {
  let results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (let i = 0; i < string.length; i++) {
    let firstChar = string[i];
    let charsLeft = string.substring(0, i) + string.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

// 2 - I
// var arrAns = compute([1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,1,6,23,27,1,10,27,31,1,5,31,35,2,6,35,39,1,5,39,43,1,5,43,47,2,47,6,51,1,51,5,55,1,13,55,59,2,9,59,63,1,5,63,67,2,67,9,71,1,5,71,75,2,10,75,79,1,6,79,83,1,13,83,87,1,10,87,91,1,91,5,95,2,95,10,99,2,9,99,103,1,103,6,107,1,107,10,111,2,111,10,115,1,115,6,119,2,119,9,123,1,123,6,127,2,127,10,131,1,131,6,135,2,6,135,139,1,139,5,143,1,9,143,147,1,13,147,151,1,2,151,155,1,10,155,0,99,2,14,0,0])
// console.log(arrAns);

//2 - II
// for(let i=0; i<100; i++) {
//   for(let j=0; j<100; j++) {
//     let arrNew = [1,i,j,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,1,6,23,27,1,10,27,31,1,5,31,35,2,6,35,39,1,5,39,43,1,5,43,47,2,47,6,51,1,51,5,55,1,13,55,59,2,9,59,63,1,5,63,67,2,67,9,71,1,5,71,75,2,10,75,79,1,6,79,83,1,13,83,87,1,10,87,91,1,91,5,95,2,95,10,99,2,9,99,103,1,103,6,107,1,107,10,111,2,111,10,115,1,115,6,119,2,119,9,123,1,123,6,127,2,127,10,131,1,131,6,135,2,6,135,139,1,139,5,143,1,9,143,147,1,13,147,151,1,2,151,155,1,10,155,0,99,2,14,0,0];
//     var arrAns = compute(arrNew);
//     if (arrAns[0] === 19690720) {
//       console.log(i, j);
//       console.log(100 * i + j);
//     }
//   }
// }

// 5
// var amp1 = new Computer([5], [3, 225, 1, 225, 6, 6, 1100, 1, 238, 225, 104, 0, 1102, 7, 85, 225, 1102, 67, 12, 225, 102, 36, 65, 224, 1001, 224, -3096, 224, 4, 224, 1002, 223, 8, 223, 101, 4, 224, 224, 1, 224, 223, 223, 1001, 17, 31, 224, 1001, 224, -98, 224, 4, 224, 1002, 223, 8, 223, 101, 5, 224, 224, 1, 223, 224, 223, 1101, 86, 19, 225, 1101, 5, 27, 225, 1102, 18, 37, 225, 2, 125, 74, 224, 1001, 224, -1406, 224, 4, 224, 102, 8, 223, 223, 101, 2, 224, 224, 1, 224, 223, 223, 1102, 13, 47, 225, 1, 99, 14, 224, 1001, 224, -98, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 2, 224, 1, 224, 223, 223, 1101, 38, 88, 225, 1102, 91, 36, 224, 101, -3276, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 224, 223, 223, 1101, 59, 76, 224, 1001, 224, -135, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 6, 224, 1, 223, 224, 223, 101, 90, 195, 224, 1001, 224, -112, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 7, 224, 1, 224, 223, 223, 1102, 22, 28, 225, 1002, 69, 47, 224, 1001, 224, -235, 224, 4, 224, 1002, 223, 8, 223, 101, 5, 224, 224, 1, 223, 224, 223, 4, 223, 99, 0, 0, 0, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 107, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 329, 1001, 223, 1, 223, 1107, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 344, 101, 1, 223, 223, 108, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 359, 101, 1, 223, 223, 7, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 374, 101, 1, 223, 223, 1008, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 389, 1001, 223, 1, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 404, 101, 1, 223, 223, 1007, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 419, 101, 1, 223, 223, 7, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 434, 1001, 223, 1, 223, 8, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 449, 101, 1, 223, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 464, 101, 1, 223, 223, 1007, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 479, 101, 1, 223, 223, 108, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 494, 1001, 223, 1, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 509, 1001, 223, 1, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 524, 101, 1, 223, 223, 1108, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 539, 1001, 223, 1, 223, 1008, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 554, 101, 1, 223, 223, 1008, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 569, 1001, 223, 1, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 584, 101, 1, 223, 223, 107, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 599, 101, 1, 223, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 614, 101, 1, 223, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 629, 101, 1, 223, 223, 108, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 644, 1001, 223, 1, 223, 1107, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 659, 101, 1, 223, 223, 1108, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 674, 101, 1, 223, 223, 4, 223, 99, 226]);
// amp1.compute();

// 7 - I
// var program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
// var amp1 = new Computer([], [...program])

let program = [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99];
let phaseSettings = getAllPermutations('01234');
let signals = {};
for(let i=0; i < phaseSettings.length; i++) {
  let phaseSetting = phaseSettings[i];
  let input = 0;
  for(let j=0; j < 5; j++) {
    let amp = new Computer([parseInt(phaseSetting[j]), parseInt(input)], [...program])
    input = amp.compute();
  }
  signals[phaseSetting] = input;
}

let values = Object.values(signals);
console.log(Math.max(...values))