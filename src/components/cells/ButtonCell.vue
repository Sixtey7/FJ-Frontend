<template>
    <td>
        <v-icon
            small
            class="mr-2"
            @click="onEditClicked"
        >
            edit
        </v-icon>
        <v-icon
            small
            @click="onDeleteClicked"
        >
            delete
        </v-icon>
    </td>
</template>

<script>
export default {
    name: "ButtonCell",
    props: {
        id: String
    },
    methods: {
        onEditClicked() {
            this.$emit('edit', this.$props.id);
        },
        onDeleteClicked() {
            this.$emit('delete', this.$props.id);
        }
    }
};
</script>