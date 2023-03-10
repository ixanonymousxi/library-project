let myLibrary = [];

function Book(title,author,pageCount,readStatus,id) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
    this.id = id;
}

function addBookToLibrary(inputValueArr) {
    const newBook = new Book(inputValueArr[0], inputValueArr[1], inputValueArr[2], inputValueArr[3], ("book_" + myLibrary.length));
    myLibrary.push(newBook);
    displayLibrary();
}

function removeBookFromLibrary(event){
    const bookToBeRemovedId = event.target.parentNode.id;

    myLibrary = myLibrary.filter(book => (book.id !== bookToBeRemovedId));
    displayLibrary();
}

function changeStatus(event){
    const selectedBookId = event.target.parentNode.id;

    myLibrary.forEach((book,i) => {
        if(book.id === selectedBookId){
            myLibrary[i].readStatus = myLibrary[i].readStatus === "Read" ? "Unread" : "Read";
        }
    });

    displayLibrary();
}

function openForm(){
    const form = document.querySelector('#form-container');
    const table = document.querySelector('#table');

    table.classList.add("table");
    form.style.display = "block";
}

function closeForm(){
    const form = document.querySelector('#form-container');
    const table = document.querySelector('#table');

    table.classList.remove("table");
    form.style.display = "none";
}

function checkFields(event){

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
        closeForm();

        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            if (radio.checked) {
                inputValues.push(radio.value);
            } 
        });
        
        addBookToLibrary(inputValues);
    }

}

function displayLibrary(){
    const table = document.querySelector('#table');

    table.childNodes.forEach(child => {
        if(child.className === 'book'){
            child.style.display = "none"
        }
    });

    table.childNodes.forEach(child => {
        table.removeChild(child);
    });

    myLibrary.forEach(book => {
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
        bookButton.addEventListener("click", removeBookFromLibrary);
        bookButton.innerHTML = "Remove Book";

        const bookButtonStatus = document.createElement("button");
        bookButtonStatus.classList.add("book-status-button");
        bookButtonStatus.addEventListener("click", changeStatus);
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

document.querySelector('#submit-button').addEventListener("click", checkFields, false);
