import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Pressable, View, Text } from "react-native";


export default function Roller() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [buttonText, setButtonText] = useState(3);
  //let result = 3;
  const roller = () => {
    setButtonText(Math.floor(Math.random() * 6) + 1);
    //result = Math.floor(Math.random() * 6);
    //return Math.floor(Math.random() * 6);
    Animated.timing(rotation, {
      toValue: 1, // 1 full turn
      duration: 750, // 1 second
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0); // reset for next click
    });
  };

  // Map rotation value to degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacityInterpolate = rotation.interpolate({
    inputRange: [0, 0.00001, 1],
    outputRange: [1, 0, 1]
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={rollerStyle.container}>
      <Animated.View style={animatedStyle}>
        <Pressable style={rollerStyle.button} onPress={roller}>
          <Animated.Text style={[rollerStyle.text, { opacity: opacityInterpolate }]}>{buttonText}</Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}
// <Text style={rollerStyle.text}>{buttonText}</Text>

const rollerStyle = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  button: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    //padding: 14,
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  text: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    userSelect: 'none',
  },
});
//       HHHH      
//        OO       
//       OV O      
//      O V  O     
//     D  V   D    
//    O   V    O   
// H O          O H
// HO     TT VVVVOH
// HOVVVV TT     OH
// H O          O H
//    O    V   O   
//     D   V  D    
//      O  V O     
//       O VO      
//        OO       
//       HHHH      
