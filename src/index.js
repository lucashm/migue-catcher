import axios from 'axios';
import { baseList } from './htmlRendering';
import { repos, mdsMembers } from './data';

let actualOption = "";
let pageCounter = 1;
let waiting = document.getElementById("waitingDiv");
let repoCounter = 0;
export let emailList = [];
let toUpdate = {};

function search(key) {
    for (let i = 0; i < emailList.length; i++) {
        if (emailList[i].email === key.toLowerCase()) {
            toUpdate = emailList[i];
            return true;
        }
    }
    return false;
}


export const getCommits = () => {
    emailList = [];
    if (document.getElementById("mainDiv") != null) {
        let parent = document.getElementById("mainDiv");
        document.body.removeChild(parent);
    }


    let e = document.getElementById("dropdownMenu");
    actualOption = e.options[e.selectedIndex].value;

    waiting.innerHTML = "Carregando...";
    const callback = (response, repoCounter) => {
        if (response.data.length === 0) {
            repoCounter++;
            if (repoCounter < repos.length) {
                pageCounter = 1;
                getInfo(callback, pageCounter, (repoCounter));
                console.log(repos[repoCounter]);
                console.log(emailList);
            } else {
                console.log(emailList);
                waiting.innerHTML = "Carregado com sucesso!";
                baseList();
            }
        } else {
            pageCounter++;
            filterMessages(response);
            getInfo(callback, pageCounter, repoCounter);
        }
    }

    const singleCallback = (response) => {
        if (response.data.length === 0) {
            console.log("FIM");
            console.log(emailList);
            pageCounter = 1;
            waiting.innerHTML = "Carregado com sucesso!";
            baseList();
        } else {
            pageCounter++;
            filterMessages(response);
            getSingleInfo(singleCallback, pageCounter);
        }
    }

    if (actualOption === "Todos os repositórios") {
        getInfo(callback, pageCounter, 0);
    } else {
        getSingleInfo(singleCallback, pageCounter);
    }


}

const getSingleInfo = (singleCallback, pageNumber) => {
    axios.get(`https://api.github.com/repos/${actualOption}/commits?page=${pageNumber}`)
        .then(function (response) {
            // console.log(response);
            singleCallback(response);
        })
        .catch(function (error) {
            console.log("deu ruim");
        });
}


const getInfo = (callback, pageNumber, repoCounter) => {
    axios.get(`https://api.github.com/repos/${repos[repoCounter]}/commits?page=${pageNumber}`)
        .then(function (response) {
            // console.log(response);
            callback(response, repoCounter);
        })
        .catch(function (error) {
            console.log("deu ruim");
        });
}




const filterMessages = (response) => {

    for (let i = 0; i < response.data.length; i++) {
        let commitMessage = response.data[i].commit.message;
        if (commitMessage.toLowerCase().includes("signed-off-by:")) {
            let count = 0;
            let res = commitMessage.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            // console.log(res);
            let signedEmail = "";
            for (let z = 0; z < res.length; z++) {
                signedEmail = res[z];
                if (!search(signedEmail)) {
                    emailList.push({
                        email: signedEmail,
                        score: 1
                    });
                } else {
                    toUpdate.score++;
                }
            }
        }
    }
}




// window.onload = getCommits();


