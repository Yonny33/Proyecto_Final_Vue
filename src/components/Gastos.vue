<template>
    <div class="bg-white border border-success">
        <div v-if="errorr" class="alert alert-danger" role="alert">{{titleError}}</div>
        <div class="form-group row mt-2 mr-1">
            <label for="txtNombreGasto" class="col-sm-4 col-form-label text-right">Nombre del Gasto</label>
            <div class="col-sm-8">
                <input type="text" id="txtNombreGasto" v-model="txtNombreGasto" v-bind:class="'form-control '+ errorColor"/>
            </div>
        </div>
        <div class="form-group row mr-1">
            <label for="txtMontoGasto" class="col-sm-4 col-form-label text-right">Monto del Gasto</label>
            <div class="col-sm-8">
                <input type="text" id="txtMontoGasto" v-model="txtMontoGasto" v-bind:class="'form-control '+ errorColor" />
            </div>
        </div>
        <div class="form-group row mr-1">
            <label for="txtTipoGasto" class="col-sm-4 col-form-label text-right">Tipo de Gasto</label>
            <div class="col-sm-8">
                <input type="text" id="txtTipoGasto" v-model="txtTipoGasto" v-bind:class="'form-control '+ errorColor" />
            </div>
        </div>
        <div class="form-group text-center">
            <button class="btn btn-success btn-lg" v-on:click="irTabla($event)" name="cancelar"><i class="fas fa-save mr-2"></i>Agregar Gasto</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name:'gastos-component',
    props:['btnresta'],
    data: function(){
        return{
            txtNombreGasto: '',
            txtMontoGasto: '',
            txtTipoGasto: '',
            errorColor: '',
            titleError: 'Debe llenar todo los campos',
            errorr: false
        }
    },
    methods: {
      irTabla: function(e){
        if(this.txtNombreGasto != "" && this.txtMontoGasto != "" && this.txtTipoGasto != ""){
          this.errorr = false
          this.validarCampos(this.txtNombreGasto, this.txtMontoGasto, this.txtTipoGasto);
          this.$emit('btnresta', e)
          const saveGast = {name: this.txtNombreGasto,monto: this.txtMontoGasto,tipo: this.txtTipoGasto}
          firebase.firestore().collection("gastos").add(saveGast);
          }else{
          this.campoValid(this.txtNombreGasto);
          this.campoValid(this.txtMontoGasto);
          this.campoValid(this.txtTipoGasto);
          this.errorr= true
        }
      },
      validarCampos: function(nombre, monto, tipo){
        if(this.campoValid(nombre)){
          return nombre
        }
        if(this.campoValid(monto)){
          return monto
        }
        if(this.campoValid(tipo)){
          return tipo
        }
      },
      campoValid: function(e){
        if(e===""){
          this.errorColor = 'bg-danger text-white';
        }else{
          this.errorColor = 'bg-white';
        }
        return this.errorColor;
      }
    }
}
</script>