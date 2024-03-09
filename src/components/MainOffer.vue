<template>
  <section class="offer">
    <picture>
      <source type="image/webp" srcset="@/assets/img/main-image.webp" />
      <source type="image/jpeg" srcset="@/assets/img/main-image.jpeg" />
      <img width="1170" height="650" src="@/assets/img/main-image.jpeg" alt="Wheat field" class="offer__bg" />
    </picture>
    <div class="offer__container">
      <h1 class="offer__title title">Test assignment for front-end developer</h1>
      <p class="offer__text">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
        with a vast understanding of User design thinking as they'll be building web interfaces with
        accessibility in mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <simple-button class="offer__button" @click="$emit('goToSignUp')">Sign up</simple-button>
    </div>
  </section>
</template>

<script setup>
import SimpleButton from './UI/SimpleButton.vue'

defineEmits(['goToSignUp'])
</script>

<style lang="scss" scoped>
.offer {
  max-width: 1170px;
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 60px);
  padding: 89px 16px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 40px 16px 71px;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__container {
    max-width: 380px;
    padding: 0;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: var(--color-text-white);
  }
  &__title {
    line-height: 1;
    &:not(:last-child) {
      margin-bottom: 21px;
    }
  }
  &__text {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
  &__button {
    align-self: center;
  }
}
.title {
}
</style>
