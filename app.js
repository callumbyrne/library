//storage array
let myLib = JSON.parse(localStorage.getItem("myLib")) || [];

const bookContainer = document.querySelector(".bookContainer");
const titleForm = document.getElementById('title');
console.log(titleForm.id);
const titleError = document.querySelector('#title + span.error');
const authorForm = document.getElementById('author');
const authorError = document.querySelector('#author + span.error');
const pagesForm = document.getElementById('pages');
const pagesError = document.querySelector('#pages + span.error');
const form = document.querySelector('form');


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
};


function addBook(e) {
    e.preventDefault();
    // Get the form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    // if (!title) {
    //     return alert("A title is required :)");
    // } else {
        const book = new Book(title, author, pages, read);
        myLib.push(book);
        document.querySelector('form').reset();

        //saves myLib to localStorage
        localStorage.setItem("myLib", JSON.stringify(myLib));

        renderBook(book);
    // }
};

function renderBook(book) {
    const title = book.title;
    index = myLib.findIndex(book => book.title == title);

    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readDiv = document.createElement('div');
    const deleteDiv = document.createElement('div');

    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    bookDiv.classList.add('book');
    deleteBtn.classList.add('deleteBtn');
    readBtn.classList.add('readBtn');
    titleDiv.classList.add('titleDiv');
    // gives the new book a data-attribute with the index of the new books location within the myLib array
    bookDiv.setAttribute('data-index', index);
    deleteBtn.innerText = "Delete";
    readBtn.innerText = book.read;

    const titleContent = document.createTextNode(book.title);
    const authorContent = document.createTextNode(book.author);
    const pagesContent = document.createTextNode(`${book.pages} pages`);


    titleDiv.appendChild(titleContent);
    authorDiv.appendChild(authorContent);
    pagesDiv.appendChild(pagesContent);
    readDiv.appendChild(readBtn);
    deleteDiv.appendChild(deleteBtn);

    bookDiv.append(titleDiv, authorDiv, pagesDiv, readDiv, deleteDiv);
    bookContainer.appendChild(bookDiv);

    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', deleteBook);
    });

    document.querySelectorAll('.readBtn').forEach(btn => {
        btn.addEventListener('click', readToggle);
    });
};

function deleteBook(e) {
    const bookIndex = e.path[2].dataset.index;
    const book = document.querySelector(`[data-index='${bookIndex}']`);
    bookContainer.removeChild(book);
    myLib.splice(bookIndex, 1);
    localStorage.setItem("myLib", JSON.stringify(myLib));
};

function readToggle(e) {
    const bookIndex = e.path[2].dataset.index;
    if (e.target.innerText == "Read") {
        myLib[bookIndex].read = "Not Read";
        e.target.innerText = "Not Read";
    } else {
        myLib[bookIndex].read = "Read";
        e.target.innerText = "Read";
    };
    localStorage.setItem("myLib", JSON.stringify(myLib));
};


if (myLib) {
    myLib.forEach(book => {
        renderBook(book);
    });
};


function showError(formInput) {
    formName = formInput.id;
    if (formInput.validity.valueMissing) {
        document.querySelector(`#${formName} + span.error`).textContent = 'This is required!';
    } else if (formInput.validity.typeMismatch) {
        console.log('mismatch');
    } else if (formInput.validity.tooShort) {
        document.querySelector(`#${formName} + span.error`).textContent = 'Too short!';
    } else if (formInput.validity.rangeUnderflow) {
        document.querySelector(`#${formName} + span.error`).textContent = 'Must be greater than 1!';
    }
    document.querySelector(`#${formName} + span.error`).className = 'error active';
};


titleForm.addEventListener('input', () => {
    if (titleForm.validity.valid) {
        titleError.textContent = '';
        titleError.className = 'error';
    } else {
        showError(titleForm);
    };
});

authorForm.addEventListener('input', () => {
    if (authorForm.validity.valid) {
        authorError.textContent = '';
        authorError.className = 'error';
    } else {
        showError(authorForm);
    };
});

pagesForm.addEventListener('input', () => {
    if (pagesForm.validity.valid) {
        pagesError.textContent = '';
        pagesError.className = 'error';
    } else {
        showError(pagesForm);
    };
});
    
form.addEventListener('submit', (e) => {
    if (!titleForm.validity.valid) {
        showError(titleForm);
        e.preventDefault();
    } else if (!authorForm.validity.valid) {
        showError(authorForm);
        e.preventDefault();
    } else if (!pagesForm.validity.valid) {
        showError(pagesForm);
        e.preventDefault();
    } else {
        modal.style.display = "none";
        addBook(e);
    };
});



