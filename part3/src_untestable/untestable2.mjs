function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}

/*
  The randomness of diceRoll is hard to test without a set seed.
  The diceRoll function could (in one way or another) use a random generator that can be given to the function to use.

  The same applies to diceHandValue, as diceHandValue relies on diceRoll, which relies on randomness.
  diceHandRoll could take in the values rolled by the dice as parameters.
*/