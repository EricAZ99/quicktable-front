<script setup>
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';

</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Commandes'" :mean="'Gestion de vos commandes'">
        <Transition name="page" mode="out-in" appear>
            <div class="p-4">Commandes</div>
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>