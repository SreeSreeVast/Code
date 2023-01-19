

def split_number(num):
    string=""
    for i in str(num):
        string+=str(i)+" "
    #print(string[:-1])
    return string[:-1]


def is_palindrome(num):
    reverse=str(num) [::-1]
    if reverse==str(num):
        #print(True)
        return True
    else:
        #print(False)
        return False

def compute_variance(*args):
    sum=0
    summation=0
    m=len(args)
    for value in args:
        sum+=value
    mean=sum/m
    for value in args:
        summation+=(value-mean)**2
    answ=(1/(m-1))*summation
    #print(answ)
    return answ


def compute_variance_req(*args):
    if len(args)>=2:
        sum=0
        summation=0
        m=len(args)
        for value in args:
            sum+=value
        mean=sum/m
        for value in args:
            summation+=(value-mean)**2
        answ=(1/(m-1))*summation
        #print(answ)
        return answ
    else:
        #print(0)
        return 0


def compute_change_few_coins(amount):
    cents=amount*100
    dollar=cents//100
    cents=cents%100
    quarter=cents//25
    cents=cents%25
    dime = cents // 10
    cents = cents % 10
    nickle = cents // 5
    cents = cents % 5
    penny = cents // 1
    cents = cents % 1
    return (int(dollar),int(quarter),int(dime),int(nickle),int(penny))


def binary_to_decimal(binary):
    conversion=int(binary,2)
    #print(conversion)
    return conversion


def factorial(num):
    if num<0:
        #print(0)
        return 0
    elif num==1 or num==0:
        #print(1)
        return 1
    else:
        fac=1
        for i in range (num):
            fac*=num
            num-=1
        #print(fac)
        return fac


def approx_pie(n):
   value = 4
   term = 0
   while term < n:
       term+=1
       if term%2 == 1:
           value-=4/(2*term + 1)
       else:
           value+=4/(2*term + 1)
   return value


def approx_e(n):
   value = 1
   term = 1
   while term < n:
       value+=1/(factorial(term))
       term+=1
   #print(value)
   return value





