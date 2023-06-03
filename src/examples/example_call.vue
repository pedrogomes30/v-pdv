<template>
  
</template>

<script>
export default {

}
</script>
this.$global.showNavbar = !this.$global.showNavbar;
this.$eventBus.emit('navbar-updated', this.$global.showNavbar);
console.log(this.$global.showNavBar);

this.$global.alert = this.alert;
this.$eventBus.emit('alert-show', this.$global.alert);
console.log(this.$global.alert);

this.$global.load = this.load;
this.$eventBus.emit('load', this.$global.load);
console.log(this.$global.load);
setTimeout(() => {
  this.$global.load = false;
  this.$eventBus.emit('load', this.$global.load);
}, 3000);
<style>

</style>