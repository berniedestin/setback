import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Roller from '@/components/game/roller';
import { Circle, Svg } from 'react-native-svg'
import { getGridUnitSize, getGridStyles } from '../../utils/grid'; // <-- IMPORT HERE
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

const SetbackLayout: React.FC = () => {
  // Use state to track the unit size for rotation responsiveness
  const [unitSize, setUnitSize] = useState(getGridUnitSize());

  useEffect(() => {
    const updateUnitSize = () => setUnitSize(getGridUnitSize());
    const subscription = Dimensions.addEventListener('change', updateUnitSize);
    return () => subscription.remove();
  }, []);

  // Use the imported helper to calculate styles
  const diceStyles = getGridStyles(3, 4, 2, 2); // Row 3, Col 4, 2x2 span

  return (
    <View style={{ flex: 1 }}>
      {/* The unitSize state ensures this view updates on rotation */}
      <View style={diceStyles}>
        {/* Render your DiceRoller component here */}
        <Roller />
      </View>
      {/* ... other components ... */}
    </View>
  );
};
/*
export default function SetbackLayout() {
  return (
    <View style={layoutStyle.mainBody}>
      <Roller />
    </View>
  )
};
*/

const layoutStyle = StyleSheet.create({
  mainBody: {
    backgroundColor: 'black',
  }
});

export default SetbackLayout;
