export function diceRoll(random = Math.random) {
  const min = 1;
  const max = 6;
  return Math.floor(random() * (max + 1 - min) + min);
}

export function diceHandValue(die1 = diceRoll(), die2 = diceRoll()) {
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
