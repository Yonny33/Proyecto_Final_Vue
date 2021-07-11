<template>
    <div class="d-flex justify-content-between bd-highlight bg-primary fixed-top">
        <div class="p-2 bd-highlight h1-titulo">
            <p class="font-weight-light mb-0 h4">{{tutulo}}</p>
        </div>
        <div class="p-2 bd-highlight dropdown mr-3">
            <a class="ndropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user fa fa-2x"></i>
                <i class="fas fa-caret-down ml-2"></i>
            </a>
            <div class="dropdown-menu bg-primary border border-primary" aria-labelledby="navbarDropdown">
                <span class="dropdown-item disabled text-white">{{iduser}}</span>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-white clos" @click="closse">cerrar Sesión</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['iduser', 'salir'],
    data: function(){
        return{
            tutulo:'Listado De Gastos'
        }
    },
    methods:{
        closse: function(){
            this.$emit('salir');
        }
    }
}
</script>
<style>
.h1-titulo{
    color: #fff;
}
.clos:hover{
    background: rgb(3, 76, 212);
    color: #fff;
    cursor: pointer;
}
</style>