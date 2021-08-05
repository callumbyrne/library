//storage array
let myLib = [];

let title = "Harry Potter and the Philosopher's Stone";
let author = "J. K. Rowling";
let pages = "320";
let read = "not read yet";

const body = document.querySelector(".body");

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

function addBookToLibrary() {
    book = new Book(title, author, pages, read);
    myLib.push(book);
};

function renderBook() {
    myLib.forEach(book => {
        const div = document.createElement('div');
        const content = document.createTextNode(book.info());
        div.appendChild(content);
        body.appendChild(div);
    })
};

addBookToLibrary();
renderBook();


