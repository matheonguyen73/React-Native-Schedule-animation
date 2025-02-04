import { Text, View } from "react-native";
import Scheduler from "./components/scheduler";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Scheduler />
    </View>
  );
}
