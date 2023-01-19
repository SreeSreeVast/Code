package edu.ucdenver.library;

import java.time.LocalDate;
import java.util.ArrayList;

public class Library {
    private String name;
    private ArrayList<Author> listOfAuthors;
    private ArrayList<Book> listOfBooks;

    public Library(String name) {
        this.name = name;
        this.listOfAuthors = new ArrayList<>();
        this.listOfBooks = new ArrayList<>();
    }

    public void addPrintedBook(String title, LocalDate publicationDate, String[] otherTitles, String authorName,String isbn, int numPages) {
        if(getAuthor(authorName).equals(authorName)) {
            Book printBook = new PrintedBook(title, publicationDate, otherTitles, new Author(authorName),isbn, numPages);
            listOfBooks.add(printBook);
        }
        else
        {
            throw new IllegalArgumentException();
        }
    }

    public void addEBook(String title, LocalDate publicationDate, String[] otherTitles, String authorName,String isbn, int numOfWords, int wordsPerPage) {
        if(getAuthor(authorName).equals(authorName)) {
            Book electronicBook = new EBook(title, publicationDate, otherTitles, new Author(authorName),isbn, numOfWords, wordsPerPage);
            listOfBooks.add(electronicBook);
        }
        else
        {
            throw new IllegalArgumentException();
        }
    }

    public String printBooks() {
        StringBuilder output = new StringBuilder();
        for (Book book:listOfBooks) {
            if (book instanceof PrintedBook) {
                PrintedBook printBook = (PrintedBook) book;
                output.append(printBook.toString());
            } else {
                EBook elecbook = (EBook) book;
                output.append(elecbook.toString());
            }
            output.append("\n");
        }
        System.out.println(output.toString());
        return output.toString();
    }
    public void addAuthor(String authorName){
        for(int i=0;i<listOfAuthors.size();i++)
        {
            if(listOfAuthors.get(i).getName()==authorName)
            {
                throw new IllegalArgumentException();
            }
        }
        Author newAuthor=new Author(authorName);
        listOfAuthors.add(newAuthor);
    }
    public String getAuthor(String authorName) {
        String output="";
        for(int i=0;i<listOfAuthors.size();i++)
        {
            if(listOfAuthors.get(i).getName().equals(authorName))
            {
                output=authorName;
            }
        }
        if (output.equals(authorName)){
            return output;
        }
        else{
            throw new IllegalArgumentException();
        }
    }
    public String getName() {
        return name;
    }
    @Override
    public String toString(){
        StringBuilder output=new StringBuilder();
        System.out.printf("This is the %s library.\n",this.getName());
        output.append("== Author ==\n");
        for(Author anAuthor:listOfAuthors){
            output.append(anAuthor + "\n");
        }
        output.append("== Book ==\n");
        for(Book aBook:listOfBooks){
            output.append(aBook+"\n");
        }
        output.append("--o--");
        return output.toString();
    }
}

