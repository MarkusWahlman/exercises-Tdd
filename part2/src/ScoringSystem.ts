export class ScoringSystem {
  score: number;
  level: number;
  totalLinesCleared: number;

  linesCleared(lineCount: number) {
    switch (lineCount) {
      case 1:
        this.score += 40 * (this.level + 1);
        break;
      case 2:
        this.score += 100 * (this.level + 1);
        break;
      case 3:
        this.score += 300 * (this.level + 1);
        break;
      case 4:
        this.score += 1200 * (this.level + 1);
        break;
      default:
        console.error(`Unexpected line count: ${lineCount}`);
    }

    this.totalLinesCleared += lineCount;
    this.level = Math.min(10, Math.floor(this.totalLinesCleared / 10));
  }

  constructor(score = 0, level = 0, totalLinesCleared = 0) {
    this.score = score;
    this.level = level;
    this.totalLinesCleared = totalLinesCleared;
  }
}
