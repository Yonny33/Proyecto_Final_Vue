<template>
    <tr>
        <th scope="col"><input type="text" id="" v-model="txtEname"></th>
        <th scope="col"><input type="text" id="" v-model="txtEmonto"></th>
        <th scope="col"><input type="text" id="" v-model="txtEtipo"></th>
        <th>
            <button class="btn btn-success" id="editar" @click="UpdateGastos($event)">OK</button>
        </th>
        <th>
            <button class="btn btn-dark ml-1" id="cancelar" @click="closess($event)">X</button>
        </th>
    </tr>
</template>
<script>
import 'firebase/firestore';
import { firestore } from 'firebase';

export default {
    name:"edit-component",
    props:['eName', 'eMonto', 'eTipo', 'id', 'close'],
    data: function(){
        return{
            txtEname: this.eName,
            txtEmonto: this.eMonto,
            txtEtipo: this.eTipo
        }
    },
    methods:{
        closess: function(e){
            this.$emit('close', {btnEs: e.target.id})
        },
        UpdateGastos: function(e){
            const updateGastos = {
                name: this.txtEname,
                monto:this.txtEmonto,
                tipo: this.txtEtipo
            }
            firestore().collection('gastos').doc(this.id).update(updateGastos);
                this.$emit('close', {btnEs: e.target.id})
        }
    }
}
</script>