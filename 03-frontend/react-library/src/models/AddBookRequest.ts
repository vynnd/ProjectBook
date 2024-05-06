class AddBookRequst {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: string;

    constructor(title: string, author: string, description: string, copies: number, cathegory: string){
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = cathegory;
    }
}

export default AddBookRequst;