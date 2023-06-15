class RecordService {
  #records;
  constructor() {
    this.#records = new Map();
    }
  validateRecordConsistency(record) {
    if (!record)
      throw new Error("Record undefined");
    if (record.description === undefined || record.description === ""
      || record.value === undefined || record.value === ""
      || record.type === undefined
      || record.entryDate === undefined || record.entryDate === "") {
      throw new Error("Record with missing properties");
    }
  }

  create(record) {
    this.validateRecordConsistency(record);
    this.#records.set(++nextID, record);
  }

  validateIdConsistency(ID) {
    if (ID === undefined || ID === null)
      throw new Error("ID is not informed");
    if (isNaN(Number(ID)))
      throw new Error("ID is not a number");
  }

  readById(ID) {
    this.validateIdConsistency(ID);
    const record = this.#records.get(Number(ID));
    return {ID, ...record};
  }

  update(ID, record) {
    this.validateIdConsistency(ID);
    this.validateRecordConsistency(record);
    this.#records.set(Number(ID), record);
  }

  delete(ID) {
    this.validateIdConsistency(ID);
    this.#records.delete(ID);
  }
}

