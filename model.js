// valores iniciales
    let a = 0.5, b = 0.3, E = 1, S = 50, c = 70, C = 38.5;

// logica (clave)
    function P(t){
        let S_pr = S / 100;
        let c_pr = c / 100;

        return (-a*E - b*S_pr + c_pr)*t + C;
    }

// Logica (subclave)
    function math2() {
        let S_pr = S / 100;
        let c_pr = c / 100;

        return (-a*E - b*S_pr + c_pr);
    }

//Diseño color critico
    function setcolor() {
        let pendiente = math2();

        if (pendiente < 0) return "green";
        if (pendiente > 0) return "red";
        return "yellow";
    }

//Genera los datos de la grafica
    function Genedata() {
        let Star_age = 2025;
        let age = [];
        // let tiempos = [];
        let pobreza = [];

        for (let t = 0; t <= 20; t++) {
            age.push(Star_age + t);
            pobreza.push(P(t));
        }

        return { age, pobreza };
    }

//Grafica
    const ctx = document.getElementById('grafica').getContext('2d');
        let datos = Genedata();

        let chart = new Chart(ctx, {
            type: 'line',
            data:{
                labels: datos.age,
                    datasets: [{
                        label: 'N° Pobreza | Año',
                        data: datos.pobreza,
                        borderWidth: 2,
                        tension: 0.3,
                        borderColor: setcolor()
                    }]
                },
            options: { responsive: true }
        });

//Actualiza el cambio de color
    function act_state() {
        let pendiente = math2();
        let texto = "";

        if (pendiente < 0) texto = "Mejora (Pobreza)";
            else if (pendiente > 0) texto = "Empeora (Pobreza)";
                else texto = "Estable (=)";

        document.getElementById("estado").textContent = texto;
    }

//Actualiza el estado de la grafica
    function Act_Grafic_state() {
        let newDats = Genedata();
        let color = setcolor();

        chart.data.labels = newDats.age;
        chart.data.datasets[0].data = newDats.pobreza;
        chart.data.datasets[0].borderColor = color;

        chart.update();
        act_state();
    }

//Sliders
    function conectarSlider(id, callback) {
        document.getElementById(id).addEventListener('input', callback);
    }

    conectarSlider("sliderA", (e) => {
        a = parseFloat(e.target.value);
        document.getElementById("valA").textContent = a;
        Act_Grafic_state();
    });

    conectarSlider("sliderB", (e) => {
        b = parseFloat(e.target.value);
        document.getElementById("valB").textContent = b;
        Act_Grafic_state();
    });

    conectarSlider("sliderE", (e) => {
        E = parseFloat(e.target.value);
        document.getElementById("valE").textContent = E;
        Act_Grafic_state();
    });

    conectarSlider("sliderS", (e) => {
        S = parseFloat(e.target.value);
        document.getElementById("valS").textContent = S;
        Act_Grafic_state();
    });

    conectarSlider("sliderC", (e) => {
        c = parseFloat(e.target.value);
        document.getElementById("valC").textContent = c;
        Act_Grafic_state();
    });