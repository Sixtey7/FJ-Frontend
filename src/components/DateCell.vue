<template>
    <td>{{ dateToShow | formatDate }}</td>
</template>

<script>
import moment from 'moment';

export default {
    name: "DateCell",
    props: {
        dateToShow: String //String because this is how its received from the backend
    },
    filters: {
        formatDate: function(value) {
            if (!value) {
                return;
            }
            value = new Date(value);
            return moment(value).format('MMM DD, YYYY');
        }
    }
}
</script>