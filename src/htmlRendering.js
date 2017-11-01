import {getCommits} from './index';
import {studentsList} from './data';

export const consoleForm = () => {
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

export const startButton = () => {
    let button = document.createElement("button")
    button.innerHTML = "Start!";
    button.onclick = () => getCommits();
    return button;
}

export const baseList = () => {
    let element = document.createElement("div");
    let list = document.createElement("ul");
    list.id = "mainList";
    for (let student in studentsList) {
        let single = document.createElement("li");
        single.id = student;
        single.innerHTML = studentsList[student].userName
            + " - " + studentsList[student].score;
        list.appendChild(single);
    }
    element.appendChild(list);
    document.body.appendChild(element);

    return element;
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

const waitingDiv = () => {
    let waiting = document.createElement("h1");
    waiting.innerHTML = "";
    waiting.id = "waitingDiv";
    document.body.appendChild(waiting);
    return waiting;
}

document.body.appendChild(startButton());
document.body.appendChild(baseList());
document.body.appendChild(consoleForm());
document.body.appendChild(waitingDiv());