import {Player} from "../types/TypesIndex"
const INITIAL_TIME = 1380; // 23 minutos


export type PlayerActions = 
{ type:'TOGGLE_RUNNING', payload: {player: Player}} |
{type:'DECREMENT', payload: {player: Player}} |
{type:'DECREMENT_MANUALLY', payload: {player: Player}} |
{type:'INCREMENT_MANUALLY', payload: {player: Player}} |
{type:'RESET'} 


export type PlayerState = {
  player: Player[]
}

export const initialState: PlayerState = {
  player:[
    { id: 1, time: INITIAL_TIME, running: false },
    { id: 2, time: INITIAL_TIME, running: false },
    { id: 3, time: INITIAL_TIME, running: false },
    { id: 4, time: INITIAL_TIME, running: false },
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
          player: state.player.map((p) => ({ ...p, time: INITIAL_TIME, running: false })),
        };
      default:
        return state;
    }
  };