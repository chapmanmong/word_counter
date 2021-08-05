const wordCounter = document.querySelector("#wordCounter");
const charCounter = document.querySelector("#charCounter");
const charWSpaceCounter = document.querySelector("#charWSpaceCounter");
const textArea = document.querySelector("#textArea");
const calcButton = document.querySelector("#calcBtn");
const clearButton = document.querySelector("#clearBtn")
const frequencyDiv = document.querySelector("#frequencyDiv");
//const input = document.querySelector("input[type]='file'");
var dict;
var keys;

calcButton.addEventListener("click", countWords);

clearButton.addEventListener("click", () => {
    textArea.value = "";
    input.value = "";
    frequencyDiv.innerHTML = "";
    wordCounter.textContent = "";
    charCounter.textContent = "";
    charWSpaceCounter.textContent = "";
})

input.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function () {
        textArea.textContent = reader.result;
    };
    reader.readAsText(input.files[0]);
})

function countWords() {
    var str = textArea.value;
    var potentialWords = str.split(/\W+/);
    var words = [];
     keys = [];

    for (i = 0; i < potentialWords.length; i++) {
        if (potentialWords[i].match(/[a-zA-Z]+/)) {
            //console.log(potentialWords[i]);
            words.push(potentialWords[i]);
        }
    }

    wordCounter.textContent = words.length;
    charCounter.textContent = str.match(/\S/g).length;
    charWSpaceCounter.textContent = str.match(/./g).length;

    dict = {};
    for (var i = 0; i < words.length; i++) {
        var word = words[i].toLowerCase();
        if (dict[word] == null) {
            dict[word] = 1;
            keys.push(word);
        } else {
            dict[word]++;
        }
    }
    keys.sort(compare);
    frequencyDiv.innerHTML = "";
    var end;
    if (keys.length > 25) { end = 25 }
    else { end = keys.length }
    for (var i = 0; i < end; i++) {
        var elem = document.createElement("div");
        elem.innerHTML = keys[i] + ": " + dict[keys[i]];
        frequencyDiv.append(elem);
    }
    chartIt();
}

function compare(a, b) {
    var countA = dict[a];
    var countB = dict[b];
    return countB - countA;
}

function chartIt(){
    var yvalues = [];
    for(i=0; i<keys.length; i++){
        yvalues.push(dict[keys[i]]);
        console.log(yvalues);
    }
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keys.slice(0, 15),
            datasets: [{
                label: 'Word Frequency',
                data: yvalues.slice(0, 15),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}