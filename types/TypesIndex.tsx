export type Player = {
    id:number,
    time: number,
    running: boolean
    damage:PlayerOpponent[]
}
type PlayerOpponent ={
    id:number,
    damage:number
}