package edu.ucdenver.library;

import java.time.LocalDate;

public class Book {
    /** TODO:        Declare the instance attributes for the book.
     * Follow the software engineering practices discussed in our videos.
     * Review the provided uml to identify data types.
     * - title
     * - publication date
     * - other titles
     * - number of pages.
     * - author.
     */

    private String title;
    private LocalDate publicationDate;
    private String[] otherTitle;
    private int numPages;
    private Author author;
    //private String s;
    public Book(String title, LocalDate publicationDate, String[] otherTitle, Author author, int numPages){
        this.title = title;
        this.publicationDate = publicationDate;
        this.otherTitle = otherTitle;
        this.author = author;
        this.numPages = numPages;
    }

    public String toString(){
        /** Todo: Book toString()
         * The string representing the book should look like:
         Book: [name], with [#pages] pages published on [YYYY-MM-DD] written by [Author].
         ---a.k.a:[first other title]
         ---a.k.a:[second other title]
         ---a.k.a:[so on so forth]
         *See example on Canvas
         **/
        StringBuilder result = new StringBuilder();
        String newResult = String.format("Book: %s, with %d, pages published on %s written by %s.\n ", title, numPages,publicationDate.toString(),author.getName());
        result.append(newResult);
        for(int i=0; i<otherTitle.length; i++){
            String newTitle = String.format("a.k.a %s",otherTitle[i]);
            result.append(newTitle);
        }
        return result.toString();
        // Hint generate a string and concatenate. You can also use StringBuilder if you want to.
    }

    /*: Add getters/setters accordingly to the UML class diagram */

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

    public String[] getOtherTitle() {
        return otherTitle;
    }

    public void setOtherTitle(String[] otherTitle) {
        this.otherTitle = otherTitle;
    }

    public int getNumPages() {
        return numPages;
    }

    public void setNumPages(int numPages) {
        this.numPages = numPages;
    }


}
