<template>
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
        <div class="bg-white shadow-xl rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <slot></slot>
        </div>
    </div>
</template>