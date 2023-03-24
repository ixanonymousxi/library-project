class Library {
    constructor(){
        this.myLibrary = [];
        this.removeBookFromLibrary = this.removeBookFromLibrary.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    addBookToLibrary(inputValueArr) {
        const newBook = new Book(inputValueArr[0], inputValueArr[1], inputValueArr[2], inputValueArr[3], ("book_" + this.myLibrary.length));
        this.myLibrary.push(newBook);
        this.displayLibrary();
    }

    removeBookFromLibrary(event) {
        const bookToBeRemovedId = event.target.parentNode.id;

        this.myLibrary = this.myLibrary.filter(book => (book.id !== bookToBeRemovedId));
        this.displayLibrary();
    }

    changeStatus(event) {
        const selectedBookId = event.target.parentNode.id;

        this.myLibrary.forEach((book, i) => {
            if (book.id === selectedBookId) {
                this.myLibrary[i].readStatus = this.myLibrary[i].readStatus === "Read" ? "Unread" : "Read";
            }
        });

        this.displayLibrary();
    }

    displayLibrary() {
        const table = document.querySelector('#table');

        table.childNodes.forEach(child => {
            if (child.className === 'book') {
                child.style.display = "none"
            }
        });

        table.childNodes.forEach(child => {
            table.removeChild(child);
        });

        this.myLibrary.forEach(book => {
            const bookTitle = document.createElement("p");
            bookTitle.classList.add("book-title");
            bookTitle.innerHTML = book.title;

            const bookAuthor = document.createElement("p");
            bookAuthor.classList.add("book-author");
            bookAuthor.innerHTML = book.author;

            const bookPageCount = document.createElement("p");
            bookPageCount.classList.add("book-page-count");
            bookPageCount.innerHTML = "<strong>Page Count: </strong>" + book.pageCount;

            const bookStatus = document.createElement("p");
            bookStatus.classList.add("book-status");
            bookStatus.innerHTML = "<strong>Status: </strong>" + book.readStatus;

            const bookButton = document.createElement("button");
            bookButton.classList.add("book-button");
            bookButton.addEventListener("click", this.removeBookFromLibrary);
            bookButton.innerHTML = "Remove Book";

            const bookButtonStatus = document.createElement("button");
            bookButtonStatus.classList.add("book-status-button");
            bookButtonStatus.addEventListener("click", this.changeStatus);
            bookButtonStatus.innerHTML = "Mark " + ((book.readStatus === "Read") ? "unread" : "read");

            const bookContainer = document.createElement("div");
            bookContainer.setAttribute("id", book.id);
            bookContainer.classList.add("book");
            bookContainer.appendChild(bookTitle);
            bookContainer.appendChild(bookAuthor);
            bookContainer.appendChild(bookPageCount);
            bookContainer.appendChild(bookStatus);
            bookContainer.appendChild(bookButton);
            bookContainer.appendChild(bookButtonStatus);

            table.appendChild(bookContainer);
        });
    }

}


class Book {

    constructor(title, author, pageCount, readStatus, id){
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.readStatus = readStatus;
        this.id = id;
    }
}


class Form {
    constructor() {
        this.checkFields = this.checkFields.bind(this);
    }

    openForm() {
        const form_container = document.querySelector('#form-container');
        const table = document.querySelector('#table');

        table.classList.add("table");
        form_container.style.display = "block";
    }

    closeForm() {
        const form_container = document.querySelector('#form-container');
        const table = document.querySelector('#table');
        
        table.classList.remove("table");
        form_container.style.display = "none";
    }

    checkFields(event) {

        //Checks if required fields are filled out
        const inputFields = document.querySelectorAll('input[type="text"]');
        const emptyInputs = [];
        const inputValues = [];

        inputFields.forEach(input => {
            if (!input.value) {
                emptyInputs.push(input);
            } else {
                inputValues.push(input.value);
            }
        });


        //If all fields are filled execute hide form and add book
        if (emptyInputs.length <= 0) {
            event.preventDefault();
            this.closeForm();

            const radioInputs = document.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(radio => {
                if (radio.checked) {
                    inputValues.push(radio.value);
                }
            });

            library.addBookToLibrary(inputValues);
        }

    }
}

const form = new Form();
const library = new Library();


document.querySelector('#addBookButton').addEventListener("click", form.openForm, false);
document.querySelector('#submit-button').addEventListener("click", form.checkFields, false);