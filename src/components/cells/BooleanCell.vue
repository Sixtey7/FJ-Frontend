<template>
    <td>{{ valueToShow }}</td>
</template>

<script>
export default {
    name: 'BooleanCell',
    props: {
        value: Boolean,
        displayTrue: String,
        displayFalse: String
    },
    computed: {
        valueToShow: function() {
            if (this.value) {
                return this.displayTrue;
            }

            return this.displayFalse;
        }
    }
}
</script>