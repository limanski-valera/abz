<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo"><img :src="logo" alt="" width="104" height="26" /></div>
      <div class="header__active">
        <simple-button @click="$emit('goToUsers')">Users</simple-button>
        <simple-button @click="$emit('goToSignUp')">Sign up</simple-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/img/logo.svg'
import SimpleButton from './UI/SimpleButton.vue'

defineEmits(['goToUsers', 'goToSignUp'])
</script>

<style lang="scss" scoped>
.header {
  padding: 13px 0;
  background-color: var(--color-background-secondary);
  &__container {
    display: flex;
    gap: 14px;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    display: inline-flex;
    max-width: 104px;
    transition: transform 0.3s;
    height: 100%;
    img {
      max-width: 100%;
    }
    @media (any-hover: hover) {
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  &__active {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
