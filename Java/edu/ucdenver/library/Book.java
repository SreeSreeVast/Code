package edu.ucdenver.library;

import java.time.LocalDate;

public class Book{
    private String title;
    private LocalDate publicationDate;
    private String[] otherTitles;
    private String isbn;
    private Author author;
    private int numPages;

    public Book(String title, LocalDate publicationDate, String[] otherTitles, Author author, String isbn){
        this.title=title;
        this.publicationDate=publicationDate;
        this.otherTitles=otherTitles;
        this.isbn=isbn;
        this.author=author;
        //this.numPages=numPages;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String[] getOtherTitles() {
        return otherTitles;
    }

    public void setOtherTitles(String[] otherTitles) {
        this.otherTitles = otherTitles;
    }

    public String getISBN() {
        return isbn;
    }

    public Author getAuthor() {
        return author;
    }

    public int getNumPages() {
        return numPages;
    }
    @Override
    public String toString(){
        StringBuilder output=new StringBuilder();
        String result=(String.format("Book: %s (isbn:%s), published on %tF authored by %s with %d pages and %d other titles." , getTitle() , getISBN() ,getPublicationDate(),getAuthor(),getNumPages(),getOtherTitles().length));
        output.append(result);
        return output.toString();
    }
}
