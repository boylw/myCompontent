<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear apper-class="custom-apper-class" appear-active-class="custom-appear-active-class">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 100ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.custom-apper-class ,.custom-appear-to-class{
  opacity: 0;
}
.custom-appear-active-class {
   transition: opacity 100ms;
}


</style>

