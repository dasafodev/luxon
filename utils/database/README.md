# Database connection with Firebase Admin

## About

In order to connect to Firebase in server-side it is necessary to use their Firebase Admin SDK.

[Read more](https://firebase.google.com/docs/admin/setup)

## Setup

1. Go to the project console in Firebase.
2. Click the gear icon next to Project Overview at the top of the sidebar and navigate to project settings.
3. Go to the Service accounts tab and click the Generate new private key button to generate the JSON file.
4. Once the file it's downloaded copy the corresponding keys to fill the file with environment variables (`.env`) at the root directory.
