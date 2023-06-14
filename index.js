
// TODO: Add event listener on confirmation to remove record from list
// TODO: Save record in a global variable to identify record to be removed
// TODO: Add update operation
// TODO: Finish create operation

/**@type {"CREATE" | "UPDATE" }*/
let operation = "CREATE";

class RecordService {
  #records;
  constructor() {
    this.#records = new Map();

  }
  validateRecordConsistency(record) {
    if (!record) throw new Error("Record undefined");
    if (
      record.description === undefined
      || record.value === undefined
      || record.type === undefined
      || record.entryDate === undefined
    ) {
      throw new Error("Record with missing properties");
    }
  }

  create(record) {
    this.validateRecordConsistency(record);
    this.#records.set(++nextID,  record);
  }

  validateIdConsistency(ID) {
    if (ID === undefined || ID === null) throw new Error("ID is not informed");
    if (isNaN(Number(ID))) throw new Error("ID is not a number");
  }

  readById(ID) {
    this.validateIdConsistency(ID);
    const record = this.#records.get(ID)
    return { ID, ...record };
  }

  update(ID, record) {
    this.validateIdConsistency(ID);
    this.validateRecordConsistency(record);
    this.#records.set(ID, record);
  }
}

const tableBody = document.getElementById("tableBody");
const modalForm = document.getElementById("modalForm");

let nextID = tableBody.children.length;

const recordService = new RecordService();

function createTrashButton() {
  const trashData = document.createElement("td");
  const trashIcon = document.createElement("i");

  trashIcon.setAttribute("class", "bi bi-trash3-fill");
  trashIcon.setAttribute("style", "cursor: pointer;");
  trashIcon.setAttribute("data-bs-toggle", "modal");
  trashIcon.setAttribute("data-bs-target", "#confirmationModal");
  trashData.appendChild(trashIcon);

  return trashData;
}


function appendData(record) {
  if(!record) {
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
    tableRow.appendChild(rowData);
  }
}

function createRowElement(ID) {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", `tableRow-${ID}`);
  return tableRow;
}


function extractType(typeElement) {
  return typeElement.id.includes("Debit") ? "DEBIT" : "CREDIT";
}

function formatFormSubmission(target) {
  const description = target[0].value;
  const value = target[1].value;
  const entryDate = target[2].value;
  const type = extractType(target[3]);

  return { description, value, entryDate, type };

}

function submit(event) {
  event.preventDefault();
  try {
  const recordDto = formatFormSubmission(event.target);
  if (operation === "CREATE") {
    recordService.create(recordDto);
    const record = recordService.readById(nextID);
    appendData(record);
  }
  } catch(e) {
   console.error(e);
    alert("Some errors occurred during the form's submission.\n Check the console");
  }
}

modalForm.addEventListener("submit", submit);
