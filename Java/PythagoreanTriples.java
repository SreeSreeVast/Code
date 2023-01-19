import java.util.Scanner;

public class PythagoreanTriples
{
    public boolean isTriple(int i, int j, int k)
    {
        if ((i*i)+(j*j)==(k*k)) {
            //System.out.println("True");
            return true;
        }
        else {
            //System.out.println("False");
            return false;
        }
    }
    public String listOfTriples(int aMin, int bMin, int cMin, int aMax, int bMax, int cMax)
    {
        String end="";
        for(int i=aMin;i<=aMax;i++)
        {
            for(int j=bMin;j<=bMax;j++)
            {
                for(int k=cMin;k<=cMax;k++)
                {
                    if(isTriple(i,j,k))
                    {
                        end+=i+" "+j+" "+k+"\n";
                    }
                }
            }
        }
        return end;
    }
    public static void main (String [] args)
    {
        /*Scanner input = new Scanner(System.in);
        System.out.print("Input variable a: ");
        int a =input.nextInt();
        System.out.print("Input variable b: ");
        int b =input.nextInt();
        System.out.print("Input variable c: ");
        int c =input.nextInt();*/
        PythagoreanTriples p=new PythagoreanTriples();
        boolean v=p.isTriple(3,4,5);
        System.out.println(v+"\n");
        System.out.println("Listing Triples");
        String s=p.listOfTriples(1,2,3,100,10,20);
        System.out.print(s);
    }
}
