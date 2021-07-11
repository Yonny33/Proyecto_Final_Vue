  
import Vue from 'vue'
import App from './App.vue'
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';
import '../node_modules/@fortawesome/fontawesome-free/css/solid.css';
import firebase  from 'firebase';
import 'firebase/firestore';



Vue.config.productionTip = false
  var firebaseConfig = {
    apiKey: "AIzaSyCidD8yZ29n82mRv5rf1tbXmjLyYJLCLjo",
    authDomain: "vue-gastos.firebaseapp.com",
    databaseURL: "https://vue-gastos.firebaseio.com",
    projectId: "vue-gastos",
    storageBucket: "vue-gastos.appspot.com",
    messagingSenderId: "265708791912",
    appId: "1:265708791912:web:7a434f510cbb27520833dd",
    measurementId: "G-YP8M2DSP1G"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  render: h => h(App),
}).$mount('#app')
