[![Build Status](https://travis-ci.org/STOP2/stop2.0-traveller-client.svg?branch=master)](https://travis-ci.org/STOP2/stop2.0-traveller-client)
[![codecov](https://codecov.io/gh/STOP2/stop2.0-traveller-client/branch/master/graph/badge.svg)](https://codecov.io/gh/STOP2/stop2.0-traveller-client)

# STOP2.0 - A digital stop button for your mobile phone
Made with [React Native](https://facebook.github.io/react-native/) and [Redux](http://redux.js.org/).

<a href="https://play.google.com/store/apps/details?id=com.stop2travellerclient&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img width="200" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"/></a>

#### How to setup development environment (UNDER PROGRESS) 

You'll need [Node.js](https://nodejs.org/en/) version >= 4.

[Watchman](https://facebook.github.io/watchman/) is highly recommended (it will speed up the development by showing your code changes instantly on the app using [live/hot reloading](https://facebook.github.io/react-native/docs/debugging.html#automatic-reloading)) but not required.

First install React Native:
```bash
npm install -g react-native-cli
```

Clone the latest version of the project. Inside the project folder install dependencies with
```bash
npm install
```

Change buildToolsVersion from 23.0.1 to 25.0.0 in these files:
```bash
./node_modules/react-native-localization/android/build.gradle
./node_modules/react-native-beacons-android/android/build.gradle
./node_modules/react-native-fcm/android/build.gradle
```

#### To build and run the project on Android:

Download and install Android Studio: https://developer.android.com/studio/index.html

Open Android Studio -> Tools -> SDK Manager -> Launch SDK Manager (or in command line: cd tools && ./android on android SDK folder) and install Android 6.0 and Android SDK Build-tools 23.0.3.

Set up Android keystore: Follow steps "Generating a signing key" and "Setting up gradle variables" at https://facebook.github.io/react-native/docs/signed-apk-android.html

Run in Android emulator:
Create new AVD (Android Virtual Device) with Android Studio or in command line: cd tools && ./android avd (on android SDK folder)
Start the emulator on Android Studio or in command line: cd tools && ./emulator -avd name_of_your_avd

Run in phone:
Unlock Developer Settings on Android: Settings -> About Phone -> Tap "Build number" 7 times and the Developer options will be unlocked and available
Enable Developer options and USB debugging: Settings -> Developer options -> Enable Android debugging
Connect the phone to PC with USB

Run the app (the app will run on the device if it's connected, otherwise it will run on the emulator):

In debug mode (shows errors & warnings):

Ensure that the React Native packager is running (you may skip this step, it should automatically start on the next step):
```bash
react-native start
```
To start the build process, run:
```bash
react-native run-android
```

In production mode (hides errors & warnings):
```bash
react-native run-android --variant=release
```

### Testing
Components, actions and reducers are tested with [Jest](https://facebook.github.io/jest/) snapshot tests which are located in the __tests__ subfolders.

Tests can be run with
```bash
npm test
```
