function updateStorage(fileId, filename, status) {
  Utils.getStorageData(["statuses"]).then(async ({ statuses }) => {
    statuses[fileId] = {
      status,
      filename,
      date: Date.now(),
    };
    await Utils.setStorageData({ statuses });
  });
}

// https://stackoverflow.com/questions/7463391/how-to-create-open-square-checkbox-style-list-marker-for-html-unordered-list
function checkboxHandler(event) {
  let target = event.target;

  if (target.readOnly) target.checked = target.readOnly = false;
  else if (!target.checked) target.readOnly = target.indeterminate = true;

  let status = target.checked
    ? "completed"
    : target.readOnly
    ? "inprogress"
    : "pending";
  target.dataset.status = status;

  updateStorage(target.dataset.fileId, target.dataset.filename, status);
}

function createLink(fileId, filename) {
  let link = document.createElement("a");
  link.href = fileId;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.dataset.fileId = fileId;
  link.className = "PMT-link";
  let span = document.createElement("span");
  span.textContent = filename;
  span.className = "PMT-filename";
  link.appendChild(span);

  return link;
}

function createCheckbox(fileId, filename) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.fileId = fileId;
  checkbox.dataset.filename = filename;
  checkbox.className = "PMT-checkbox";
  checkbox.addEventListener("click", checkboxHandler, false);

  Utils.getStorageData(["statuses"]).then(({ statuses }) => {
    try {
      checkbox.dataset.status = statuses[fileId].status;
    } catch (error) {
      checkbox.dataset.status = "pending";
    }
    switch (statuses[fileId]) {
      case "completed":
        checkbox.readOnly = false;
        checkbox.checked = true;
        checkbox.indeterminate = false;
        break;
      case "inprogress":
        checkbox.readOnly = true;
        checkbox.checked = false;
        checkbox.indeterminate = true;
        break;
      default:
        checkbox.readOnly = false;
        checkbox.checked = false;
        checkbox.indeterminate = false;
        break;
    }
  });

  return checkbox;
}
