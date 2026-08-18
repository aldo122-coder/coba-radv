// ==========================================
// MQTT CONFIGURATION
// ==========================================

const MQTT_HOST =
    "68417029aa9e4dffb745d0d102bef6be.s1.eu.hivemq.cloud";

const MQTT_PORT = 8884;

const MQTT_USERNAME = "radv";

// JANGAN kirim password MQTT kamu ke saya
const MQTT_PASSWORD = "122130148";

const CONTROL_TOPIC = "rc/control";


// ==========================================
// MQTT CONNECTION
// ==========================================

const mqttURL = `wss://${MQTT_HOST}:${MQTT_PORT}/mqtt`;

const mqttOptions = {
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,

    connectTimeout: 5000,

    reconnectPeriod: 3000,

    clean: true
};


let mqttClient;


// ==========================================
// CONNECT
// ==========================================

function connectMQTT() {

    console.log("Menghubungkan ke MQTT...");

    mqttClient = mqtt.connect(mqttURL, mqttOptions);


    mqttClient.on("connect", function () {

        console.log("MQTT Connected");

        document.getElementById("systemStatus").innerText =
            "MQTT ONLINE";

    });


    mqttClient.on("reconnect", function () {

        console.log("MQTT reconnect...");

        document.getElementById("systemStatus").innerText =
            "RECONNECTING";

    });


    mqttClient.on("error", function (error) {

        console.error("MQTT Error:", error);

        document.getElementById("systemStatus").innerText =
            "MQTT ERROR";

    });


    mqttClient.on("close", function () {

        console.log("MQTT Disconnected");

        document.getElementById("systemStatus").innerText =
            "MQTT OFFLINE";

    });
}


// ==========================================
// SEND COMMAND
// ==========================================

function control(command) {

    console.log("Perintah:", command);


    // Tampilkan di dashboard
    document.getElementById("command").innerText = command;


    // Cek koneksi
    if (!mqttClient || !mqttClient.connected) {

        console.log("MQTT belum terhubung");

        document.getElementById("systemStatus").innerText =
            "MQTT OFFLINE";

        return;
    }


    // Kirim MQTT
    mqttClient.publish(
        CONTROL_TOPIC,
        command,
        {
            qos: 0,
            retain: false
        },
        function (error) {

            if (error) {

                console.error(
                    "Gagal mengirim:",
                    error
                );

            } else {

                console.log(
                    "Terkirim:",
                    CONTROL_TOPIC,
                    command
                );
            }
        }
    );


    // Status dashboard

    if (command === "STOP") {

        document.getElementById("systemStatus").innerText =
            "STOP";

    }

    else if (command === "RTB") {

        document.getElementById("systemStatus").innerText =
            "RTB";

    }

    else {

        document.getElementById("systemStatus").innerText =
            "RUNNING";

    }
}


// ==========================================
// SWITCH
// ==========================================

let switch1State = false;
let switch2State = false;


function toggleSwitch(number) {

    if (number === 1) {

        switch1State = !switch1State;

        const sw =
            document.getElementById("switch1");

        const status =
            document.getElementById("status1");


        if (switch1State) {

            sw.classList.add("active");

            status.innerText = "JALAN";

            sendMQTT("rc/switch1", "JALAN");

        }

        else {

            sw.classList.remove("active");

            status.innerText = "STOP";

            sendMQTT("rc/switch1", "STOP");

        }
    }


    if (number === 2) {

        switch2State = !switch2State;

        const sw =
            document.getElementById("switch2");

        const status =
            document.getElementById("status2");


        if (switch2State) {

            sw.classList.add("active");

            status.innerText = "MENGUKUR";

            sendMQTT("rc/switch2", "MENGUKUR");

        }

        else {

            sw.classList.remove("active");

            status.innerText = "SELESAI";

            sendMQTT("rc/switch2", "SELESAI");

        }
    }
}


// ==========================================
// GENERIC MQTT SEND
// ==========================================

function sendMQTT(topic, message) {

    if (!mqttClient || !mqttClient.connected) {

        console.log("MQTT belum terhubung");

        return;
    }


    mqttClient.publish(
        topic,
        message,
        {
            qos: 0,
            retain: false
        }
    );


    console.log(
        "MQTT:",
        topic,
        "=>",
        message
    );
}


// ==========================================
// SENSOR DATA SEMENTARA
// ==========================================

function updateSensorData() {

    document.getElementById("usv").innerText =
        "0.08";

    document.getElementById("cpm").innerText =
        "25";

    document.getElementById("longitude").innerText =
        "105.000000";

    document.getElementById("latitude").innerText =
        "-5.000000";
}


// ==========================================
// START
// ==========================================

updateSensorData();

connectMQTT();