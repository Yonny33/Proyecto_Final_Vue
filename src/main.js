import Vue from 'vue'
import App from './App.vue'
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';
import '../node_modules/@fortawesome/fontawesome-free/css/solid.css';
import firebase  from 'firebase';
import 'firebase/firestore';



Vue.config.productionTip = false
  var firebaseConfig = {
    apiKey: "AIzaSyCZrXdNWiLMc6p-TZhhZT5cWHwRM016C60",
    authDomain: "vue-1221.firebaseapp.com",
    projectId: "vue-1221",
    storageBucket: "vue-1221.appspot.com",
    messagingSenderId: "55163287943",
    appId: "1:55163287943:web:6f701ed588363f721cbb22",
    measurementId: "G-CDFV404ZSV"
  };
  firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
new Vue({
  render: h => h(App),
}).$mount('#app')
