<template>
  <div class="users-list">
    <transition-group name="users">
      <users-list-item
        v-for="user in usersList"
        :key="user.id"
        :userData="user"
        class="users-list__item"
      ></users-list-item>
    </transition-group>
  </div>
</template>

<script setup>
import UsersListItem from './UsersListItem.vue'

defineProps({
  usersList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.users-list {
  @media (min-width: 550px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 29px;
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  &__item {
    @media (max-width: 550px) {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
.users-leave-active {
  transition: all 0.5s ease;
}
.users-enter-active {
  transition: all 0.5s 0.5s;
}
.users-enter-from,
.users-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
