import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { textBase } from "@/styles/globalStyles";
import { Player } from "@/types/TypesIndex";
import { Dispatch, useMemo } from "react";
import { PlayerActions } from "@/reducer/PlayerReducer";

type ImageKeys = keyof typeof images;
interface DamageOpponentProps {
  activePlayer: Player,
  dispatch: Dispatch<PlayerActions>,
  flipped?:boolean,
  idDamage:number,
  imageOp:ImageKeys  
}
const images = {
    img1: require("../assets/images/Kamiz.jpg"),
    img2: require("../assets/images/Magnus.jpg"),
    img3: require("../assets/images/Krrik.jpg"),
  };
export default function DamageOpponent({activePlayer, dispatch, flipped, idDamage, imageOp}: Readonly<DamageOpponentProps>) {
    const damagePlayer = useMemo(() => activePlayer.id === 1 || (activePlayer.id === 3 && activePlayer.id === idDamage) ? idDamage+1: activePlayer.id === 2 && idDamage !== 1   ? idDamage+1 : activePlayer.id === 2 && idDamage === 2 ?  idDamage-1: idDamage , []) 
    return(
        <TouchableOpacity  style={flipped ? styles.buttonDamageOpFlipped: styles.buttonDamageOp} onPress={() => dispatch({type:"INCREMENT_DAMAGE", payload: {player:activePlayer, idDamage:idDamage}})}
        onLongPress={() => dispatch({type:"DECREMENT_DAMAGE", payload: {player:activePlayer, idDamage:idDamage}})}>
                    <ImageBackground style={styles.imgDamageOp}
                        source={images[imageOp]}// Ruta de la imagen local
                        resizeMode="cover" // Ajusta la imagen (cover, contain, stretch, repeat, center)
                        >
                        <Text style={styles.textPlayerUp}>P{damagePlayer} </Text>
                        <Text style={styles.textPlayerDown}> {activePlayer.damage.find(x=> x.id === idDamage)?.damage} </Text>
                    </ImageBackground>
        </TouchableOpacity>
    );
    
}
const buttonDamageBase:ViewStyle =
{
    borderRadius: 50,
    overflow: "hidden",
    alignItems:"center",  
    justifyContent:"center",
}
const styles = StyleSheet.create({

buttonDamageOp: {
...buttonDamageBase
},
buttonDamageOpFlipped: {
    ...buttonDamageBase,
    transform: [{ scaleX: -1}]
},
textPlayerUp: {
    ...textBase,
    fontSize:15
},
textPlayerDown: {
    ...textBase,
    fontSize:22
},
imgDamageOp:{
    width: 50, 
    height:50
}
});
