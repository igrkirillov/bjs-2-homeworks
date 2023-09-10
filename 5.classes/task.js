class PrintEditionItem {
    constructor(name, releaseDate, pagesCount, state = 100, type = null) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = state;
        this.type = type;
    }

    fix() {
        this._state = Math.min(this._state * 1.5, 100);
    }

    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount, state) {
        super(name, releaseDate, pagesCount, state, "magazine");
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount, state) {
        super(name, releaseDate, pagesCount, state, "book");
        this.author = author;
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state) {
        super(author, name, releaseDate, pagesCount, state);
        this.type = "detective";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state) {
        super(author, name, releaseDate, pagesCount, state);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state) {
        super(author, name, releaseDate, pagesCount, state);
        this.type = "fantastic";
    }
}

class Library {
    constructor(name, books = []) {
        this.name = name;
        this.books = books;
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
            return true;
        } else {
            return false;
        }
    }

    findBookBy(type, value) {
        const foundBooks = this.books.filter(book => book[type] === value);
        return foundBooks.length > 0 ? foundBooks[0] : null;
    }

    giveBookByName(bookName) {
        const index = this.books.findIndex(book => book.name === bookName);
        if (index >= 0) {
            const foundBook = this.books[index];
            return this.books.splice(index, 1)[0];
        } else {
            return null;
        }
    }
}

function myTest() {
    const library = new Library("Библиотека");

    library.addBook(new NovelBook("Александр Цыганов", "Томатный сок", 2000, 81));

    let book1919 = library.findBookBy("releaseDate", 1919)

    console.log(`Есть ли книга 1919 года ${book1919 != null}`);

    library.addBook(new Magazine("Вестник СССР", 1919, 1));

    book1919 = library.findBookBy("releaseDate", 1919);

    console.log(`Книгу добавили. Есть ли книга 1919 года: ${book1919 != null}`);

    console.log(`Книг в библиотеке ${library.books.length}`);

    const book = library.giveBookByName("Вестник СССР");

    console.log(`Выданная книга ${book.name}`);
    console.log(`Книг в библиотеке ${library.books.length}`);

    book.state = 50;

    console.log(`Книга попортилась ${book.state}`);

    book.fix();

    console.log(`Книгу отремонтировали ${book.state}`);

    library.addBook(book);

    console.log(`Книгу вернули. Книг в библиотеке ${library.books.length}`);
}

class Student {
    constructor(name) {
        this.name = name;
        this.marks = {};
    }

    addMark(mark, subject) {
        if (mark < 2 || mark > 5) {
            // невалидная оценка, пропускаем обработку
            return;
        }
        if (!Object.keys(this.marks).includes(subject)) {
            // массив оценок по предмету
            this.marks[subject] = [];
        }
        this.marks[subject].push(mark);
    }

    getAverageBySubject(subject) {
        if (!Object.keys(this.marks).includes(subject)) {
            return 0;
        }
        return this.marks[subject].reduce((sum, mark) => sum + mark, 0) / this.marks[subject].length;
    }

    getAverage() {
        const subjects = Object.keys(this.marks);
        if (subjects.length === 0) {
            return 0;
        }
        return subjects.reduce((sum, subject) => sum + this.getAverageBySubject(subject), 0) / subjects.length;
    }
}
