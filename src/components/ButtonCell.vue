<template>
    <button type="button" class = "btn btn-success">{{ text }}</button>
</template>

<script>

export default {
    name: "ButtonCell",
    props: {
        id: String,
        text: String
    }
};
</script>