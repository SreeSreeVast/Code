from course import Course

class Student:
    name="John Smith"
    id="000000"
    email=str
    def __init__(self,name,id,email):
        self._name=name
        #self._id=id
        self._id = '%010d' % (int(self._id)+1)
        if "@ucdenver.edu" in str(email):
            self._email=email.lower()
        else:
            self._email=email
        self.enrolled_to=[]

    @property
    def name(self):
        self._name

    @property
    def email(self):
        self._email

    @property
    def id(self):
        self._id

    @staticmethod
    def reset_id_numbering():
        Student._id = "000001"
        
        
    def get_standing(self):
        return "Student"
    
    
    def enroll_to(self,Course):
        self.enrolled_to.append(Course)
        
        
    def __str__(self):
        self.standing = self.get_standing()
        s= f"{self._name:20} - {self.id:^10} - {self.email:50} - Standing: {self.standing}"
        return s
    
    
class UnderGrad(Student):
    gpa=0.0
    def __init__(self,name,email,gpa):
        super().__init__(name,Student._id,email)
        #self.name=name
        #self.email=email
        #self.enrolled = []
        if gpa<0.0 and gpa>4.0:
            raise ValueError
        else:
            self.gpa=gpa
        
        
    def get_standing(self):
        return "Undergraduate"
    
    
    def enroll_to(self,Course):
        self.enrolled_to.append(Course)
        
        
    def __str__(self):
        self.standing = self.get_standing()
        s=f"{self.name:20} - {self.id:^10} - {self.email:50} - Standing: {self.standing}"
        return s
    
    
class Graduate(Student):
    current_level="Master"
    def __init__(self,name,email,current_level):
        super().__init__(name,Student.id,email)
        #self.name = name
        #self.email = email
        self.current_level = current_level
        #self.enrolled = []


    def get_standing(self):
        return self.current_level


    def enroll_to(self,Course):
        self.enrolled_to.append(Course)


    def __str__(self):
        self.standing = self.get_standing()
        s= f"{self.name:20} - {self.id:^10} - {self.email:50} - Standing: {self.standing}"
        return s

