<script setup>
import AuthenticatedLayoutAdmin from '../Layouts/AuthenticatedLayoutAdmin.vue';

</script>

<template>
    <div>
        <AuthenticatedLayoutAdmin :title="'Menu'" :mean="'Gestion de menus'">
            <h1>Menus</h1>
        </AuthenticatedLayoutAdmin>
    </div>
</template>