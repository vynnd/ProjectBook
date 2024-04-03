package com.luv2code.springbootlibrary.responsemodels;

import com.luv2code.springbootlibrary.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponese {

    public ShelfCurrentLoansResponese(Book book, int dayLeft){
        this.book = book;
        this.daysLeft = dayLeft;
    }

    private Book book;

    private int daysLeft;
}
