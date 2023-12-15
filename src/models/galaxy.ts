export interface Galaxy {
  id: string,
  name: string,
  size: number,
  shape: string,
  composition: string,
  distanceFromEarth: number,
  universe: {
    id: string,
    name: string,
  }
}