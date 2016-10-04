[![Build Status](https://travis-ci.org/STOP2/stop2.0-traveller-client.svg?branch=master)](https://travis-ci.org/STOP2/stop2.0-traveller-client)
[![Coverage Status](https://coveralls.io/repos/github/STOP2/stop2.0-traveller-client/badge.svg?branch=master)](https://coveralls.io/github/STOP2/stop2.0-traveller-client?branch=master)

# stop2.0
Digital stop button for your mobile phone

https://ohtuprojekti.jamo.fi/topic_descriptions/147

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

For Android:

Download and install Android Studio: https://developer.android.com/studio/index.html

Open Android Studio -> configure -> SDK Manager -> Launch SDK Manager (or in command line: cd tools && ./android on android SDK folder) and install Android 6.0 and Android SDK Build-tools 23.0.3.

Run in Android emulator:
Create new AVD (Android Virtual Device) with Android Studio or in command line: cd tools && ./android avd (on android SDK folder)
Start the emulator on Android Studio or in command line: cd tools && ./emulator -avd name_of_your_avd

Run in phone:
Unlock Developer Settings on Android: Settings -> About Phone -> Tap "Build number" 7 times and the Developer options will be unlocked and available
Enable Developer options and USB debugging: Settings -> Developer options -> Enable Android debugging
Connect the phone to PC with USB

Run the app (the app will run on the device if it's connected, otherwise it will run on the emulator):
```bash
react-native run-android
```
