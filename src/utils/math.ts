export function getRank(mu: number, sigma: number): number {
  return Math.round(mu - 3 * sigma);
}
