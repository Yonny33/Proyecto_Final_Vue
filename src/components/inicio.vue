<template>
  <div class="col-sm-12">
    <navegacion-component :iduser="idUsuario" @salir="logout"></navegacion-component>
    <tabla-component :gastosTabla="datosGastos" @deleteTable="eliminarDatos"></tabla-component>
  </div>
</template>

<script>
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import NavegacionComponent from './Navegacion';
import TablaComponent from "./tablaGastos";

export default {
  name: "inicio-component",
  props: ["salir", "us"],
  data: function() {
    return {
      datosGastos: [],
      btnEditar: false,
      idUsuario: ''
    };
  },
  created: function() {
    this.us((data) => {
      if(!data){
          this.logout();
      }else{
        this.idUsuario = data.email;
        this.cargarCallback();
      }
    });    
  },
  methods: {
    cargarCallback: function(){
      return firestore().collection("gastos").onSnapshot((snapshotQuery)=>{
        this.datosGastos = [];
        snapshotQuery.forEach(item=>{
          this.datosGastos.push({
            id: item.ref.id,
            name: item.data().name,
            monto: item.data().monto,
            tipo: item.data().tipo
          });
        });
      });
    },
    eliminarDatos: function(e){
        firestore().collection('gastos').doc(e.id).delete();
    },
    logout: function() {
      firebase.auth().signOut();
      localStorage.clear();
      this.$emit("salir", { vacio: false });
    }
  },
  components: {
    NavegacionComponent,
    TablaComponent
  }
};
</script>