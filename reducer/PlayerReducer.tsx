import {Player} from "../types/TypesIndex"
const INITIAL_TIME = 1380; // 23 minutos


export type PlayerActions = 
{ type:'TOGGLE_RUNNING', payload: {player: Player}} |
{type:'DECREMENT', payload: {player: Player}} |
{type:'DECREMENT_MANUALLY', payload: {player: Player}} |
{type:'INCREMENT_MANUALLY', payload: {player: Player}} |
{type:'INCREMENT_DAMAGE', payload: {player: Player, idDamage:number}} |
{type:'DECREMENT_DAMAGE', payload: {player: Player, idDamage:number}} |
{type:'RESET'} 


export type PlayerState = {
  player: Player[]
}

const playerOpponent = [
{id: 1, damage: 0},
{id: 2, damage: 0},
{id: 3, damage: 0},
]

export const initialState: PlayerState = {
  player:[
    { id: 1, time: INITIAL_TIME, running: false, damage: playerOpponent},
    { id: 2, time: INITIAL_TIME, running: false, damage: playerOpponent},
    { id: 3, time: INITIAL_TIME, running: false, damage: playerOpponent},
    { id: 4, time: INITIAL_TIME, running: false, damage: playerOpponent},
  ],
};

export const timerReducer = (state: PlayerState = initialState, action:PlayerActions) => {
    switch (action.type) {
      case "TOGGLE_RUNNING":
        return {
          ...state,
          player: state.player.map((p) =>
            p.id === action.payload.player.id ? { ...p, running: !p.running } : { ...p, running: false }
          ),
        };
      case "DECREMENT":
        return {
          ...state,
          player: state.player.map((p) =>
            p.id === action.payload.player.id && p.time > 0 ? { ...p, time: p.time - 1 } : p
          ),
        };
      case "DECREMENT_MANUALLY":
      return {
        ...state,
        player: state.player.map((p) =>
          p.id === action.payload.player.id && p.time > 0 && p.time > 60 ? { ...p, time: p.time - 60 } : p
        ),
      };
      case "INCREMENT_MANUALLY":
      return {
        ...state,
        player: state.player.map((p) =>
          p.id === action.payload.player.id && p.time >= 0 ? { ...p, time: p.time + 60 } : p
        ),
      };
      case "RESET":
        return {
          ...state,
          player: state.player.map((p) => ({ ...p, time: INITIAL_TIME, running: false, 
            damage: p.damage.map((d) => ({...d, damage:0}))})),
      };
      case "INCREMENT_DAMAGE":
        return {
          ...state,
          player: state.player.map((p) =>
            p.id === action.payload.player.id 
              ? {
                  ...p,
                  damage: p.damage.map((d) =>
                    d.id === action.payload.idDamage 
                      ? { ...d, damage: d.damage + 1 }
                      : d
                  ),
                }
              : p
          ),
        };
        case "DECREMENT_DAMAGE":
        return {
          ...state,
          player: state.player.map((p) =>
            p.id === action.payload.player.id 
              ? {
                  ...p,
                  damage: p.damage.map((d) =>
                    d.id === action.payload.idDamage && d.damage > 0
                      ? { ...d, damage: d.damage - 1 }
                      : d
                  ),
                }
              : p
          ),
        };
      default:
        return state;
    }
  };