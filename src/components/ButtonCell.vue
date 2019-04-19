<template>
    <td>
        <ButtonObject :id="id" :text="'E'" @clicked="onEditClicked" style="margin-right: 5px;"/>
        <ButtonObject :id="id" :text="'D'" @clicked="onDeleteClicked" style="margin-left: 5px;"/>
    </td>
</template>

<script>
import ButtonObject from './ButtonObject.vue';

export default {
    name: "ButtonCell",
    components: {
        ButtonObject
    },
    props: {
        id: String
    },
    methods: {
        onEditClicked() {
            this.$emit('edit', this.$props.id);
        },
        onDeleteClicked() {
            this.$emit('delete', this.$props.delete);
        }
    }
};
</script>