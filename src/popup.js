$.expr[':'].icontains = function(a, i, m) {
  return $(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

function updateListFiles(filter, search) {
  console.log(filter, search);
  $('#files li').removeClass('hidden');
  if (filter !== 'all') $(`#files li:not(:has(.PMT-checkbox[data-status="${filter}"]))`).addClass('hidden');
  $(`#files li:not(:has(a:icontains(${search})))`).addClass('hidden');
}

function filterHandler(e) {
  const filter = this.dataset.filter;

  $('#PMT-filter-title').attr('data-filter', filter);
  updateListFiles(filter, $('#PMT-search').attr('data-search'));
}

function searchHandler(e) {
  const search = this.value;

  $('#PMT-search').attr('data-search', search);
  updateListFiles($('#PMT-filter-title').attr('data-filter'), search);
}

function clearHandler(e) {
  const fileId = this.dataset.fileId;

  Utils.getStorageData(["statuses"])
    .then(({ statuses }) => {
      delete statuses[fileId];
      Utils.setStorageData({ statuses });
    })
    .catch(Utils.errorLog);

  this.parentElement.remove();
}

$(document).ready(function() {
  // Setup search bar functionalities
  $('#PMT-search').on('input', searchHandler);

  // Setup dropdown functionalities
  $('#PMT-dropdown-content button').on('click', filterHandler);

  Utils.getStorageData(["statuses"])
    .then(({ statuses }) => {
      let files = $('#files');
      if (statuses && Object.keys(statuses).length) {
        for (const [fileId, data] of Object.entries(statuses)) {
          files.append(createFile(fileId, data.filename, data.status));
        }

        $('#files .PMT-checkbox').on('click', checkboxHandler);
        $('#files .PMT-clear-btn').on('click', clearHandler);
      }
    })
    .catch(Utils.errorLog);
});