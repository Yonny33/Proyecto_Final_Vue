<template>
  <div class="col-sm-12">
    <div class="card userLogin" style="width: 25rem;">
      <h1 class="htitle">{{titulo}}</h1>
      <img src="../assets/login1.jpg" class="rounded mx-auto d-block" alt="username" />
      <div class="card-body">
        <form @submit.prevent="manejoClick">
          <div class="row">
            <div class="col-sm-12">
              <div v-if="errorr" class="alert alert-danger" role="alert">{{titleError}}</div>
            </div>
            <div class="col-sm-12">
                <label class="sr-only" for="Username">Username</label>
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text bg-success">
                        <i class="fas fa-user-tie fa-lg"></i>
                    </div>
                    </div>
                    <input
                    type="email"
                    ref="pdEmail"
                    v-bind:class="'form-control form-control-lg '+valid"
                    id="pdEmail" v-model='pdEmail'
                    placeholder="Correlo electonico"
                    v-on:keyup.enter="changeFocus($event)"
                    v-on:change='manejaChange($event)'
                    />
                </div>
            </div>
            <div class="col-sm-12">
              <label class="sr-only" for="Password">Username</label>
              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text bg-success">
                    <i class="fas fa-eye-slash fa-lg"></i>
                  </div>
                </div>
                <input
                  type="password"
                  ref="pdPass"
                  class="form-control form-control-lg"
                  id="pdPass"
                  v-model='pdPass'
                  placeholder="********"
                  v-on:keyup.enter='changeFocus($event)'
                />
              </div>
            </div>
            <div class="col-sm-12">
              <button type="submit" class="btn btn-success btn-block">{{btnTitle}}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase  from 'firebase';
export default {
  name: "login-component",
  props: ['ingresarCorrecto', 'ingresarValid'],
  data: function() {
    return {
      titulo: "Ingresar al Sistema",
      btnTitle: "INGRESAR",
      pdEmail: '',
      pdPass: '',
      valid: '',
      errorr: false,
      titleError: ''
    };
  },
  beforeMount: function(){
    if(!localStorage.getItem('clave')){
      this.$emit('ingresarValid', {vacio: false});
    }else{
      this.$emit('ingresarValid', {vacio: true});
    }
  },
  methods: {
    manejoClick: function() {
      if(this.validarCamposEmail(this.pdEmail) && this.ValidoCampoPassword(this.pdPass)){
        firebase.auth().signInWithEmailAndPassword(this.pdEmail, this.pdPass)
          .then(() => {
            this.errorr = false;
            localStorage.setItem('clave', 'door');
            this.$emit('ingresarCorrecto');
          })
          .catch(() => {
            this.errorr = true;
            this.titleError = "Usuario o Contraseña Incorrecta";
          });
      }else{
          this.titleError = "Usuario o Contraseña Incorrecta";
      }
    },
    changeFocus: function(e){
      if (e.target.id==='pdEmail'){
        this.$refs.pdPass.focus();
      }
      else if (e.target.id==='pdPass'){
        this.validateLogin();
      }
    },
    validateLogin: function(){
      if (this.validarCamposEmail(this.pdEmail) && this.ValidoCampoPassword(this.pdPass)){
          this.logon=true;
      }else{
          this.titleError = "Usuario o Contraseña Incorrecta";
      }
    },
    validarCamposEmail: function(email){
        var reEmail=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return reEmail.test(email);
    },
    ValidoCampoPassword:function(pass){
      var rePass=/.{3,14}/;
      return rePass.test(pass);
    },
    manejaChange: function(e){
        if (e.target.id==='pdEmail'){
            this.valid = this.validarCamposEmail(this.pdEmail) ? 'is-valid' : 'is-invalid';
        }else if (e.target.id==='pdPass'){
            this.validateLogin();
        }
    }
  }
};
</script>

<style>
.userLogin {
  margin: auto;
}
i {
  color: #ffffff;
}
.htitle {
  color: green;
}

</style>