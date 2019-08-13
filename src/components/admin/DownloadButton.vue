<template>
    <div>
        <v-btn id = "download-all-button" color = "primary" dark @click = "downloadCSV">Download!
            <v-icon dark right>cloud_download</v-icon>
        </v-btn>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'DownloadButton',
    props: {
        url: String,
        logger: Object
    },
    methods: {
        downloadCSV() {
            this.logger.debug("Downloading CSV from " + this.url);
            axios({
                url: this.url,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'transactions.csv');
                document.body.appendChild(link);
                link.click();
            });
        }
    }
}
</script>