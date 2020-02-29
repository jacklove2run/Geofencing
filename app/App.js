import { Button, StyleSheet, View } from 'react-native';

import Constants from 'expo-constants';
import React from 'react';
import axios from 'axios';

async function report() {
  const serverAddress = "40.118.175.173";
  const serverPort = 3000;
  try {
    const res = await axios.get(`http://${serverAddress}:${serverPort}/report/${Constants.deviceId}`)
    if (res.status === 201) {
      alert("Created!");
    } else {
      alert(`Error: status=${res.status}`);
    }
  } catch (error) {
    alert(error);
  }
}

function registerBackgroundTask() {
  // Please follow this document to implement the background task
  // https://docs.expo.io/versions/latest/sdk/location/#geofencing-methods
  alert("TODO: register background task for geoFencing, when device is in GPS range, call service API");
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Register" onPress={() => registerBackgroundTask()} />
      <View style={{ height: 10 }} />
      <Button
        title="[Test] Call service API directly" onPress={() => report()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
