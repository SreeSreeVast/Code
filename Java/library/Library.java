package edu.ucdenver.library;
import java.time.LocalDate;
import java.util.ArrayList;

public class Library {
    /*        Declare the instance attributes for the Library.
     * Follow the software engineering practices discussed in our videos.
     * Review the provided uml to identify data types.
     * - library name
     * - list of books
     * - list of authors
     *
     * Hint: use ArrayList for lists.
     */
    private String name;
    private ArrayList<Book> listB;
    private ArrayList<Author> listA; // listAuthors // authors
    public Library(/*: The constructor should receive all the data to create the Library. */String name){
        //Remember to creat the list objects here!! (not in the declaration above).
        this.name=name;
        this.listB = new ArrayList<>();
        this.listA = new ArrayList<>() ;
        //Book [] listB;
        //Author [] listA;
    }

    public void addBook(String title, LocalDate publicationDate, String [] otherTitles,String authorName, int numbPages){
     //: observe this line. It's notifying clients that this method may throw an exception. (no code needed)
        /*:
         *   Search to retrieve the author object based on the name.
         *      Basically for each author compare the name. remember to use str1.equals(str2) to compare strings.
         *      If found, use keep it and terminate the search.
         *   If the author doesn't exist, throw a IllegalArgumentException notifiying that.
         *
         *   Create the book object using the book constructor.
         *   add the book to the list.
         *
         *   NOTE: object (reference) variables should be initialized with null. and you can ask if var == null
          */
        Author author=null;
        for (int i=0;i<listA.size();i++)
        {
            if(listA.get(i).getName()==authorName) {
                //System.out.println("The Author already exits.");
                author = listA.get(i);
            }
        }
        if (author != null){
            Book b=new Book(title,publicationDate,otherTitles,author,numbPages);
            listB.add(b);
        }
        else{
            throw new IllegalArgumentException("The author does not exist.");
        }
    }

    public void addAuthor(String name){
        /*:
         * Search to check if an author with that name exists.
         *   If the author exists, throw a IllegalArgumentException notifiying that.
         *   Look the previous method for inspiration.
         *
         *   Create the author object using it's constructor.
         *   add the author to the list.
         */
        for (int i=0;i<listA.size();i++)
        {
            if(listA.get(i).getName()==name)
            {System.out.println("The author already exists");}
        }
        Author a=new Author(name);
        listA.add(a);
    }

    public String toString(){
        /*: Library toString()
         * The string representing the book should look like:
                                 This is the [name] library.
                                 == Author List =
                                 [print each author, one per line - add new line after each author]
                                 == Author List =
                                 [print each book, one per line- add new line after each book]
                                 --o--
         * See example on Canvas
         **/
        // Hint generate a string and concatenate. You can also use StringBuilder if you want to. Return that string.
        StringBuilder r=new StringBuilder();
        System.out.printf("This is the %s library.",getName());
        System.out.println("== Author List =");
        for (int i=0;i<listA.size();i++)
        {
            System.out.println(listA.get(i));
        }
        System.out.println("== Author List =");
        for (int i=0;i<listB.size();i++)
        {
            System.out.println(listB.get(i));
        }
        System.out.println("--o--");
        return "";
    }

    // Getter for the library name.

    public String getName() {
        return name;
    }
}
