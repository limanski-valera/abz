<template>
  <article class="user">
    <div class="user__image">
      <img :src="userPhoto" alt="" />
    </div>
    <h3 class="user__title">{{ userData.name }}</h3>
    <div class="user__info">
      <div class="user__position">{{ userData.position }}</div>
      <a :href="`mailto:${userData.email}`" class="user__link">{{ userData.email }}</a>
      <a :href="`tel:${userData.phone}`" class="user__link">{{ userNumber }}</a>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import defaultUserPhoto from '@/assets/img/user.svg'
import { formattedPhoneNumber } from '@/helpers/helpers'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const userPhoto = computed(() => (props.userData.photo ? props.userData.photo : defaultUserPhoto))

const userNumber = formattedPhoneNumber(props.userData.phone)
</script>

<style lang="scss" scoped>
.user {
  padding: 20px;
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  &__image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    align-self: center;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__position {
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &__link {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media (any-hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }
    &:active {
      text-decoration: underline;
    }
  }
}
</style>
