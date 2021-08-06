//storage array
let myLib = [];

// let title = "Harry Potter and the Philosopher's Stone";
// let author = "J. K. Rowling";
// let pages = "320";
// let read = "not read yet";

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

    // below code outputs the myLib array to JSON
    // let pre = document.querySelector('.bookContainer pre');
    // pre.textContent = '\n' + JSON.stringify(myLib, null, 2);

    const bookContainer = document.querySelector(".bookContainer");

    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readDiv = document.createElement('div');

    bookDiv.classList.add('book');

    const titleContent = document.createTextNode(title);
    const authorContent = document.createTextNode(author);
    const pagesContent = document.createTextNode(pages);
    const readContent = document.createTextNode(read);

    titleDiv.appendChild(titleContent);
    authorDiv.appendChild(authorContent);
    pagesDiv.appendChild(pagesContent);
    readDiv.appendChild(readContent);

    bookDiv.append(titleDiv, authorDiv, pagesDiv, readDiv);
    bookContainer.appendChild(bookDiv);
};


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addBook);
});

// addBook();
// renderBook();


