package edu.ucdenver.library;

public class Author {
    private String name;

    Author(String name){
        this.name=name;
    }
    public String getName() {
        return name;
    }
    @Override
    public String toString(){
        return this.getName()+" (Author)";
    }
}
