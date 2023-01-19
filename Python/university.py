from student import Student,Graduate,UnderGrad
from course import Course
class University:
    name=str
    def __init__(self,name):
        self.name=name
        self.student_list= []
        self.course_list= []



    def __str__(self):
        s=self.name+" University with "+str(len(self.student_list))+" students and "+str(len(self.course_list))+" courses."
        return s


    def add_undergrad(self,name,email,gpa):
        self.student_list.append(UnderGrad(name,email,gpa))


    def add_graduate(self, name, email, level):
        self.student_list.append(Graduate(name,email,level))


    def add_course(self,subject,number,title):
        for i in self.course_list:
            if i==Course(subject,number,title):
                return
        self.course_list.append(Course(subject,number,title))


    def remove_student(self,name):
        for i in range (0,len(self.student_list)):
            if name==self.student_list[i].name:
                return self.student_list.remove(name)


    def get_students(self,name="",id="",email=""):
        name_list=[]
        id_list=[]
        email_list=[]
        complete_list=[]
        if name=="" and id==0 and email=="":
            return self.student_list
        if name != "":
            for i in range (0,len(self.student_list)):
                if self.student_list[i].name == name:
                    name_list.append(name)
        if id != "":
            for i in range (0,len(self.student_list)):
                if self.student_list[i].id == id:
                    id_list.append(id)
        if email != "":
            for i in range (0,len(self.student_list)):
                if self.student_list[i].email == email:
                    email_list.append(email)
        complete_list.append(name_list)
        complete_list.append(id_list)
        complete_list.append(email_list)
        return complete_list


    def get_courses(self,subject="",number=0,title=""):
        subject_list=[]
        number_list = []
        title_list = []
        complete_list=[]
        if subject=="" and number==0 and title=="":
            return self.course_list
        if subject!="":
            for i in range (0,len(self.course_list)):
                if self.course_list[i].subject==subject:
                    subject_list.append(subject)
        if number!=0:
            for i in range (0,len(self.course_list)):
                if self.course_list[i].number == number:
                    number_list.append(number)
        if title!="":
            for i in range (0,len(self.course_list)):
                if self.course_list[i].title==title:
                    title_list.append(title)
        complete_list.append(subject_list)
        complete_list.append(number_list)
        complete_list.append(title_list)
        return complete_list


    def enroll_student(self,id,subject,number):
        for i in range (0,len(self.course_list)):
            if self.course_list[i].id==id and self.course_list[i].subject==subject and self.course_list[i].number==number:
                self.student_list[i].enroll_to(self.course_list[i])

    def enrollment_report(self):
        for i in range(0, len(self.student_list)):
            for j in self.course_list:
                thisdict={j:self.get_courses(self.course_list[j].subject)}

