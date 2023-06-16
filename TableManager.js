class TableManager {

  #tableBody;
  #updateCallback;
  #deleteCallback;

  constructor(tableBody, updateCallback, deleteCallback) {
    this.#updateCallback = updateCallback;
    this.#deleteCallback = deleteCallback;
    if (typeof tableBody)
      this.#tableBody = document.getElementById(tableBody);
    else
      this.#tableBody = tableBody;
  }

  #createTrashButton() {
    const trashData = document.createElement("td");
    const trashIcon = document.createElement("i");

    trashIcon.setAttribute("id", "deleteRecordIcon");
    trashIcon.setAttribute("class", "bi bi-trash3-fill");
    trashIcon.setAttribute("style", "cursor: pointer;");
    trashData.appendChild(trashIcon);
    trashData.addEventListener("click", this.#deleteCallback);

    return trashData;
  }

  #applyDataToElement(data, tableRow) {
    for (const prop in data) {
      const rowData = document.createElement("td");
      rowData.append(String(data[prop]));
      rowData.setAttribute("style", `cursor: pointer;`);
      rowData.addEventListener("click", this.#updateCallback);
      tableRow.appendChild(rowData);
    }
  }

  #createRowElement(ID) {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", `tableRow-${ID}`);
    return tableRow;
  }

  appendData(data) {
    if (!data) {
      alert("There are no data to be saved!");
      return;
    }

    const tableRow = this.#createRowElement(data.ID);

    this.#applyDataToElement(data, tableRow);

    const trash = this.#createTrashButton();

    tableRow.appendChild(trash);
    this.#tableBody.appendChild(tableRow);
  }
  updateData(ID, data) {
    if (!data) {
      alert("There are no data to be saved!");
      return;
    }

    let oldRow = document.getElementById(`tableRow-${ID}`);

    const tableRow = this.#createRowElement(ID);

    this.#applyDataToElement(data, tableRow);

    const trash = this.#createTrashButton();

    tableRow.appendChild(trash);
    this.#tableBody.replaceChild(tableRow, oldRow);
  }

  removeData(ID) {
    const tableRow = document.getElementById(`tableRow-${ID}`);

    this.#tableBody.removeChild(tableRow);
  }
}
