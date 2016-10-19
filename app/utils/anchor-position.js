export default function anchorPosition(isInput, numberPorts, whichPort) {
  return {
    "input": [
      [ [0.5, 0, 0, -1] ],
      [ [0.2, 0, 0, -1], [0.8, 0, 0, -1] ],
      [ [0.2, 0, 0, -1], [0.5, 0, 0, -1], [0.8, 0, 0, -1] ]
    ],
    "output": [
      [ [0.5, 1, 0, 1] ],
      [ [0.2, 1, 0, 1], [0.8, 1, 0, 1] ],
      [ [0.2, 1, 0, 1], [0.5, 1, 0, 1], [0.8, 1, 0, 1] ]
    ]
  }[isInput ? "input" : "output"][numberPorts - 1][whichPort];
}
