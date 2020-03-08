# Signzy Evaluation Test - Keep Replica

---

### TechStack

- Frontend - **React.js** with _Semantic UI_
- Backend - **Node.js** with _Express_
- Database - **Firebase** with _Cloud Firestore_

### Folder Structure

`root/`

- `index.js` - Main server code entrypoint for Node.js
- `client/` - Contains frontend React.js code - `public/` - Contains `index.html` where the app will be rendered - `src/` - Contains the app source code (components, styles, etc.)
- `firebaseRoutes/` - Contains routing that interacts with firebase, used for modularity

### Usage

This app has been deployed on [Netlify](http://netlify.com) (_frontend_) and [Heroku](http://heroku.com) (_backend_) and can be used [here](https://keepreplica.netlify.com/)

If you want to run it **locally**, follow these steps:

1. Extract the zip file in the desired location. The `KeepReplica/` folder created will be the `root/` folder
2. Download the npm modules required by the server. Run `npm install` inside `root/` folder
3. Download the npm modules required by the client. Run `npm install` inside the `client/` folder
4. Run `node index.js` from `root/` to start the server
5. Run `npm start` from `client/` folder
6. A new tab should pop up in your browser with the app running

#### Important Note:

Firebase has been used to store the required data and for authentication. Hence, I have not included my personal _API keys here and need to be created by the user following the steps below_:

1. Login to [Firebase Console](https://keepreplica.netlify.com/)
2. Click **Create a project** or **Add project** depending on whether you have other projects or not
3. Go to Project Settings by **clicking the setting gear icon** next to _Project Overview_
4. Click **Add app** under your apps
5. Fill in the details and obtain the API keys and save them in a `.env` file (name should be **.env** only and nothing else) in the `root/` folder. The `.env` file should look something like this :-
   - ```
     		apiKey=<api key>
     		authDomain=<auth domain>
     		databaseURL=<database url>
     		projectId=<project id>
     		storageBucket=<storage bucket>
     		messagingSenderId=<messaging sender id>
     		appId=<app id>
     ```
6. Uncomment the commented lines **5** and **6** in `index.js` in the `root/` folder
7. Enable **Authentication** by clicking on it and enabling **Email/Password** in the _Sign-in method_ menu
8. This should automatically be done when you run your app but incase the collections `notes` and `todos` in **Database** are not created, create them manually in the firebase console
