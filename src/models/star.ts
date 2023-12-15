export interface Star {
  id: string,
  name: string,
  spectral_type: string,
  luminosity: number,
  distanceFromEarth: number,
  temperature: number,
  galaxy: {
    id: string,
    name: string
  }
}
