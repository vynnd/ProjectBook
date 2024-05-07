package com.luv2code.springbootlibrary.service;

import com.luv2code.springbootlibrary.dao.BookRepository;
import com.luv2code.springbootlibrary.dao.CheckoutRepository;
import com.luv2code.springbootlibrary.dao.ReviewRepository;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.requestmodels.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public void decreaseBookQuantity(Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);

        if(!book.isPresent() || book.get().getCopies() <=0 || book.get().getCopiesAvailable() <= 0){
            throw new Exception("Book not found or quantity locked");
        }

        book.get().setCopies(book.get().getCopies() - 1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());
    }

    public void increaseBookQuantity(Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);

        if(!book.isPresent()){
            throw new Exception("Book not found");
        }

        book.get().setCopies(book.get().getCopies() + 1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());
    }

    public void deleteBook(Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);

        if(!book.isPresent()){
            throw new Exception("Book not found");
        }

        checkoutRepository.deleteAllByBookId(bookId);
        reviewRepository.deleteAllByBookId(bookId);
        bookRepository.deleteById(bookId);
    }

    public void postBook(AddBookRequest addBookRequest){
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());

        bookRepository.save(book);
    }

}
