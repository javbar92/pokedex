
export type Pokemon = {
  id: number
  name: string
  image: string
  types: string[]
  weight: number
  stats: Stat[]
}

export type Stat = {
  name: string
  value: number
}