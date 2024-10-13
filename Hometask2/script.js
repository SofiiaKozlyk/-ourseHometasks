// task1
console.log("Task 1");
function addParamsToRequest(params) {
    let count = 0;
    return function(data){
        count++;
        return{
            ...params, 
            data: data,
            count: count - 1
        }
    }
}

const sendData = addParamsToRequest({'access-token': 'qwerty'});
const result = sendData({title: 'Text', description: 'Some text'});
console.log("First object", result);
const result2 = sendData({title: 'Text2', description: 'Some text2'});
console.log("Second object", result2);

// task2
console.log("Task 2");
const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`);
    }
};

const person = {
    name: 'Eve',
    age: 18
};

console.log("The result of the function using the call method");
obj.getData.call(person);
console.log("The result of the function using the bind method");
const newGetData = obj.getData.bind(person);
newGetData();
newGetData();

// task3
console.log("Task 3");
const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
 };
 
function findFileNames(root){
    let fileNames = [];

    function find(node){
        if(node.type === 'file'){
            fileNames.push(node.name);
        }
        else if(node.type === 'folder' && node.children){
            node.children.forEach(element => find(element));
        }
    }

    find(root);

    return fileNames;
}

const fileNames = findFileNames(root);
console.log(fileNames);

// task4
console.log("Task 4");
console.log("Implementation in ES5 format");
function PersonOldStyle(name, phone) {
    this.name = name;
    this.phone = phone;
}
PersonOldStyle.prototype.introduce = function() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

function StudentOldStyle(name, phone, course) {
    PersonOldStyle.call(this, name, phone);
    this.course = course;
}
StudentOldStyle.prototype = Object.create(PersonOldStyle.prototype);
StudentOldStyle.prototype.constructor = StudentOldStyle;
StudentOldStyle.prototype.study = function() {
    console.log(`Я навчаюся на ${this.course} курсі.`);
};

function TeacherOldStyle(name, phone, subject) {
    PersonOldStyle.call(this, name, phone);
    this.subject = subject;
}
TeacherOldStyle.prototype = Object.create(PersonOldStyle.prototype);
TeacherOldStyle.prototype.constructor = TeacherOldStyle;
TeacherOldStyle.prototype.teach = function() {
    console.log(`Я викладаю ${this.subject}.`);
};

console.log("Student: ");
const studentOldStyle = new StudentOldStyle("Софія", "0987654321", "3");
studentOldStyle.introduce();
studentOldStyle.study();
console.log("Teacher: ");
const teacherOldStyle = new TeacherOldStyle("Андрій", "1234567890", "математика");
teacherOldStyle.introduce();
teacherOldStyle.teach();

console.log("Implementation in ES6 format");
class Human{
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
    } 
}

class Student extends Human{
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this.course} курсі.`);
    }
}

class Teacher extends Human{
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this.subject}.`);
    }
}

console.log("Student: ");
const student = new Student("Софія", "0987654321", "3");
student.introduce();
student.study();
console.log("Teacher: ");
const teacher = new Teacher("Андрій", "1234567890", "математика");
teacher.introduce();
teacher.teach();