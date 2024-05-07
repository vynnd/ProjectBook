import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { AdminMessage } from "./AdminMessage";
import { Pagination } from "../../Utils/Pagination";
import AdminRequestMessage from "../../../models/AdminRequestMessage";

export const AdminMessages = () => {

    const { authState } = useOktaAuth();

    //Normail Loading Pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [httpError, setHttpError] = useState(null);

    //Messages endpoint State
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchUserMessages = async () => {
            if(authState && authState.isAuthenticated){
                const url = `${process.env.REACT_APP_API}/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                }
            const messagesRespone = await fetch(url, requestOptions);
            if(!messagesRespone.ok){
                throw new Error("Something went wrong!")
            }
            const messagesResponeJson =  await messagesRespone.json();
            setMessages(messagesResponeJson._embedded.messages);
            setTotalPages(messagesResponeJson.page.totalPages);

        }
        setIsLoadingMessages(false);
    }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
    },[authState, currentPage, btnSubmit])

    if(isLoadingMessages){
        return(
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return(
            <div className="container m-5">
                {httpError}
            </div>
        )
    }

    async function submitResponseToQuestion(id: number, response: string){
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if(authState && authState.isAuthenticated && id !== null && response !== ''){
            const messageAdminRequestModel: AdminRequestMessage = new AdminRequestMessage(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            }
            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if(!messageAdminRequestModelResponse.ok) {
                throw new Error("Something went wrong!");
            }
            setBtnSubmit(!btnSubmit)
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className='mt-3'>
            {messages.length > 0 ? 
                <>
                    <h5>Pending Q/A: </h5>
                    {messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}