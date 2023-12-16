export interface Planet {
  id: string,
  name: string,
  mass: number,
  diameter: number,
  distanceFromStar: number,
  surfaceTemperature: number,
  star: {
    id: string,
    name: string
  }
}
