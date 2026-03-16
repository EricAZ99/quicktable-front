<script setup>
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';

</script>

<template>
    <AuthenticatedLayoutAdmin :title="'Avis clients'">
        <Transition name="page" mode="out-in" appear>
            <div class="p-4">Avis clients</div>
        </Transition>
    </AuthenticatedLayoutAdmin>
</template>