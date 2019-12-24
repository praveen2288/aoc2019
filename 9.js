const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;
const RELATIVE_MODE = 2;

class Computer {
  constructor (input, program) {
    this.input = input;
    this.program = program;
    this.output = 0;
    this.halted = false;
    this.pointer = 0;
    this.relativeBase = 0;
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
        return arr[val] === undefined ? 0 : arr[val];
      case IMMEDIATE_MODE:
        return val;
      case RELATIVE_MODE:
        return arr[val + this.relativeBase] === undefined ? 0 : arr[val + this.relativeBase];
      default:
        console.log('Invalid Mode');
    }
  }

  run(signal) {
    if (signal !== undefined) {
      this.input.push(signal);
    }
    let arr = this.program;
    while (this.pointer < arr.length) {
      let split = this.splitcode(arr[this.pointer]);
      let opcode = split.opcode;
      //console.log(split);
      if (opcode === 1) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 4);
        arr[position] = this.getValue(arr, param1, split.param1mode) + this.getValue(arr, param2, split.param2mode);
        this.pointer += 4;
      } else if (opcode === 2) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 4);
        arr[position] = this.getValue(arr, param1, split.param1mode) * this.getValue(arr, param2, split.param2mode);
        this.pointer += 4;
      } else if (opcode === 3) {
        // Input
        let [opc, position] = arr.slice(this.pointer, this.pointer + 2);
        if (split.param1mode === 2) {
          position = position + this.relativeBase;
        }
        arr[position] = this.input.shift();
        this.pointer += 2;
      } else if (opcode === 4) {
        // Output
        let [opc, position] = arr.slice(this.pointer, this.pointer + 2);
        if (split.param1mode === 2) {
          position = position + this.relativeBase;
        }
        this.pointer += 2;
        this.output = arr[position];
        return this.output;
      } else if (opcode === 5) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 3);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value !== 0) {
          this.pointer = param2Value;
        } else {
          this.pointer += 3;
        }
      } else if (opcode === 6) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 3);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value === 0) {
          this.pointer = param2Value;
        } else {
          this.pointer += 3;
        }
      } else if (opcode === 7) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 4);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value < param2Value) {
          arr[position] = 1;
        } else {
          arr[position] = 0;
        }
        this.pointer += 4;
      } else if (opcode === 8) {
        let [opc, param1, param2, position] = arr.slice(this.pointer, this.pointer + 4);
        let param1Value = this.getValue(arr, param1, split.param1mode);
        let param2Value = this.getValue(arr, param2, split.param2mode);
        if (param1Value === param2Value) {
          arr[position] = 1;
        } else {
          arr[position] = 0;
        }
        this.pointer += 4;
      } else if (opcode === 9) {
        let [opc, baseInstruction] = arr.slice(this.pointer, this.pointer + 2);
        this.relativeBase = this.relativeBase + baseInstruction;
        this.pointer += 2;
      } else if (opcode === 99) {
        this.halted = true;
        //console.log('Program Halted!');
      } else {
        console.log('Unknown Opcode');
      }

      if (this.halted) {
        //return this.output;
        return;
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
// let program = [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99];
// let phaseSettings = getAllPermutations('01234');

// 7 - II
// const outputs = [];
// let program = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 34, 51, 76, 101, 114, 195, 276, 357, 438, 99999, 3, 9, 1001, 9, 3, 9, 1002, 9, 3, 9, 4, 9, 99, 3, 9, 101, 4, 9, 9, 102, 4, 9, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 101, 3, 9, 9, 102, 5, 9, 9, 1001, 9, 2, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 3, 9, 102, 2, 9, 9, 101, 4, 9, 9, 102, 3, 9, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 101, 4, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99];
// let phaseSettings = getAllPermutations('56789');
// for (let i = 0; i < phaseSettings.length; i++) {
//   let phaseSetting = phaseSettings[i];
//   let input = 0;
//   const A = new Computer([parseInt(phaseSetting[0])], [...program]);
//   const B = new Computer([parseInt(phaseSetting[1])], [...program]);
//   const C = new Computer([parseInt(phaseSetting[2])], [...program]);
//   const D = new Computer([parseInt(phaseSetting[3])], [...program]);
//   const E = new Computer([parseInt(phaseSetting[4])], [...program]);

//   while (true) {
//     let output1 = A.run(input);
//     let output2 = B.run(output1);
//     let output3 = C.run(output2);
//     let output4 = D.run(output3);
//     input = E.run(output4);
//     if (E.halted) {
//       break;
//     }
//   }
//   outputs.push(input);
// }

// console.log(Math.max(...outputs));

// 9 - I
let program = [104, 1125899906842624, 99];
const A = new Computer([], [...program]);
while (true) {
  let output = A.run();
  if (output !== undefined) {
    console.log(output);
  }
  if (A.halted) {
    break;
  }
}
