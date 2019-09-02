<template>
    <div class="bottom">
      <ul>
        <router-link to="/" tag="li">
          <i :class="{'bottom-active':active == 'index', 'bottom-home':true}"></i>
          <p :class="{'active':active == 'index'}">首页</p>
        </router-link>

        <router-link to="/welfare" tag="li">
         <i :class="{'bottom-active':active == 'welfare', 'bottom-welfare':true}"></i>
        <p :class="{'active':active == 'welfare'}">福利</p>
        </router-link>

        <router-link to="/home" tag="li">
          <i :class="{'bottom-active':active == 'home', 'bottom-person':true}"></i>
          <p :class="{'active':active == 'home'}">我的</p>
        </router-link>
       
      </ul>
    </div>
</template>

<script>
export default {
  props: ['active'],
}
</script>
