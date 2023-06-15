// TODO: Add event listener on confirmation to remove record from list
// TODO: Replace alert event with an error toast
// TODO: Isolate most of the content of this file into a controller class

/**@type {"CREATE" | "UPDATE" }*/
let operation = "CREATE";
let nextID = 0;
let currentID = null;

const recordModal = new bootstrap.Modal('#createModal', { keyboard: true });
const confirmationModal = new bootstrap.Modal('#confirmationModal', { keyboard: true });

const tableBody = document.getElementById("tableBody");
const modalForm = document.getElementById("modalForm");
const createButton = document.getElementById("createButton");

const deleteConfirmationButton = document
  .getElementById("deleteConfirmationButton");
const deleteCancelationButotn = document
  .getElementById("deleteConfirmationButton");

createButton.addEventListener("click", openModalForCreate);
deleteConfirmationButton.addEventListener("click", deleteRecord)
deleteCancelationButotn.addEventListener("click", () => currentID = null)

const recordService = new RecordService();

// ============= START CREATE OPERATION ================

function openModalForCreate() {
  operation = "CREATE";
  document.getElementById("modalTitle").innerHTML = "Create new record"
  modalForm.reset();
  recordModal.show();
}

function createTrashButton() {
  const trashData = document.createElement("td");
  const trashIcon = document.createElement("i");

  trashIcon.setAttribute("id", "deleteRecordIcon")
  trashIcon.setAttribute("class", "bi bi-trash3-fill");
  trashIcon.setAttribute("style", "cursor: pointer;");
  trashData.appendChild(trashIcon);
  trashData.addEventListener("click", openModalForDelete);

  return trashData;
}


function appendData(record) {
  if (!record) {
    alert("There are no data to be saved!");
    return;
  }

  const tableRow = createRowElement(record.ID);

  applyDataToElement(record, tableRow);

  const trash = createTrashButton();

  tableRow.appendChild(trash);
  tableBody.appendChild(tableRow);
}

function applyDataToElement(data, tableRow) {
  for (prop in data) {
    const rowData = document.createElement("td");
    rowData.append(String(data[prop]));
    rowData.setAttribute("style", `cursor: pointer;`);
    rowData.addEventListener("click", openModalForUpdate);
    tableRow.appendChild(rowData);
  }
}

function createRowElement(ID) {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", `tableRow-${ID}`);
  return tableRow;
}

// ================ END CREATE OPERATION ================

// ================ START UPDATE OPERATION ================

function identifyRadioToCheck(record) {
  return record.type === "CREDIT" ? "modalRadioCredit" : "modalRadioDebit";
}

function openModalForUpdate(e) {
  currentID = e.target.parentNode.id.split("-")[1];
  const record = recordService.readById(currentID);
  operation = "UPDATE";
  document.getElementById("modalTitle").innerHTML = "Update record"
  document.getElementById("modalDescription").value = record.description
  document.getElementById("modalValue").value = record.value
  document.getElementById("modalEnterDate").value = record.entryDate
  document.getElementById(identifyRadioToCheck(record)).checked = true;
  recordModal.show();
}

function updateData(ID, record) {
  if (!record) {
    alert("There are no data to be saved!");
    return;
  }

  let oldRow = document.getElementById(`tableRow-${ID}`);

  const tableRow = createRowElement(ID);

  applyDataToElement(record, tableRow);

  const trash = createTrashButton();

  tableRow.appendChild(trash);
  tableBody.replaceChild(tableRow, oldRow);
}

// ================ END UPDATE OPERATION   ================

// ================ START DELETE OPERATION   ================

function openModalForDelete(e) {
  currentID = e.target.parentNode.parentNode.id.split("-")[1];
  confirmationModal.show();
}

function deleteRecord() {
  
  recordService.delete(Number(currentID));
  removeData(currentID);
}


function removeData(ID) {
  const tableRow = document.getElementById(`tableRow-${ID}`);
  
  tableBody.removeChild(tableRow);
  currentID = null;
}

// ================ END DELETE OPERATION     ================

function formatFormSubmission(target) {
  const description = target[0].value;
  const value = target[1].value;
  const entryDate = target[2].value;
  const type = target[3].checked ? target[3].value : target[4].value;

  return { description, value, type, entryDate };

}

function submit(event) {
  event.preventDefault();
  try {
    const recordDto = formatFormSubmission(event.target);
    if (operation === "CREATE") {
      recordService.create(recordDto);
      const record = recordService.readById(nextID);
      appendData(record);
    } else {
      
      recordService.update(currentID, recordDto);
      const record = recordService.readById(currentID);
      updateData(currentID, record);
    }
    currentID = null;
    modalForm.reset();
    recordModal.hide();
  } catch (e) {
    console.error(JSON.stringify(e));
    alert(`Some errors occurred during the form's submission.
      Check the console`);
  }
}

modalForm.addEventListener("submit", submit);
