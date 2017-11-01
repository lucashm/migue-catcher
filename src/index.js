import axios from 'axios';


let studentsList = [
    //merenda+
    {
        userName: "kahcosta",
        score: 0,
        name: "kamilla"
    },
    {
        userName: "gabrielademoraes",
        score: 0,
        name: "gabriela"
    },
    {
        userName: "lucaslermen",
        score: 0,
        name: "lucas lermen"
    },
    {
        userName: "lucaspenido",
        score: 0,
        name: "lucas penido"
    },
    {
        userName: "mlfaa",
        score: 0,
        name: "maria luiza"
    },
    {
        userName: "miguel-alves",
        score: 0,
        name: "miguel"
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
            createList();
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


const createList = () => {
    let element = document.createElement("div");
    let list = document.createElement("ul");
    let sortedStudentsList = studentsList.sort(function (a, b) { return b.score - a.score });
    // console.log(sortedStudentsList);
    for (let student in sortedStudentsList) {
        console.log(studentsList[student]);
        let single = document.createElement("li");
        single.innerHTML = sortedStudentsList[student].userName + " - " + sortedStudentsList[student].score;
        list.appendChild(single);
    }
    element.appendChild(list);
    document.body.appendChild(element);
}

const filterMessages = (response) => {

    for (let i = 0; i < response.data.length; i++) {
        let commitMessage = response.data[i].commit.message;
        if (commitMessage.toLowerCase().includes("signed-off-by:")) {
            let count = 0;
            let hasFound = false;
            for (let i = 0; i < commitMessage.length; i++) {
                if (commitMessage[i] == ":") {
                    count = i + 2;
                    let otherCount = count;
                    while (commitMessage[otherCount] != " ") {
                        otherCount++;
                    }
                    let signAuthor = commitMessage.substring(count, otherCount).toString().toLowerCase();
                    for (let i = 0; i < studentsList.length; i++) {
                        if (studentsList[i].userName === signAuthor || studentsList[i].name === signAuthor) {
                            studentsList[i].score++;
                            break;
                        }
                    }
                }
            }

        }
    }

}


window.onload = getCommits();
