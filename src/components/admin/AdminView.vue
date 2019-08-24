<template>
    <div>
        <div id = "all" class = "button-section">
            <h2>All</h2>
            <div id = "download-all-button-div" class = "download-button">
                <DownloadButton :url = "dlAllURL" :logger = "logger" :fileName = "dlAllFileName" />
            </div>
            <div id = "upload-all-button-div" class = "upload-button">
                <UploadButton @upload="uploadAll" />
            </div>
        </div>
        <div id = "download-accounts" class = "button-section">
            <h2>Accounts</h2>
            <div id = "download-acct-button-div" class = "download-button">
                <DownloadButton :url = "dlAcctURL" :logger = "logger" :fileName = "dlTxFileName"/>
            </div>
            <div id = "upload-acct-button-div" class = "upload-button">
                <UploadButton @upload="uploadAcct" />
            </div>
        </div>
        <div id = "download-transactions" class = "button-section">
            <h2>Transactions</h2>
            <div id = "download-tx-button-div" class = "download-button">
                <DownloadButton :url = "dlTxURL" :logger = "logger" :fileName = "dlTxFileName"/>
            </div>
            <div id = "upload-tx-button-div" class = "upload-button">
                <UploadButton @upload="uploadTx" />
            </div>
        </div>
        <v-snackbar
            v-model="snackVisible"
        >
            {{ snackbarText }}
            <v-btn
                color="gray"
                text
                @click="snackVisible = false"
            >
                Close
            </v-btn>
        </v-snackbar>
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
            dlAllURL: "http://localhost:8081/fjservice/csvFile",
            dlTxURL: "http://localhost:8081/transactions/csvFile",
            dlAcctURL: "http://localhost:8081/accounts/csvFile",
            dlAllFileName: "allInfo.csv",
            dlTxFileName: "transactions.csv",
            dlAcctFileName: "accounts.csv",
            snackVisible: false,
            snackbarText: ""
        }
    },
    props: {
        logger: Object,
        txModel: Object,
        acctModel: Object
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
                ).then(function(rsp) {
                    vm.logger.debug("Got the response: " + JSON.stringify(rsp.data));
                    
                    //Update the data in the models
                    vm.acctModel.clearAndUpdateCache(rsp.data.accounts);
                    vm.txModel.clearAndUpdateCache(rsp.data.transactions);

                    //Raise a snackbar here
                    vm.snackbarText = "File Uploaded";
                    vm.snackVisible = true;
                    vm.logger.debug('Successfully posted file!');
            });
        },
        //eslint-disable-next-line
        uploadTx(textFromFile) {
            //TODO
            //Raise a snackbar here
            this.snackbarText = "Need To Do Something Here (Tx)";
            this.snackVisible = true;
            this.logger.debug('Upload Tx Called!');
        },
        //eslint-disable-next-line
        uploadAcct(textFromFile) {
            //TODO
            //Raise a snackbar here
            this.snackbarText = "Need To Do Something Here (Acct)";
            this.snackVisible = true;
            this.logger.debug('Upload Acct Called!');
        }
    }
}
</script>
<style>
    .button-section {
        overflow: hidden;
        margin-bottom: 50px;
    }
    .download-button {
        float: left;
        margin-left: 15%;
    }
    .upload-button {
        float: right;
        margin-right: 15%;
    }
</style>