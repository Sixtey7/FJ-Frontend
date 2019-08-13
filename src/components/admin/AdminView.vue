<template>
    <div>
        <div id = "all">
            <h2>All</h2>
            <div id = "download-all-button-div">
                <DownloadButton :url = "dlAllURL" :logger = "logger" />
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
import DownloadButton from './DownloadButton';
import UploadButton from './UploadButton.vue';

export default {
    name: 'AdminView',
    components: {
        DownloadButton,
        UploadButton
    },
    data() {
        return {
            dlAllURL: "http://localhost:8081/fjservice/csvFile"
        }
    },
    props: {
        logger: Object
    },
    methods: {
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