<script>
import TxFilter from '../../utils/TxFilter';

export default {
    name: 'TxFilterModal',
    props: ['show', 'txFilter'],
    data: function() {
        return {
            currentTxEdit: {},
            startMenu: false,
            endMenu: false
        }
    },
    methods: {
        close() {
            this.clearValues();
            this.$emit('close');
        },
        save() {
            let txFilterToEmit = JSON.parse(JSON.stringify(this.currentTxEdit));
            if (!txFilterToEmit.isStartFilter) {
                txFilterToEmit.startFilter = null;
            }

            if (!txFilterToEmit.isEndFitler) {
                txFilterToEmit.endFilter = null;
            }
            
            this.$emit('save', txFilterToEmit);
            this.clearValues();
        },
        clearValues() {
            this.currentTxEdit = new TxFilter(null, null);
        },
        turnOffStartSwitch() {
            if (!this.isStartFilter) {
                this.currentTxEdit.startFilterDate = null;
            }
        },
        turnOffEndSwitch() {
            if (!this.isEndFitler) {
                this.currentTxEdit.endFilterDate = null;
            }
        }
    },
    watch: {
        show: function(show) {
            if (show) {
                if (this.txFilter) {
                    this.currentTxEdit = JSON.parse(JSON.stringify(this.txFilter));
                }
            }
            else {
                this.clearValues();
            }
        }
    }
}
</script>
<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class = "headline">Edit Filter</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-switch
                                        v-model="currentTxEdit.isStartFilter"
                                        label="Set Start"
                                        v-on:change="turnOffStartSwitch"
                                    />
                                </v-flex>
                                <v-flex xs8>
                                    <v-menu
                                        v-model="startMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="currentTxEdit.startFilterDate"
                                                label="Start"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                                :disabled="!currentTxEdit.isStartFilter"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="currentTxEdit.startFilterDate" @input="startMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-switch
                                        v-model="currentTxEdit.isEndFilter"
                                        label="Set End"
                                        v-on:change="turnOffEndSwitch"
                                    />
                                </v-flex>
                                <v-flex xs8>
                                    <v-menu
                                        v-model="endMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="txFilter.endFilterDate"
                                                label="End"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                                :disabled="!currentTxEdit.isEndFilter"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="currentTxEdit.endFilterDate" @input="endMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color = "blue darken-1" flat @click="close()">Close</v-btn>
                    <v-btn color = "blue darken-1" flat @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>