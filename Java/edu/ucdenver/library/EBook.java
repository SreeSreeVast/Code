package edu.ucdenver.library;

import java.time.LocalDate;

public class EBook extends Book{
    private int numOfWords;
    private int wordsPerPage;

    public EBook(String title, LocalDate publicationDate, String[] otherTitles,Author author, String isbn, int numOfWords, int wordsPerPage){
        super(title,publicationDate,otherTitles,author,isbn);
        this.numOfWords=numOfWords;
        this.wordsPerPage=wordsPerPage;
    }

    public void setWordsPerPage(int wordsPerPage) {
        this.wordsPerPage = wordsPerPage;
    }

    public int getNumPages(){
        int pages=(numOfWords/wordsPerPage);
        return pages;
    }
    @Override
    public String toString(){
        StringBuilder output=new StringBuilder();
        output.append("Electronic-");
        String result=super.toString();
        //String result=(String.format("Electronic-Book: %s (isbn:isbn %s), published on %tF authored by %s with %d pages and %d other titles.",getTitle(),getIsbn(),getPublicationDate(),getAuthor(),getNumPages(),getOtherTitles().length));
        output.append(result);
        return output.toString();
    }
}
