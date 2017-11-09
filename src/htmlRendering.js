import { getCommits, emailList } from './index';
import { repos, options } from './data';

export const startButton = () => {
    let button = document.createElement("button");
    button.innerHTML = "Start!";
    button.onclick = () => getCommits();
    return button;
}


export const baseList = () => {
    let element = document.createElement("div");
    element.id = "mainDiv";
    let list = document.createElement("ul");
    list.id = "mainList";
    let sortedList = emailList.sort(function (a, b) { return b.score - a.score });
    for (let email in sortedList) {
        let single = document.createElement("li");
        single.id = email;
        single.innerHTML = "email: " + sortedList[email].email + " // score: " + sortedList[email].score;
        list.appendChild(single);
    }
    element.appendChild(list);
    document.body.appendChild(element);

    return element;
}

const waitingDiv = () => {
    let waiting = document.createElement("h1");
    waiting.innerHTML = "";
    waiting.id = "waitingDiv";
    document.body.appendChild(waiting);
    return waiting;
}

const dropdown = () => {
    let dropdownMenu = document.createElement("select");
    dropdownMenu.id = "dropdownMenu";
    for (let i = 0; i < options.length; i++) {
        let dropdownOption = document.createElement("option");
        if (i == 0) {
            dropdownOption.selected = "selected";
        }
        dropdownOption.value = options[i];
        dropdownOption.innerHTML = options[i];
        dropdownMenu.appendChild(dropdownOption);
    }
    return dropdownMenu;
}


document.body.appendChild(dropdown());
document.body.appendChild(startButton());
document.body.appendChild(waitingDiv());
