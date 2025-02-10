const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(currentDate = new Date()) {
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const christmasDay = new Date(currentDate.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
