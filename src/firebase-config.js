const firebaseConfig = {
    apiKey: "AIzaSyCGoQmoSCcroDnxric_qIPAYyzsVqJiJbs",
    authDomain: "quickscore-d861e.firebaseapp.com",
    databaseURL: "https://quickscore-d861e-default-rtdb.firebaseio.com",
    projectId: "quickscore-d861e",
    storageBucket: "quickscore-d861e.appspot.com",
    messagingSenderId: "684570098032",
    appId: "1:684570098032:web:b7363dd79ede174168f7b5"
  };

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}