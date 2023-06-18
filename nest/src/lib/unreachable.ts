export function unreachable(n: never): never {
  throw new Error('Should not be here');
}
