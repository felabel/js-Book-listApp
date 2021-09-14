// book class - represents a book

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: handles UI tasks
class UI {
    static displayBooks(){
        const books = Store.getBooks();

        // loop through books and call the method add book to list
        books.forEach((book) => UI.addBookToList(book));

    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');

        // create a new row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href-# class="btn btn-danger btn-sm delete"></a>X</td>
        `;

        // append the row to the list
        list.appendChild(row);
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        // add text
        div.appendChild(document.createTextNode(message));

        // position the div
        const container = document.querySelector('.container');
        const form =  document.querySelector('#book-form');

        // the insert before takes two params, the first one is the element to be inserted and the second is the element you wanna insert it before
        container.insertBefore(div, form);

        // make alert dissappears in few seconds
        setTimeout(() => 
            document.querySelector('.alert').remove(), 3000);
        
    }

    static clearFields(){
        document.querySelector('#title'). value = null; 
        document.querySelector('#author'). value = null; 
        document.querySelector('#isbn'). value = null; 
    }

    // delete book
    static deleteBook(element){
        // check if the element clicked contains a delete class
        if(element.classList.contains('delete')){
            // get the parent of the element, which is the tr
            element.parentElement.parentElement.remove()
        }
    }
}
// Store Class: handles sorage
class Store {
    // get books
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
        books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }   
        
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        // reset to localsorage
        localStorage.setItem('books', JSON.stringify(books))

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) =>{
        // check to see if the isbn looped is the same as the isbn parsed
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        // reset local storage
        localStorage.setItem('books', JSON.stringify(books));

    }

    // add book
    // remove book

}


// Event: displays books
// call display books, loops through books and adds to the list
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    // get form values

    // prevent actual submit
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate the form
    if(title === '' || author ==='' || isbn === ''){
        UI.showAlert('please fill all required fields', 'danger')
    } else {
        // instantiate book

        const book = new Book(title, author, isbn);

        // addbook to UI
        UI.addBookToList(book);

        // add book to localstorage
        Store.addBook(book)

        UI.showAlert('book added successfully', 'success')

        // clear form fields
        UI.clearFields()
        }

    
})
document.querySelector('#book-list').addEventListener('click', (e)=>{
    // Event Remove a Book
    UI.deleteBook(e.target);

    
    // remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show success message
    UI.showAlert('book removed', 'info')

})