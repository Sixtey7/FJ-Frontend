class TxFilter {
    isStartFilter;
    isEndFilter;
    startFilterDate;
    endFilterDate;

    constructor(startFilerDate, endFilterDate) {
        if (typeof startFilerDate !== 'undefined') {
            this.isStartFilter = true;
            this.startFilterDate = startFilerDate;
        }
        else {
            this.isStartFilter = false;
            this.startFilterDate = null;
        }

        if (typeof endFilterDate !== 'undefined') {
            this.isEndFilter = true;
            this.endFilterDate = endFilterDate;
        }
        else {
            this.isEndFilter = false;
            this.endFilterDate = null;
        }
    }
}

export default TxFilter;