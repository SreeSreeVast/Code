package edu.ucdenver;

import edu.ucdenver.library.Library;

import java.time.LocalDate;

public class MyLibraryApp {
    public static void main(String[] args) {
        Library myLibrary = new Library("My Auraria Library");
        System.out.println(">>>>>>>>>>>>>>>>>>");
        System.out.println(myLibrary);
        System.out.println("<<<<<<<<<<<<<<<<<<");

        try {
            myLibrary.addAuthor("John Grisham");
        }
        catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }

        try {
            myLibrary.addAuthor("David Baldacci");
        }
        catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }

        try {
            myLibrary.addAuthor("John Grisham");
        }
        catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }

        System.out.println(">>>>>>>>>>>>>>>>>>");
        System.out.println(myLibrary);
        System.out.println("<<<<<<<<<<<<<<<<<<");

        try{
            String[] titles = {"The Guardians: A Novel","Guardians","Guardianes"};
            myLibrary.addEBook("The Guardians", LocalDate.of(2019,10,15),titles,"John Grisham","970-120",120 ,2);
        }catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }

        try{
            String[] titles = {"b1","book 1","the title of book 1"};
            myLibrary.addEBook("Book 1", LocalDate.of(2000,1,1),titles,"Al. Baker","190-120" ,240,10);
        }catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }

        try{
            String[] titles = {"Camino Winds","Winds","The last one"};
            myLibrary.addPrintedBook("Camino Winds", LocalDate.of(2020,4,28),titles,"John Grisham","121-300",120 );
        }catch (IllegalArgumentException ie){ System.out.println("ERROR:"+ie); }
        System.out.println(">>>>>>>>>>>>>>>>>>");
        System.out.println(myLibrary);
        System.out.println("<<<<<<<<<<<<<<<<<<");
    }
}
