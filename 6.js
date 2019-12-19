let orbitMap = [];
const estallarMap = {};

const calculateOrbits = (planet, map, jumps = 0) => {
  return map[planet] !== undefined ? calculateOrbits(map[planet], map, ++jumps) : jumps;
};

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('6.input')
});

lineReader
  .on('line', (line) => {
    orbitMap.push(line);
  })
  .on('close', () => {
    // process_part1();
    process_part2();
  });

const process_part1 = () => {
  orbitMap.forEach(value => {
    const [center, inOrbit] = value.split(')');
    if(!estallarMap[inOrbit]) estallarMap[inOrbit] = [center];
  });

  console.log(Object.keys(estallarMap).reduce(
    (accumulator, currentValue) => accumulator + calculateOrbits(currentValue, estallarMap), 0
  ));
};

const navigate = (planet, map, origin = 'YOU', jumps = 0) => {
  for(let i=0; i < map[planet].length; i++) {
    const orbitObject = map[planet][i];
    let currentJumps = jumps;
    if (orbitObject === 'SAN') {
      console.log(`Found Santa on ${planet} at ${jumps} jumps`);
      return jumps;
    }
    if (orbitObject !== origin) {
      //console.log(`Going from ${planet} to ${orbitObject} with ${jumps} jumps`);
      const isValidRoute = navigate(orbitObject, map, planet, ++currentJumps);
      if (isValidRoute !== -1) return isValidRoute;
    }
  }
  //console.log(`Dead end on planet ${planet}`);
  return -1;
}

const process_part2 = () => {
  orbitMap.forEach(value => {
    const [center, inOrbit] = value.split(')');
    if(estallarMap[center] === undefined) {
      estallarMap[center] = [inOrbit];
    } else {
      estallarMap[center].push(inOrbit);
    }
    if(estallarMap[inOrbit] === undefined) {
      estallarMap[inOrbit] = [center];
    } else {
      estallarMap[inOrbit].push(center);
    }
  });

  navigate(estallarMap['YOU'], estallarMap);
};