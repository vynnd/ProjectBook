import BookModel from "./BookModel";

class ShelfCurrentLoans {
    book: BookModel;
    daysLeft: number;

    constructor(book: BookModel, dayLeft: number){
        this.book = book;
        this.daysLeft = dayLeft;
    }
}

export default ShelfCurrentLoans;