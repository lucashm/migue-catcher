import axios from 'axios';
import {consoleForm, startButton, baseList} from './htmlRendering';
import {studentsList, repos} from './data';

let pageCounter = 1;
let repoCounter = "";

export const getCommits = () => {
    let waiting = document.getElementById("waitingDiv");
    waiting.innerHTML = "Carregando...";
    const callback = (response) => {
        if (response.data.length === 0) {
            waiting.innerHTML = "Carregado com sucesso!";
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
            callback(response);
        })
        .catch(function (error) {
            waiting.innerHTML = "Houve um problema, verifique sua conexão...";
        });
}


const updateList = () => {
    let list = document.getElementById("mainList");
    let sortedStudentsList = studentsList.sort(function (a, b) { return b.score - a.score });
    // console.log(sortedStudentsList);
    for (let student in sortedStudentsList) {
        let single = document.getElementById(student);
        single.innerHTML = sortedStudentsList[student].userName
            + " - " + sortedStudentsList[student].score;
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

// window.onload = getCommits();


