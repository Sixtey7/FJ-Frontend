<template>
    <button type="button" class = "btn btn-success" @click="onClickButton">{{ text }}</button>
</template>

<script>

export default {
    name: "ButtonObject",
    props: {
        text: String
    },
    methods: {
        onClickButton() {
            this.$emit('clicked');
        }
    }
};
</script>