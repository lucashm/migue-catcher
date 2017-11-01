import axios from 'axios';


let studentsList = [
    //merenda+
    // {
    //     userName: "gabrielademoraes",
    //     score: 0,
    //     email: "gabrielademoraes10@gmail.com"
    // },
    {
        userName: "kahcosta",
        score: 0,
        email: "kamillacosta.unb@gmail.com"

    },
    {
        userName: "lucaslermen",
        score: 0,
        email: "lucas.arthur.lermen@gmail.com"
    },
    {
        userName: "lucaspenido",
        score: 0,
        email: "lpenidoa@me.com"
    },
    {
        userName: "mlfaa",
        score: 0,
        email: "mlfaa@hotmail.com"
    },
    {
        userName: "miguel-alves",
        score: 0,
        email: "miguelhenriquealvesdeoliveira@gmail.com"
    }
]

let pageCounter = 1;
let repoCounter = "";
let repos = [
    "fga-gpp-mds/2017.2-MerendaMais/commits"
]

const getCommits = () => {
    const callback = (response) => {
        if (response.data.length === 0) {
            updateList();
        } else {
            pageCounter++;
            filterMessages(response);
            getInfo(callback, pageCounter, repoCounter);
        }
    }
    for (let repo in repos) {
        repoCounter = repos[repo];
        getInfo(callback, pageCounter, repoCounter);
    }
}

const getInfo = (callback, pageNumber, repo) => {
    axios.get(`https://api.github.com/repos/${repo}?page=${pageNumber}`)
        .then(function (response) {
            callback(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}


const updateList = () => {
    let list = document.getElementById("mainList");
    let sortedStudentsList = studentsList.sort(function (a, b) { return b.score - a.score });
    // console.log(sortedStudentsList);
    for (let student in sortedStudentsList) {
        let single = document.getElementById(student);
        single.innerHTML = sortedStudentsList[student].userName
            + " - " + sortedStudentsList[student].score + " signed-off's";
    }
}

const filterMessages = (response) => {

    for (let i = 0; i < response.data.length; i++) {
        let commitMessage = response.data[i].commit.message;
        if (commitMessage.toLowerCase().includes("signed-off-by:")) {
            let count = 0;
            let hasFound = false;
            for (let k = 0; k < commitMessage.length; k++) {
                if (commitMessage[k] == "<") {
                    count = k + 1;
                    let otherCount = count;
                    while (commitMessage[otherCount] != ">") {
                        otherCount++;
                    }
                    let signedEmail = commitMessage.substring(count, otherCount);
                    for (let j = 0; j < studentsList.length; j++) {
                        if (studentsList[j].email.toString().toLowerCase() == signedEmail.toString().toLowerCase()) {
                            studentsList[j].score++;
                        }
                    }
                }
            }

        }
    }

}


const startButton = () => {
    let button = document.createElement("button")
    button.innerHTML = "Start!";
    button.onclick = () => getCommits();
    return button;
}

const baseList = () => {
    let element = document.createElement("div");
    let list = document.createElement("ul");
    list.id = "mainList";
    for (let student in studentsList) {
        let single = document.createElement("li");
        single.id = student;
        single.innerHTML = studentsList[student].userName
            + " - " + studentsList[student].score + " signed-off's";
        list.appendChild(single);
    }
    element.appendChild(list);
    document.body.appendChild(element);

    return element;
}

const consoleForm = () => {
    let form = document.createElement("div");
    let username = document.createElement("input");
    username.id = "username";
    username.placeholder = "username";
    let email = document.createElement("input");
    email.id = "email";
    email.placeholder = "email";
    let btn = document.createElement("button");
    btn.innerHTML = "send!";
    btn.onclick = () => newRegister(username.value, email.value);

    form.appendChild(username);
    form.appendChild(email);
    form.appendChild(btn);

    return form;
}

const newRegister = (username, email) => {
    let toAppend = {
        userName: username,
        score: 0,
        email: email
    }

    addOne(toAppend);
}

const addOne = (toAppend) => {
    studentsList.push(toAppend);
    let list = document.getElementById("mainList");
    let newElement = document.createElement("li");
    newElement.id = studentsList.length - 1;
    newElement.innerHTML = toAppend.userName
        + " - " + toAppend.score + " signed-off's";
    list.appendChild(newElement);
}

document.body.appendChild(startButton());
document.body.appendChild(baseList());
document.body.appendChild(consoleForm());
// window.onload = getCommits();


