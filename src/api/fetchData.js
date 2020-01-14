import firebase from 'firebase';

export const fetchData = async () => {
  const config = {
    apiKey: 'AIzaSyA-ejMbM00y1YdqFDt85rGPiHWyWG6zO4A ',
    databaseURL: 'https://task-management-af948.firebaseio.com/'
  };
  firebase.initializeApp(config);

  const rootObject = firebase.database().ref();

  const values = await rootObject.once('value');

  return values.val();
};
