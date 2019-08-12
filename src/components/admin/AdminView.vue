<template>
    <div>
        <div id = "all">
            <h2>All</h2>
            <div id = "download-all-button-div">
                <v-btn id = "download-all-button" color = "primary" dark @click="downloadAllCSV">Download!
                    <v-icon dark right>cloud_download</v-icon>
                </v-btn>
            </div>
            <div id = "upload-all-button-div">
                <UploadButton @upload="uploadAll" />
            </div>
        </div>
        <div id = "download-accounts">
            <h2>Accounts</h2>
        </div>
        <div id = "download-accounts">
            <h2>Transactions</h2>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import UploadButton from './UploadButton.vue';

export default {
    name: 'AdminView',
    components: {
        UploadButton
    },
    props: {
        logger: Object
    },
    methods: {
        downloadAllCSV() {
            this.logger.debug("Button clicked...");
            axios({
                url: 'http://localhost:8081/fjservice/csvFile',
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'transactions.csv');
                    document.body.appendChild(link);
                    link.click();
                }
            );
        },
        uploadAll(textFromFile) {
            var vm = this;
            axios.put('http://localhost:8081/fjservice/cleanAndImport',
                textFromFile,
                {
                    headers: {
                        'Content-type': 'text/plain'
                    }
                }
                ).then(function() {
                    vm.logger.debug('Successfully posted file!');
            });
        }
    }
}
</script>
<style>
    #all {
        overflow: hidden;
    }
    #download-all-button-div {
        float: left;
        margin-left: 15%;
    }
    #upload-all-button-div {
        float: right;
        margin-right: 15%;
    }
</style>