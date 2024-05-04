class MessageModel {
    title: string;
    question: string;
    id?: number;
    userEmail?: string;
    adminEmail?: string;
    response?: string;
    closed?: string;

    constructor(title: string, question: string){
        this.title = title;
        this.question = question;
    }
}
export default MessageModel;