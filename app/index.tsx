import React, { useEffect, useReducer, useRef} from "react";
import { View ,StyleSheet, StatusBar, ViewStyle} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerView from "../components/PlayerView"
import { timerReducer, initialState } from "../reducer/PlayerReducer";
import MenuMid from "@/components/MenuMid";
import { useKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Index() {
  useKeepAwake();
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const player1 = state.player.find((p) => p.id === 1) || state.player[0];
  const player2 = state.player.find((p) => p.id === 2) || state.player[1];
  const player3 = state.player.find((p) => p.id === 3) || state.player[2];
  const player4 = state.player.find((p) => p.id === 4) || state.player[3];
  
 
  
  useEffect(() => {
    const enableKeepAwake = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    };
    enableKeepAwake();
    const activePlayer = state.player.find((p) => p.running);
    if (activePlayer) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "DECREMENT", payload: {player: activePlayer}});
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.player]);
  

  return (
    <View
      style={styles.container}
    >
      <StatusBar hidden={true} /> 
      <SafeAreaView style={styles.area1}>
          <PlayerView activePlayer={player4}  dispatch={dispatch} flipped={true}></PlayerView>
          <PlayerView activePlayer={player3} dispatch={dispatch} flipped={true}></PlayerView>
      </SafeAreaView>
      <SafeAreaView style ={styles.areaMid}>
        <MenuMid dispatch={dispatch}></MenuMid>
      </SafeAreaView>
      <SafeAreaView style={styles.area2}>
      <PlayerView activePlayer={player1} dispatch={dispatch}></PlayerView>
      <PlayerView activePlayer={player2} dispatch={dispatch}></PlayerView>
      </SafeAreaView>
    </View>

  );
}
const areaContainer:ViewStyle =
{
    flex:1,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
}
const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:"black"
  },
  area1: {
    ...areaContainer,
    transform: [{ scaleY: -1}],
  },
  area2: {
    ...areaContainer
  },
  areaMid:{
    flex: 0.4,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",

  },
})
