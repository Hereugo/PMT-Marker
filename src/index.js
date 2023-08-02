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

function createFile(fileId, filename, status=undefined) {
  return $(`
  <li class="flex items-center gap-2">
    ${createCheckbox(fileId, filename, status).prop('outerHTML')}
    <a
      href="${fileId}"
      target="_blank"
      rel="noopener noreferrer"
      data-file-id="${fileId}"
    >
      <span class="text-blue-600 hover:text-gray-800">${filename}</span>
    </a>
    <button
      class="PMT-clear-btn inline-flex cursor-pointer rounded-md items-center border border-gray-300 bg-gray-100 p-1 px-2 ml-auto text-sm text-black hover:bg-gray-200"
      data-file-id="${fileId}"
      aria-label="Clear file"
    >
      <span class="inline-flex items-center justify-center h-3 w-3 text-gray-600">✕</span>
    </button>
  `);
}

function createCheckbox(fileId, filename, status=undefined) {
  const checkbox = $(`
    <input
      type="checkbox"
      data-file-id="${fileId}"
      data-filename="${filename}"
      ${status ? `data-status="${status}"`: 'data-status="all"'}
      class="PMT-checkbox"
    />
  `);

  updateCheckbox(checkbox, fileId, status);
  checkbox.on('click', checkboxHandler);

  return checkbox;
}

function updateCheckbox(checkbox, fileId, status=undefined) {
  if (!status) {
    Utils.getStorageData(["statuses"]).then(({ statuses }) => {
      try {
        checkbox.attr('data-status', statuses[fileId].status);
      } catch (error) {
        checkbox.attr('data-status', 'pending');
      }
    });
  }

  switch (checkbox.attr('data-status')) {
    case "completed":
      checkbox.attr('readOnly', false);
      checkbox.attr('checked', true);
      checkbox.attr('indeterminate', false);
      break;
    case "inprogress":
      checkbox.attr('readOnly', true);
      checkbox.attr('checked', false);
      checkbox.attr('indeterminate', true);
      break;
    default:
      checkbox.attr('readOnly', false);
      checkbox.attr('checked', false);
      checkbox.attr('indeterminate', false);
      break;
  }
}

