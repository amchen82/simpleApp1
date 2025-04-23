# Todo App

A cross-platform todo application built with React Native and Expo, supporting iOS, Android, and web browsers.

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Persistent storage using AsyncStorage
- Cross-platform support (iOS, Android, Web)

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS development: Xcode (Mac only)
- For Android development: Android Studio

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Choose your platform:
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Press `w` to run in web browser
   - Scan the QR code with Expo Go app on your physical device

## Development

The app uses:
- React Native with Expo
- React Native Paper for UI components
- AsyncStorage for data persistence
- TypeScript for type safety

## License

MIT