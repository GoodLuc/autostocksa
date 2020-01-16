import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyD0vGsqcKnjdILla4lxf-ItTiDgwOWG6mY",
  authDomain: "autostock-a2faf.firebaseapp.com",
  databaseURL: "https://autostock-a2faf.firebaseio.com",
  projectId: "autostock-a2faf",
  storageBucket: "autostock-a2faf.appspot.com",
  messagingSenderId: "518648349561",
  appId: "1:518648349561:web:c9bf4ee63096d1691ae5a8"
})
  
const db = firebase.firestore()
const auth = firebase.auth()

const marcas = db.collection('scheme').doc('marcas')
const modelos = db.collection('marcas')
const productos = db.collection('productos')
const last_id = db.collection('scheme').doc('last_id')

export {
  db,
  auth,
  marcas,
  modelos,
  productos,
  last_id
}