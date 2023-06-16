let createEventListener = null;
let updateEventListener = null;

class RecordController {
  #currentID = null;

  constructor() {
    const deleteCallback = (e) => this.delete.call(this, e);
    const updateCallback = (e) => this.update.call(this, e);
    this.recordService = new RecordService();
    this.tableManager = new TableManager("tableBody", updateCallback, deleteCallback);
    this.modalForm = document.getElementById("modalForm");
    this.createButton = document.getElementById("createButton");
    this.deleteConfirmationButton = document
      .getElementById("deleteConfirmationButton");
    this.deleteCancelationButton = document
      .getElementById("deleteConfirmationButton");
    this.recordModal = new bootstrap
      .Modal('#createModal', { keyboard: true });
    this.confirmationModal = new bootstrap
      .Modal('#confirmationModal', { keyboard: true });
    this.message = new MessageToast();
    this.setupEvents();
  }

  #identifyRadioToCheck(record) {
    return record.type === "CREDIT" ? "modalRadioCredit" : "modalRadioDebit";
  }

  #populateModal(record) {
    document.getElementById("modalTitle").innerHTML = "Update record"
    document.getElementById("modalDescription").value = record.description
    document.getElementById("modalValue").value = record.value
    document.getElementById("modalEnterDate").value = record.entryDate
    document.getElementById(this.#identifyRadioToCheck(record)).checked = true;
  }

  setupEvents() {
    this.createButton.addEventListener("click", (e) => this.create.call(this, e));
    this.deleteConfirmationButton.addEventListener("click", (e) => this.confirmDelete.call(this, e));
    this.deleteCancelationButton.addEventListener("click", () => this.#currentID = null);
    createEventListener = (e) => this.submitCreate.call(this, e);
    updateEventListener = (e) => this.submitUpdate.call(this, e);
  }

  openModal(operation) {
    if (operation === "DELETE") this.confirmationModal.show();
    else {
      const modalTitle = operation === "CREATE" ? "Create new record" : "Update record";
      document.getElementById("modalTitle").innerHTML = modalTitle;
      if (operation === "CREATE") this.modalForm.addEventListener("submit", createEventListener, true);
      else this.modalForm.addEventListener("submit", updateEventListener, false);
      this.modalForm.reset();
      this.recordModal.show();
    }
  }

  create() {
    this.openModal("CREATE");
  }

  update(e) {
    this.#currentID = e.target.parentNode.id.split("-")[1];
    const record = this.recordService.readById(this.#currentID);
    this.openModal("UPDATE");
    this.#populateModal(record);
  }

  delete(e) {
    this.#currentID = e.target.parentNode.parentNode.id.split("-")[1];
    this.openModal("DELETE");
  }

  confirmDelete() {
    this.recordService.delete(this.#currentID);
    this.tableManager.removeData(this.#currentID);
    this.message.mountSuccessToast("Record deleted successfully");
    this.finishSubmit();
  }

  formatFormSubmission(target) {
    const description = target[0].value;
    const value = target[1].value;
    const entryDate = target[2].value;
    const type = target[3].checked ? target[3].value : target[4].value;

    return { description, value, type, entryDate };

  }

  submitCreate(event) {
    try {
      const recordDto = this.formatFormSubmission(event.target);
      event.preventDefault();
      this.recordService.create(recordDto);
      const nextID = this.recordService.getNextID();
      const record = this.recordService.readById(nextID);
      this.tableManager.appendData(record);
      this.message.mountSuccessToast("Record created successfully!");
      this.finishSubmit();
      this.modalForm.removeEventListener("submit", createEventListener, true);
    } catch (e) {
      console.error(JSON.stringify(e));
      this.message
        .mountErrorToast(e.message)
        .showToast();
    }
  }

  submitUpdate(event) {
    try {
      event.preventDefault();
      const recordDto = this.formatFormSubmission(event.target);
      this.recordService.update(this.#currentID, recordDto);
      const record = this.recordService.readById(this.#currentID);
      this.tableManager.updateData(this.#currentID, record);
      this.message.mountSuccessToast("Record updated successfully!");
      this.finishSubmit();
      this.modalForm.removeEventListener("submit", updateEventListener, false);
    } catch (e) {
      console.error(JSON.stringify(e));
      this.message
        .mountErrorToast(e.message)
        .showToast();
    }
  }

  finishSubmit() {
    this.#currentID = null;
    this.modalForm.reset();
    this.recordModal.hide();
    this.message.showToast();
  }

}

new RecordController()