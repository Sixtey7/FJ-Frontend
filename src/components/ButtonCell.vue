<template>
    <button type="button" class = "btn btn-success" @click="onClickButton">{{ text }}</button>
</template>

<script>

export default {
    name: "ButtonCell",
    props: {
        id: String,
        text: String
    },
    methods: {
        onClickButton() {
            this.$emit('clicked', this.$props.id);
        }
    }
};
</script>