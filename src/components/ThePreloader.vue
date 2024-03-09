<template>
  <div class="preloader">
    <img :src="preloaderImg" alt="" class="preloader__image" />
  </div>
</template>

<script setup>
import preloaderImg from '@/assets/img/preloader.svg'
</script>

<style lang="scss" scoped>
.preloader {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &__image {
    width: 42px;
    height: 42px;
    animation: preloader 1s infinite linear;
    @keyframes preloader {
      0% {
        transform: translate(-50%, -50%) rotate(0);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
}
</style>
