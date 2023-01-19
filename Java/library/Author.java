package edu.ucdenver.library;

public class Author {
    //: declare the instance attribute name
    private String name;

    //: Implement the constructor that takes the name as argument
    public Author(String name)
    {
        this.name=name;
    }

    public String getName() {
        return name;
    }
    //Add the getter only for name.

    @Override
    public String toString(){
        // Should return "name (Author)"  where name is the author's name
        return String.format("Name ",getName());
    }
}
