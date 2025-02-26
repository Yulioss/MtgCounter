import { Button, Text, View ,StyleSheet, Pressable, TextStyle, TouchableOpacity, Image} from "react-native";
import React, { Dispatch } from "react";
import { Player } from "@/types/TypesIndex";
import { PlayerActions } from "@/reducer/PlayerReducer";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { textBase } from "@/styles/globalStyles";

interface PlayerViewProps {
  activePlayer: Player,
  dispatch: Dispatch<PlayerActions>,
  flipped?:boolean
}

export default function PlayerView({activePlayer, dispatch, flipped}: PlayerViewProps) {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      };

    return(
        <View style={activePlayer?.running ? styles.view1: styles.view2}>
          <Pressable onPress={() => dispatch({type:"TOGGLE_RUNNING", payload: {player:activePlayer}})} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={flipped ? styles.textMainFlipped: styles.textMain}>{formatTime(activePlayer?.time)}</Text>
          </Pressable>
          <TouchableOpacity onPress={() => dispatch({type:"INCREMENT_MANUALLY", payload: {player:activePlayer}})} style={styles.buttonIncrement}>
                          <Image source={require("../assets/images/mas.png")} style={styles.imageIncrement} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch({type:"DECREMENT_MANUALLY", payload: {player:activePlayer}})} style={styles.buttonDecrement}>
                          <Image source={require("../assets/images/menos.png")} style={styles.imageIncrement} />
          </TouchableOpacity>
          <View style={styles.viewTextPLayer} pointerEvents="none">
            <Text style={flipped ? styles.textPlayerFlipped: styles.textPlayer}>Player {activePlayer.id} </Text>
          </View>
        </View>
     
    );
}
const baseView:ViewStyle  = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
  borderColor:"white",
  borderWidth:2
};

const  buttonIDBase:ViewStyle  = {
  borderRadius: 10,
  overflow: "hidden", 
  position: "absolute",
  
};

const styles = StyleSheet.create({
  view1:{
    ...baseView,
    backgroundColor: '#791904', 
  },
  view2:{
    ...baseView,
    backgroundColor: 'gray', 
  },
  button: {
    padding: 10,
    height:"100%",
    width:"100%",
  },
  pressed: {
    opacity: 0.5,
  },
  textMain: {
    ...textBase,
    fontSize: 50
  },
  textMainFlipped: {
    ...textBase,
    fontSize: 50,
    transform: [{ scaleX: -1}]
  },
  imageIncrement:{
    width: 50, 
    height: 50, 
  },
  buttonDecrement:{
    ...buttonIDBase,
    left:40    
  },
  buttonIncrement:{
    ...buttonIDBase,
    right:40
  },
  viewTextPLayer:{
    position:"absolute",
    bottom:10,
  },
  textPlayer: {
    ...textBase
  },
  textPlayerFlipped: {
    ...textBase,
    transform: [{ scaleX: -1}]
  }
});