import { Pressable, Text } from "react-native";


function roll(): number {
  return Math.floor(Math.random() * 6);
}

export default function Roller() {
  let result = 3;
  return (
    <Pressable className="roller">
      <Text>{result}</Text>
    </Pressable>
  )
}
