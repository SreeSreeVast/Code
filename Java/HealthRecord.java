import java.util.Calendar;

public class HealthRecord {
    private String firstName,lastName;
    private char gender;
    private int month,day,birthYear,height,weight;

    public HealthRecord(String firstName, String lastName, char gender, int month, int day, int birthYear,int height, int weight)
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.month=month;
        this.day=day;
        this.birthYear=birthYear;
        this.height=height;
        this.weight=weight;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
    public int getDobDay(){
        return day;
    }
    public int getDobMonth(){
        return month;
    }
    public int getDobYear(){
        return birthYear;
    }
    public void setDOB(int day, int month, int birthYear)
    {
        this.day=day;
        this.month=month;
        this.birthYear=birthYear;
    }
    public int getAge(){
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        return currentYear-this.birthYear;
    }
    public int getMaximumHeartRate(){
        return 220-this.getAge();
    }
    public String getTargetHeartRate(){
        return String.format("%d - %d", (int)(this.getMaximumHeartRate()* 0.5),(int)(this.getMaximumHeartRate()*0.85));
    }
    public double getBMI(){
        return 703 * this.weight / Math.pow(this.height, 2);

    }
    public String toString() {

        return String.format("Name:%s, %s. Gender:%c DOB:%02d/%02d/%d AGE:%3d H:%3din. W:%3dlb., MHR:%3d, THR:%s, BMI:%.2f",this.lastName, this.firstName, this.gender, this.day, this.month, this.birthYear, this.getAge(), this.height, this.weight, this.getMaximumHeartRate(), this.getTargetHeartRate(), this.getBMI());
    }
    public static void main (String [] args)
    {
        HealthRecord hr;
        hr = new HealthRecord("John","Doe",'M', 1,3,1990,70,180);
        System.out.println(hr);
        hr = new HealthRecord("Jane","Doe",'F', 20,5,1995,60,150);
        System.out.println(hr);
    }
}
