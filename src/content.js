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

  document.addEventListener("DOMContentLoaded", (event) => {
    // Access the DOM where file hrefs are locatted
    document.querySelectorAll(".files").forEach((ul) => {
      ul.classList += " PMT-files";

      for (const li of ul.children) {
        let fileId = li.querySelector("a").href;
        let filename = li.querySelector("a").innerText;

        li.prepend(createCheckbox(fileId, filename));
      }
    });
  });
})();
