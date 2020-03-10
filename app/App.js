import { Button, StyleSheet, View, BackHandler, Alert } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import axios from 'axios';

//const GEOFENCING_TASK = 'background-location-task';
const regions = [{
    identifier: "origin",
    latitude: 32.89047,
    longitude: 115.81450,
    radius: 600,
    notifyOnEnter: true,
    notifyOnExit: true
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

//Grant the Permissions
async function getLocationAsync() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  console.log(status);
  if (status !== 'granted') {
    console.log('Granting location permissions failed');
    return;
  } else {
    console.log('Granting location permissions success');
    return;
  }
  //testing code
  let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
  console.log('locationaa ' + JSON.stringify(location));
}

//testing code
async function checkStatus() {
  let tasks = await TaskManager.getRegisteredTasksAsync();
  console.log('registered tasks: ' + JSON.stringify(tasks));
  let enable = await Location.hasServicesEnabledAsync();
  console.log('services enable: ' + JSON.stringify(enable));
  let last_location = await Location.getLastKnownPositionAsync();
  console.log('last_location: ' + JSON.stringify(last_location));
  let started = await Location.hasStartedGeofencingAsync('GEOFENCING_TASK');
  console.log(started);
  let options = await TaskManager.isTaskRegisteredAsync('GEOFENCING_TASK');
  console.log(options);
  //let unregister = await TaskManager.unregisterTaskAsync('background-location-task');
  //console.log(unregister);
}

TaskManager.defineTask('GEO_LOCATION_UPDATE', ({ data: { locations }, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(locations);
});


TaskManager.defineTask('GEOFENCING_TASK', ({ data: { eventType, region }, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {
    report();
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});


function registerBackgroundTask() {
  getLocationAsync();
  try {
    Location.startLocationUpdatesAsync('GEO_LOCATION_UPDATE', {
        accuracy: 4,
        timeInterval: (1000 * 20),
        distanceInterval: 100,
      });
    //Location.startLocationUpdatesAsync('GEOFENCING_TASK', {'accuracy': Location.Accuracy.High, 'timeInterval': 1000});
    Location.startGeofencingAsync('GEOFENCING_TASK', regions);
  } catch(error) {
    console.log(error);
  }
  //checkStatus();  //testing code
}



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