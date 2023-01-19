public class DiamondPrinting {
    public String getCharSequence(String s, int n)
    {
        String line="";
        for(int i=0;i<n;i++)
        {
            line+=s;
        }
        return line;
    }
    public String getDiamond(int a)
    {
        int min=1;
        int max=99;
        String line="";
        if (a%2==0)
        {
            return "";
        }
        if(a<min||a>max)
        {
            return "";
        }
        for(int i=1;i<=a/2;i++)
        {
            for(int j=0;j<=(a/2)-i;j++)
            {
                line+=" ";
            }
            line+=getCharSequence("*",min)+"\n";
            min+=2;
        }
        line+=getCharSequence("*",min)+"\n";
        min-=2;
        for(int i=a/2;i>=1;i--)
        {
            for(int j=0;j<=(a/2)-i;j++)
            {
                line+=" ";
            }
            line+=getCharSequence("*",min)+"\n";
            min-=2;
        }
        return line;
    }
    public static void main (String [] args)
    {
        DiamondPrinting d=new DiamondPrinting();
        String s=d.getCharSequence("a",5);
        System.out.println(s);
        String s2=d.getDiamond(5);
        System.out.println(s2);
    }
}
