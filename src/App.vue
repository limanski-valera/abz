<template>
  <the-header
    @go-to-users="gotoBlock(usersSection)"
    @go-to-sign-up="gotoBlock(singUpSection)"
  ></the-header>
  <main class="page">
    <MainOffer class="page__offer" @go-to-sign-up="gotoBlock(singUpSection)"></MainOffer>
    <section class="page__users-section users-section" ref="usersSection">
      <div class="users-section__container">
        <h2 class="users-section__title title">Working with GET request</h2>
        <div v-if="isUsersLoading">Loading...</div>
        <users-list v-else :users-list="currentUsersList" class="users-section__items"></users-list>
        <simple-button
          v-if="!isLastPageDownload"
          class="users-section__button"
          @click="usersStore.loadUsersData()"
          >Show more</simple-button
        >
      </div>
    </section>
    <section class="page__registry registry" ref="singUpSection">
      <div class="registry__container">
        <form-send v-if="isFormSuccess"></form-send>
        <template v-else>
          <h2 class="registry__title title">Working with POST request</h2>
          <registry-form @success="isFormSuccess = true"></registry-form>
        </template>
      </div>
    </section>
  </main>
  <error-window
    class="error-window"
    v-if="generalStore.errorMessage"
    :error="generalStore.errorMessage"
  ></error-window>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import MainOffer from '@/components/MainOffer.vue'
import UsersList from '@/components/UsersList/UsersList.vue'
import SimpleButton from './components/UI/SimpleButton.vue'
import RegistryForm from './components/RegistryForm.vue'
import ErrorWindow from '@/components/ErrorWindow.vue'
import FormSend from '@/components/FormSend.vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'
import { gotoBlock } from './helpers/gotoblock.js'
import { useGeneralStore } from './stores/general'

const usersSection = ref(null)
const singUpSection = ref(null)

const usersStore = useUsersStore()
const { getUsersList, isLastPageDownload, getSortedUsersListByUserRegistrationTimestamp } =
  storeToRefs(usersStore)

const currentUsersList = computed(() =>
  getSortedUsersListByUserRegistrationTimestamp?.value
    ? getSortedUsersListByUserRegistrationTimestamp.value
    : getUsersList.value
)

const isUsersLoading = computed(() => !getUsersList?.value?.length)

const isFormSuccess = ref(false)

// Show Errors
const generalStore = useGeneralStore()

onBeforeMount(() => {
  usersStore.loadUsersData()
})
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 100px;
  & > *:not(:last-child) {
    margin-bottom: var(--gap-section);
  }
  &__offer {
  }
  &__users-section {
  }
  &__registry {
  }
}
.users-section {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  &__title {
    text-align: center;
  }
  &__items {
  }
  &__item {
  }
  &__button {
    align-self: center;
  }
}
.registry {
  &__container {
  }
  &__title {
    margin-bottom: 50px;
    text-align: center;
  }
}
.error-window {
  position: fixed;
  top: 20px;
  width: 100%;
  z-index: 100;
  left: 0;
  right: 0;
}
</style>
