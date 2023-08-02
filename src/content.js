(function setup() {
  Utils.log("Content script loaded");

  // chrome.storage.sync.clear();

  Utils.getStorageData(["statuses"])
    .then(async (result) => {
      if (!result.statuses) {
        await Utils.setStorageData({ statuses: {} });
      }
    })
    .catch(Utils.errorLog);

  
    $(document).ready(function() {
    // Access the DOM where file hrefs are locatted
    $('.files').addClass('PMT-files').each((i, ul) => {
      $(ul).children().each((i, li) => {
        let fileId = $(li).find('a').attr('href');
        let filename = $(li).find('a').text();

        $(li).prepend(createCheckbox(fileId, filename));
      });
    });
  });
})();
