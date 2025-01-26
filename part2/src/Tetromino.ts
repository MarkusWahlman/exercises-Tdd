// import { Block } from "./Block.js";
// import { Board } from "./Board.js";

// export enum Tetromino {
//   I_SHAPE = "I",
//   T_SHAPE = "T",
//   L_SHAPE = "L",
//   J_SHAPE = "J",
//   S_SHAPE = "S",
//   Z_SHAPE = "Z",
//   O_SHAPE = "O",
// }

// export class TetrominoShape {
//   blocks: Block[];
//   board: Board;
//   isFalling: boolean;

//   constructor(board: Board, type: Tetromino) {
//     this.board = board;
//     this.isFalling = false;
//     const shapeOffsets: Record<Tetromino, [number, number][]> = {
//       [Tetromino.I_SHAPE]: [
//         [0, -1],
//         [0, 0],
//         [0, 1],
//         [0, 2],
//       ],
//       [Tetromino.T_SHAPE]: [
//         [0, -1],
//         [0, 0],
//         [0, 1],
//         [1, 0],
//       ],
//       [Tetromino.L_SHAPE]: [
//         [-1, 0],
//         [0, 0],
//         [1, 0],
//         [1, 1],
//       ],
//       [Tetromino.J_SHAPE]: [
//         [-1, 1],
//         [0, 1],
//         [1, 1],
//         [1, 0],
//       ],
//       [Tetromino.S_SHAPE]: [
//         [0, -1],
//         [0, 0],
//         [1, 0],
//         [1, 1],
//       ],
//       [Tetromino.Z_SHAPE]: [
//         [0, 0],
//         [0, 1],
//         [1, -1],
//         [1, 0],
//       ],
//       [Tetromino.O_SHAPE]: [
//         [0, 0],
//         [0, 1],
//         [1, 0],
//         [1, 1],
//       ],
//     };

//     this.blocks = shapeOffsets[type].map(([dx, dy]) => {
//       return new Block(board, type.toString(), dx, dy);
//     });
//   }
// }
