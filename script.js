// ======================================
// LINK SPREADSHEET & DATA STUDIO
// ======================================

// GANTI dengan link Google Spreadsheet kamu
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/";

// GANTI dengan link Google Data Studio kamu
const DATA_STUDIO_URL = "https://lookerstudio.google.com/";


function openSpreadsheet() {
    window.open(SPREADSHEET_URL, "_blank");
}


function openDataStudio() {
    window.open(DATA_STUDIO_URL, "_blank");
}


// ======================================
// SAKLAR
// ======================================

let switch1State = false;
let switch2State = false;


function toggleSwitch(number) {

    if (number === 1) {

        switch1State = !switch1State;

        const sw = document.getElementById("switch1");
        const status = document.getElementById("status1");

        if (switch1State) {

            sw.classList.add("active");
            status.innerText = "JALAN";

        } else {

            sw.classList.remove("active");
            status.innerText = "STOP";
        }
    }


    if (number === 2) {

        switch2State = !switch2State;

        const sw = document.getElementById("switch2");
        const status = document.getElementById("status2");

        if (switch2State) {

            sw.classList.add("active");
            status.innerText = "MENGUKUR";

        } else {

            sw.classList.remove("active");
            status.innerText = "SELESAI";
        }
    }
}


// ======================================
// TOMBOL RC
// ======================================

function control(command) {

    document.getElementById("command").innerText = command;

    console.log("Perintah:", command);


    if (command === "STOP") {

        document.getElementById("systemStatus").innerText = "STOP";

    } else if (command === "RTB") {

        document.getElementById("systemStatus").innerText = "RTB";

    } else {

        document.getElementById("systemStatus").innerText = "RUNNING";
    }
}


// ======================================
// DATA CONTOH
// NANTI AKAN DIGANTI DATA ESP32
// ======================================

function updateSensorData() {

    // Contoh data
    document.getElementById("usv").innerText = "0.08";

    document.getElementById("cpm").innerText = "25";

    document.getElementById("longitude").innerText = "105.000000";

    document.getElementById("latitude").innerText = "-5.000000";
}


updateSensorData();