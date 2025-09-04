export type TileType = 'grass' | 'dirt' | 'water'

export interface MapData {
  name: string
  width: number
  height: number
  tiles: TileType[][]
}