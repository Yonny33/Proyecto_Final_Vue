<template>
    <div class="card border border-primary">
        <div class="card-header text-left">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <button :class="'btn btn-'+btnColor" @click="agregar_cancelar($event)" :name='btnName'><i :class="btnIcon+' mr-2'"></i>{{btnName}}</button>
                </div>
                <div class="col-sm-12 col-md-12 mt-2" v-if="btnresta">
                    <gastos-component @btnresta="agregar_cancelar"></gastos-component>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="col-sm-12 col-md-10 col-lg-3 text-left">
                <a class="nav-link ndropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ordenar Por: <i class="fas fa-caret-down ml-2 bg-ico"></i>
                </a>
                <div class="dropdown-menu border border-primary" aria-labelledby="navbarDropdown">
                    <button class="dropdown-item btn btn-primary text-secondary" id="todo" v-on:click="manejoClick($event)">Ver Todos</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item btn btn-primary" id="Hogar" v-on:click="manejoClick($event)">Hogar</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item btn btn-primary" id="Trabajo" v-on:click="manejoClick($event)">Trabajo</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item btn btn-primary" id="Carros" v-on:click="manejoClick($event)">Carros</button>
                </div>
            </div>
            <div class="table-responsive-md col-sm-12 col-md-12 col-lg-12">
                <table class="table">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th scope="col">Nombre del gasto</th>
                            <th scope="col">Monto del gasto</th>
                            <th scope="col">Tipo de gasto</th>
                            <th scope="col" colspan="2">Acción</th>
                        </tr>
                    </thead>
                    <tbody v-for="(shows, index) in listarDatos()" :key="index">
                        <tr>
                            <td class="item">{{shows.name}}</td>
                            <td>{{shows.monto}}</td>
                            <td>{{shows.tipo}}</td>
                            <td v-if="modalVue!=shows.id">
                                <button class="btn btn-info" @click="editA(shows)"><i class="fas fa-pencil-alt"></i></button>
                            </td>
                            <td v-if="modalVue!=shows.id">
                                <button class="btn btn-danger ml-2" id="delete" @click="eliminarA(shows)"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                        <editar-component v-if="modalVue==shows.id" :eName="shows.name" :eMonto="shows.monto" :eTipo="shows.tipo" :id="shows.id" @close="editA"></editar-component>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <p class="text-uppercase text-left">Total:<i class="fas fa-dollar-sign ml-2 ic fa-1x"></i> <strong>{{sumarGastos()}}</strong></p>
        </div>
    </div>
</template>

<script>
import GastosComponent from "./Gastos";
import EditarComponent from './Edit';

export default {
    name: 'tablaGastos-component',
    props: ["gastosTabla", "deleteTable"],
    data: function(){
        return{
            ordernarPor: '',
            btnresta: false,
            btnName: 'nuevo',
            btnColor: 'success',
            btnIcon: 'fas fa-plus',
            modalVue: ''
        }
    },
    methods:{
        sumarGastos: function(){
            var sumar = 0;
            if(this.ordernarPor!=""){
                for(const key in this.gastosTabla){
                    if(this.gastosTabla[key].tipo == this.ordernarPor){
                        sumar += parseFloat(this.gastosTabla[key].monto)
                    }
                }
            }else{
                for(const key in this.gastosTabla){
                    sumar += parseFloat(this.gastosTabla[key].monto)
                }
            }            
            return sumar.toFixed(3)
        },
        manejoClick: function(e){
            if(e.target.id === "todo"){
                this.ordernarPor = ""
            }else{
                 this.ordernarPor = e.target.id;
            }
            this.listarDatos();       
        },
        listarDatos: function(){
            if(this.ordernarPor!=""){
                this.sumarGastos();
                return this.gastosTabla.filter((pack)=>{
                    return pack.tipo.match(this.ordernarPor);
                });
            }else{
                this.sumarGastos()
                return this.gastosTabla;
            }
        },
        editA: function(e){
            if(e.btnEs==="cancelar" || e.btnEs==="editar"){
                this.modalVue = '';
            }else{
                this.modalVue = e.id
            }
        },
        eliminarA: function(e){
            this.$emit('deleteTable', {id: e.id});
        },
        agregar_cancelar: function(e){
            if(e.target.name=="nuevo"){
                this.btnName = "cancelar";
                this.btnColor = "secondary";
                this.btnIcon = "fas fa-window-minimize";
                this.btnresta = true;
            }else{
                this.btnName = "nuevo";
                this.btnColor = "success";
                this.btnIcon = "fas fa-plus";
                this.btnresta = false;
            }
        }
    },
    components:{
        GastosComponent,
        EditarComponent
    }
}
</script>
<style>
.aling-btn{
    text-align: left;
}
.ic{
    color: #000;
}
.bg-ico{
    color: blue;
}
</style>