class Course:
    subject="CSCI"
    number=int
    title="3920"
    def __init__(self,subject,number,title):
        self._subject=subject
        self._number=number
        self._title=title

    @property
    def title(self):
        return self._title

    @property
    def number(self):
        return self._number

    @property
    def subject(self):
        return self._subject



    def __str__(self):
        s= f"{self.subject}:{self.number}"
        return s


