const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

/*
  The Date class is directly used inside of the function, making it hard to test.
  The function does not work as intended if it's called in december after christmas.
*/
