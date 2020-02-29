# GeoFencing app

## Task
You're asked to write a simple GeoFencing app. 
User flow is the following:
1) User launches app, click "Register" button
2) App registers one GPS zone (lat+long+radius, you can define whatever area)
3) User grants app permission
4) User exits app
5) When user enters the GPS zone, app calls "/report" API to let server know it's in this GPS zone
6) Also create & deploy a web app that shows how many reports per day

Please clone this GitHub repository, create database, implement service + app + webapp, deploy service + webapp, build app packages, test E2E.
 
After it's finished, please provide the following:
1) A demo video/gif of the working app (using either emulator or phone)
2) Your cloned GitHub repository link that has all implementation
3) The demo app package(.apk/.ipa) link (from Expo)
4) WebApp URL that shows how many devices reports each day
5) Summary of what you've done, thoughts/ideas on the tools

## Environment
* Apache + PHP + PhpMyAdmin
* MySQL
* NodeJS + Express
* Expo/ReactNative

## Implementation

### Database
Set up MySQL database to store the information (timestamp + deviceId) when device calls report

### Service
Implement the NodeJS service that connects to MySQL and accepts calls from app

### App
Implement the background task and report when device is in the GPS zone

### WebApp
Create & deploy a web app that shows how many reports per day

### Unit Test + E2E Test
Define the test plan and write test code
