export interface Star {
  id: string,
  name: string,
  spectralType: string,
  luminosity: number,
  distanceFromEarth: number,
  temperature: number,
  galaxy: {
    id: string,
    name: string
  }
}
