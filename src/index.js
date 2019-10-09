console.log('%c HI', 'color: firebrick')

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => renderImages(json));
}

function renderImages(json) {
    const dogImageContainer = document.querySelector('#dog-image-container');
    json.message.forEach(img => {
        const image = document.createElement('img')
        image.src = img
        dogImageContainer.appendChild(image)
    })
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => renderBreeds(json));
}

function renderBreeds(json) {
    breedList = document.querySelector('ul#dog-breeds')
    Object.keys(json.message).forEach(breed => {
        breedList.appendChild(generateBreedLi(breed));
    })
}

function generateBreedLi(breed) {
    const breedLi = document.createElement('li')
    breedLi.innerHTML = breed
    breedLi.addEventListener('click', function(e) {
        breedLi.style.color = 'maroon'
    })
    return breedLi;
}

function activateDropdown() {
    const dropdown = document.querySelector('select#breed-dropdown')
    const defaultNoFilterOption = document.createElement('option')
    defaultNoFilterOption.value = "";
    defaultNoFilterOption.innerText = 'No filter';
    dropdown.appendChild(defaultNoFilterOption);
    dropdown.value = "";
    
    dropdown.addEventListener('change', function(e) {
        filterBreeds(e);
    })
}

function filterBreeds(e) {
    const breedLis = document.querySelectorAll('ul#dog-breeds > li');
    breedLis.forEach(breedLi => {
        if (breedLi.innerText.startsWith(e.currentTarget.value)) {
            breedLi.style.display = 'block';
        } else {
            breedLi.style.display = 'none';
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
    activateDropdown();
})
