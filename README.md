[![Build Status](https://travis-ci.org/STOP2/stop2.0-traveller-client.svg?branch=master)](https://travis-ci.org/STOP2/stop2.0-traveller-client)
[![codecov](https://codecov.io/gh/STOP2/stop2.0-traveller-client/branch/master/graph/badge.svg)](https://codecov.io/gh/STOP2/stop2.0-traveller-client)

# STOP2.0 - A digital stop button for your mobile phone

<a href="https://play.google.com/store/apps/details?id=com.stop2travellerclient&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img width="200" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"/></a>

#### Setup of development environment (UNDER PROGRESS) 

Download Node.js version 4 or newer.

Download Watchman

Install React Native:
```bash
npm install -g react-native-cli
```

Clone the latest version of the project. Inside the Stop2.0-traveller-client folder
```bash
npm install
```

Change buildToolsVersion from 23.0.1 to 25.0.0 in these files:
```bash
./node_modules/react-native-localization/android/build.gradle
./node_modules/react-native-beacons-android/android/build.gradle
./node_modules/react-native-fcm/android/build.gradle
```

#### For Android development:

Download and install Android Studio: https://developer.android.com/studio/index.html

Open Android Studio -> tools -> SDK Manager -> Launch SDK Manager (or in command line: cd tools && ./android on android SDK folder) and install Android 6.0 and Android SDK Build-tools 23.0.3.

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

First start react-native:
```bash
react-native start
```
In a new terminal window:
```bash
react-native run-android
```

In production mode (hides errors & warnings):
```bash
react-native run-android --variant=release
```

### Recommended IDE
The recommended IDE is Atom (https://atom.io) with Nuclide (https://nuclide.io).

To install Nuclide for Atom:
```bash
apm install nuclide
```
Install Eslint (https://eslint.org/) support for Atom:
```bash
apm install linter-eslint
```

### Tests
Run tests with
```bash
npm test
```
