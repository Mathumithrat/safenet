import React, { useRef } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import notifee from "@notifee/react-native";

const App = () => {
  const doubleTapRef = useRef(null);

  // Function to handle double-tap and send notification
  const handleDoubleTap = async () => {
    // Show a local notification to the guardian
    await notifee.requestPermission(); // Request notification permission
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.displayNotification({
      title: "Alert to Guardian 1",
      body: "This is a double-tap alert notification.",
      android: {
        channelId: "default",
      },
    });

    Alert.alert("Notification Sent", "Guardian 1 has been notified.");
  };

  // Define the double-tap gesture
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      handleDoubleTap();
    });

  return (
    <GestureDetector gesture={doubleTapGesture}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Double-tap anywhere on the screen to notify Guardian 1.
        </Text>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default App;
