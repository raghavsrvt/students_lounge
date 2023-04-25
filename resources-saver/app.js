let todayDate = new Date();
let submitBtn = document.querySelector('.submit');
let resourcesDiv = document.querySelector('.resources-div');
let resourceTitle = document.querySelector('#resource-title');
let resourceUrl = document.querySelector('#resource-url');
(resourceUrl.value).type = 'url';

window.onload = () => {
    resourcesDiv.innerHTML = localStorage.getItem('resources');
}

submitBtn.addEventListener('click', () => {
    if ((resourceTitle.value == null || resourceTitle.value == '') || (resourceUrl.value == null || resourceUrl.value == '')) {
        alert('Please fill all the required input fields.');
    }
    else if(isUrl(resourceUrl.value) == false){
        alert(`Please enter a valid URL.\nMake sure to include full URL including "https"`);
    }
    else {
        let resourcesTitle = `
        <div class = 'resource-title'>
            <a class = "title" href="${resourceUrl.value}" target="_blank">${resourceTitle.value}</a>
            <button class = 'delete' onclick="dlt()">Delete</button>
        </div>`

        resourcesDiv.innerHTML += (resourcesTitle);
        localStorage.setItem('resources', resourcesDiv.innerHTML);
        resourceTitle.value = '';
        resourceUrl.value = ''
    }
})

const dlt = () => {
    let parent = event.target.parentNode;
    parent.remove();
    localStorage.setItem('resources', resourcesDiv.innerHTML);
}

const isUrl = (string) => {
    try { return Boolean(new URL(string)); }
    catch(e){ return false; }
}