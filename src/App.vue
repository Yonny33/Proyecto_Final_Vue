<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <inicio-component v-if='logon' v-show="logon" @salir="ingresoCorrecto" :us="states"></inicio-component>
      </div>
    </div>
    <div class="container">
      <div class="row">        
        <login-component v-if='!logon' @ingresarCorrecto="ingreso" @ingresarValid="ingresoCorrecto"></login-component>
      </div>
    </div>
  </div>
</template>

<script>
import firebase  from 'firebase';
import LoginComponent from './components/login';
import InicioComponent from './components/inicio';

export default {
  name: 'App',
  data: function(){
    return{
      logon: false,
      firebase: '',
      db:''
    }
  },
  beforeMount: function(){
    this.firebase=firebase;
  },
  methods: {
    ingreso: function(){
      this.logon = true;
    },
    ingresoCorrecto: function(e){//valida si esta iniciado la sesion o no.. 
      this.logon = e.vacio
    },
    states: (collback)=>{
      firebase.auth().onAuthStateChanged((user)=>{
        collback(user)
      })
    }
  },
  components: {
    LoginComponent,
    InicioComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
