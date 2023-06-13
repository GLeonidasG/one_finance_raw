
const tableBody = document.getElementById("tableBody");
let nextID = tableBody.children.length;

document
  .getElementById("modalSubmit")
  .addEventListener("onclick", () => console.log("submitted"));

function craeteTrashButton() {
  const trashData = document.createElement("td");
  const trashIcon = document.createElement("i");

  trashIcon.setAttribute("class", "bi bi-trash3-fill");
  trashIcon.setAttribute("style", "cursor: pointer;");
  trashData.appendChild(trashIcon);

  return trashData;
}

function appendData() {
  const data = {
    ID: 2,
    description: "This is a sample description",
    value: "R$ 1000,00",
    type: "Credit",
    entryDate: new Date().toISOString()
  }

  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", `tableRow-${++nextID}`)
  for (prop in data) {
    const rowData = document.createElement("td");
    rowData.append(String(data[prop]));
    tableRow.appendChild(rowData);
  }
  const trash = craeteTrashButton();
  tableRow.appendChild(trash);

  tableBody.appendChild(tableRow);
}

