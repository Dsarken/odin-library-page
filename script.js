const myLibrary = [
  {
    title: "Five on a Treasure Island",
    author: "Enid Blyton",
    pages: 180,
    read: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: true,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    read: true,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: false,
  },
]; // Stores Books and accompanying info

document.getElementById("button-40").addEventListener("click", function () {
  // Clear the input values
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#pages").value = "";
});

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  // Get input values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10); // Convert to integer

  // Call your function (assuming you have an 'addBookToLibrary' function)
  addBookToLibrary(title, author, pages, false);
});

// Constructor for Book
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  getInfo() {
    const readStatus = this.read ? "Read" : "Not Read";
    return `${this.name} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }
}

// Function to add books to library
// Function to add books to library
function addBookToLibrary(title, author, pages, read) {
  // Hide the pop-up and backdrop
  const popup = document.querySelector("#popup");
  const backdrop = document.querySelector("#backdrop");
  popup.style.display = "none";
  backdrop.style.display = "none";

  // Create a new Book object
  const newBook = new Book(title, author, pages, read);

  // Check if the book already exists in the library
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === title && myLibrary[i].author === author) {
      alert("This book already exists in the library.");
      return;
    }
  }

  // Add validation for title length and number of pages
  if (title.length > 50) {
    alert("Title is too long. Please limit it to 100 characters or less.");
    return;
  }

  if (author.length > 50) {
    alert("Author name is too long. Please limit it to 30 characters or less.");
    return;
  }

  if (pages > 1000) {
    alert("Number of pages is too high. Please limit it to 1000.");
    return;
  }

  // Add the new book to your library
  if (title && author && pages !== undefined && read !== undefined) {
    myLibrary.push(newBook);
    displayLibrary(myLibrary);
  }
}

function clearInputs() {
  // Clear the input values
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#pages").value = "";

  // Hide the pop-up and backdrop
  const popup = document.querySelector("#popup");
  const backdrop = document.querySelector("#backdrop");
  popup.style.display = "none";
  backdrop.style.display = "none";
}

function togglePopup() {
  const popup = document.querySelector("#popup");
  const backdrop = document.querySelector("#backdrop");

  if (popup.style.display === "grid") {
    popup.style.display = "none"; // Hide the pop-up
    backdrop.style.display = "none"; // Hide the backdrop
  } else {
    popup.style.display = "grid"; // Show the pop-up
    backdrop.style.display = "block"; // Show the backdrop
  }
}

const mainLibrary = document.querySelector(".mainLibrary");

function displayLibrary(myLibrary) {
  mainLibrary.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const BookCard = document.createElement("div");
    const BookTitle = document.createElement("h1");
    const BookAuthor = document.createElement("p");
    const BookPages = document.createElement("p");
    const buttons = document.createElement("div");
    const BookRead = document.createElement("img");
    const png = document.createElement("img");
    BookCard.classList.add("card");
    BookTitle.classList.add("title");
    BookAuthor.classList.add("author");
    BookPages.classList.add("pages");
    buttons.classList.add("buttons");
    BookRead.classList.add("toggleRead");
    BookTitle.textContent = myLibrary[i].title;
    BookAuthor.textContent = myLibrary[i].author;
    BookPages.textContent = myLibrary[i].pages;
    BookRead.textContent = myLibrary[i].read;
    png.src = "./images/delete-icon.png";
    BookRead.src = myLibrary[i].read
      ? "./images/open-book.png"
      : "./images/book-closed.png";
    BookCard.appendChild(BookTitle);
    BookCard.appendChild(BookAuthor);
    BookCard.appendChild(BookPages);
    BookCard.appendChild(buttons);
    buttons.appendChild(BookRead);
    buttons.appendChild(png);
    mainLibrary.appendChild(BookCard);
    BookCard.setAttribute("index", i);
    png.addEventListener("click", () => {
      myLibrary.splice(BookCard.getAttribute("index"), 1);
      mainLibrary.innerHTML = "";
      displayLibrary(myLibrary);
    });
    BookRead.addEventListener("click", (e) => {
      BookRead.classList.toggle("unread");
      if (myLibrary[BookCard.getAttribute("index")].read == false) {
        myLibrary[BookCard.getAttribute("index")].read = true;
        BookRead.src = "./images/open-book.png";
      } else {
        myLibrary[BookCard.getAttribute("index")].read = false;
        BookRead.src = "./images/book-closed.png";
      }
    });
  }
}
displayLibrary(myLibrary);
console.log(myLibrary);
