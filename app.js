//storage array
let myLib = [];

const bookContainer = document.querySelector(".bookContainer");

//constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

//adding universal info function to the Book.prototype object
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

function addBook(e) {
    e.preventDefault();
    // Get the form values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    let book = new Book(title, author, pages, read);
    myLib.push(book);
    document.querySelector('form').reset();

    index = myLib.findIndex(book => book.title == title);

    const bookContainer = document.querySelector(".bookContainer");

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
    bookDiv.setAttribute('data-index', index);
    deleteBtn.innerText = "Delete";
    readBtn.innerText = read;

    const titleContent = document.createTextNode(title);
    const authorContent = document.createTextNode(author);
    const pagesContent = document.createTextNode(pages);


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
};

function deleteBook(e) {
    const bookIndex = e.path[2].dataset.index;
    const book = document.querySelector(`[data-index='${bookIndex}']`);
    const bookContainer = document.querySelector(".bookContainer");
    bookContainer.removeChild(book);
    myLib.splice(bookIndex, 1);
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', addBook);
});


