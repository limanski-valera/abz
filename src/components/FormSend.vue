<template>
  <div class="wrapper">
    <h2 class="wrapper__title title">User successfully registered</h2>
    <div class="wrapper__image">
      <img :src="successImage" alt="" />
    </div>
  </div>
</template>

<script setup>
import successImage from '@/assets/img/success-image.svg'
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  &__title {
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
  &__image {
    max-width: 328px;
    margin: 0 auto;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
}
.title {
}
</style>
