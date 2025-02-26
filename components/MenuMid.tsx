import { PlayerActions } from "@/reducer/PlayerReducer"
import { Player } from "@/types/TypesIndex"
import { Dispatch, useState } from "react"
import { Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { textBase } from "@/styles/globalStyles";

interface VistaJugadorProps {
  dispatch: Dispatch<PlayerActions>
}
export default function MenuMid({dispatch}: VistaJugadorProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [BWCount, setBWCount] = useState(0);
    return(
        
        <View style={styles.container}>
            <Modal
                animationType="fade" // Opciones: "slide", "fade", "none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                  <Text style={styles.textModal}>¿Estas seguro que deseas reiniciar mi perro?</Text>
                  <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.buttonModal}  onPress={() => setModalVisible(false)} >
                  <Text style={styles.textButtonModal}>Denegar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={styles.buttonModal} onPress={() => {dispatch({type:"RESET"}); setModalVisible(false), setBWCount(0)}} >
                  <Text style={styles.textButtonModal}>Confirmar</Text>
                  </TouchableOpacity>
                  </View>
              </View>
            </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonRestart}>
                <Image source={require("../assets/images/reiniciar.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBWCount(BWCount < 99 ? BWCount + 1: BWCount)} style={styles.buttonBoardWipes} onLongPress={()=>setBWCount(BWCount > 0 ? BWCount - 1: BWCount)}>
              <ImageBackground style={styles.backgroundBW}
                source={require("../assets/images/removalMasivo.jpg")} // Ruta de la imagen local
                resizeMode="cover" // Ajusta la imagen (cover, contain, stretch, repeat, center)
              >
                <Text style={styles.textBoardWipes}>BW</Text>
                <Text style={styles.textCountBoardWipes}> {BWCount} </Text>
              </ImageBackground>
              
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create(
{
  container: {
    flexDirection: "row",
    alignItems: "center",  
    justifyContent: "center",    
    position: "relative", 
    width: "100%" 
  },
  buttonRestart: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBoardWipes: {
    borderRadius: 50,
    overflow: "hidden",
    position: "absolute",
    right: 200,
    alignItems:"center",  
    width:60,
    height:60,
    justifyContent:"center"
  },
  image:{
      width: 70, 
      height: 70, 
      resizeMode: "contain",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    gap: 20
  },
  modalButtons:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap: 30
  },
  textModal:{
    fontSize:18,
    fontFamily:"sans-serif-medium"
  },
  buttonModal:{
    backgroundColor:"gray",
    borderRadius:10,
    padding: 10,
    alignItems: "center"
  },
  textButtonModal:{
    fontSize:15,
    ...textBase
  },
  textBoardWipes:{
    ...textBase,
    fontSize:10,
    top:5
  },
  textCountBoardWipes:{
    ...textBase,
    fontSize:40,
  },
  backgroundBW:{
    width:"100%"
  }
})