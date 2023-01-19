from student import Student, Graduate, UnderGrad
from course import Course
from university import University

s=Student
s("John Smith","000000","sup")
print(s)

c=Course
c("CSCI",3920,"title")
print(c)

count=0
for i in range (0,5):
    count+=1
    print(count)

