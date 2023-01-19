package edu.ucdenver.library;

import java.time.LocalDate;

public class PrintedBook extends Book {
    private int numPages;

    public PrintedBook(String title, LocalDate publicationDate, String[] otherTitles, Author author,String isbn,int numPages){
        super(title,publicationDate,otherTitles,author,isbn);
        this.numPages=numPages;
    }
    public int getNumPages() {
        return numPages;
    }
    @Override
    public String toString(){
        StringBuilder output=new StringBuilder();
        output.append("Printed-");
        String result=super.toString();
        //String result=String.format("Printed-Book: %s (isbn:isbn %s), published on %tF authored by %s with %d pages and %d other titles.",getTitle(),getIsbn(),getPublicationDate(),getAuthor(),getNumPages(),getOtherTitles().length);
        output.append(result);
        return output.toString();
    }
}
