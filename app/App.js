import { Button, StyleSheet, View, BackHandler, Alert } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import axios from 'axios';

const GEOFENCING_TASK = 'background-location-task';
const regions = [{
    'latitude': 38.6518,
    'longitude': 104.07642,
    'radius': 100,
    'notifyOnEnter': true,
    'notifyOnExit': true
  }];

async function report() {
  const serverAddress = "40.118.175.173:3000";
  try {
    alert(Constants.deviceId);
    const res = await axios.get(`http://${serverAddress}/report/${Constants.deviceId}`)
    console.log(res.data);
  } catch (error) {
    alert(error);
  }
}

async function getLocationAsync() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  console.log(status);
  if (status !== 'granted') {
    return;
  } else {
    alert('Permissions granted');
    return;
  }
  let { location } = await Location.getCurrentPositionAsync({}); //This code doesn't work on my device.
  console.log('location ' + JSON.stringify(location));
}

async function checkStatus() {
  let tasks = await TaskManager.getRegisteredTasksAsync(GEOFENCING_TASK);
  console.log('registered tasks: ' + JSON.stringify(tasks));
  let enable = await Location.hasServicesEnabledAsync();
  console.log('services enable: ' + JSON.stringify(enable));
  let last_location = await Location.getProviderStatusAsync();
  console.log('last_location: ' + JSON.stringify(last_location));
  let started = await Location.hasStartedGeofencingAsync(GEOFENCING_TASK);
  console.log(started);
}

function registerBackgroundTask() {
  // Please follow this document to implement the background task
  // https://docs.expo.io/versions/latest/sdk/location/#geofencing-methods
  console.log("TODO: register background task for geoFencing, when device is in GPS range, call service API");
  getLocationAsync();
  try {
    Location.startGeofencingAsync(GEOFENCING_TASK, regions);
  } catch(error) {
    console.log(error);
  }
  checkStatus();
}

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    report();
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});





export default function App() {
  BackHandler.addEventListener('hardwareBackPress', function() {
    Alert.alert(
      'Notice',
      "Exit App?",
      [
        {text: 'OK', onPress: () => BackHandler.exitApp(), style: 'cancel'},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ]);
    });
  return (
    <View style={styles.container}>
      <Button
        title="Register now!!!!!!" onPress={() => registerBackgroundTask()} />
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