class SpaceObject {
  constructor (value) {
    this.value = value;
    this.directOrbit = [];
    this.indirectOrbit = [];
  }
};

let orbitMap = [];
let spaceObjects = new Map();

const addToDirect = (parent, child) => {
  spaceObjects.get(parent).directOrbit.push(child);
};

const addToIndirect = (parent, child) => {
  for (let [key, spaceObj] of spaceObjects) {
    if (spaceObj.directOrbit.indexOf(parent) > -1) {
      spaceObj.indirectOrbit.push(child);
      // recursively until root
      addToIndirect(spaceObj.value, child);
    }
  };
};

const process = () => {
  orbitMap.forEach(orbit => {
    let objects = orbit.split(')');
    // Add to space objects if not there already.
    if (!spaceObjects.has(objects[0])) {
      spaceObjects.set(objects[0], new SpaceObject(objects[0]));
    }
    // Add to direct
    addToDirect(objects[0], objects[1]);
  });
  // Add to indirect recursively until root
  orbitMap.forEach(orbit => {
    let objects = orbit.split(')');
    addToIndirect(objects[0], objects[1]);
  });
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('6.input')
});

lineReader
  .on('line', (line) => {
    orbitMap.push(line);
  })
  .on('close', () => {
    process();

    // 5-I
    // let number = 0;
    // spaceObjects.forEach(obj => {
    //   number += obj.directOrbit.length;
    //   number += obj.indirectOrbit.length;
    // });
    // console.log(number);

    // 5-II
  });
