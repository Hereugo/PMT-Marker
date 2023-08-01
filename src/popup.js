function filterHandler(e) {
    const filter = this.dataset.filter;

    for (const li of document.querySelectorAll('.PMT-checkbox')) {
        li.parentElement.style.display = 'none';
    }

    if (filter === 'all') {
        for (const li of document.querySelectorAll('.PMT-checkbox')) {
            li.parentElement.style.display = 'inline-flex';
        }
    } else {
        for (const li of document.querySelectorAll(`.PMT-checkbox[data-status="${filter}"`)) {
            li.parentElement.style.display = 'inline-flex';
        }
    }

    const title = document.querySelector('.PMT-dropdown-title');
    title.dataset.filter = filter;
}

for (const elem of document.querySelector('.PMT-dropdown-content').children) {
    elem.addEventListener('click', filterHandler, false);
}
document.querySelector('.PMT-close-btn').addEventListener('click', () => window.close(), false);
document.querySelector('.PMT-clear-all').addEventListener('click', () => {
    Utils.setStorageData({statuses: {}});
    window.close();
}, false);

const ul = document.querySelector('.PMT-files');
Utils.getStorageData(['statuses'])
    .then(({statuses}) => {
        
        if (statuses && Object.keys(statuses).length) {
            for (const [fileId, data] of Object.entries(statuses)) {
                const li = document.createElement('li');
                li.appendChild(createCheckbox(fileId, data.filename));
                li.appendChild(createLink(fileId, data.filename));
    
                ul.appendChild(li);
            }
        } else {
            const li = document.createElement('li');
            li.textContent = 'No files found';
            ul.appendChild(li);
        }

    })
    .catch(Utils.errorLog);
