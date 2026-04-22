// valores iniciales
    let a = 0.5, b = 0.3, E = 1, S = 50, c = 70, C = 38.5;

// Valores Modificados
    function setExplain(text) {
        document.getElementById("explain").textContent = text;

        box.classList.remove("in");
        box.classList.add("out");
    }

    function SetI() {
        a = 0.5, b = 0.7, E = 2, S = 45, c = 35, C = 44.5;

        updateSliders();
        Act_Grafic_state();

        setExplain(
            "La carencia de acceso a los servicios de salud ah llevado a que muchos ciudadanos no cuenten con los servicios adecuados para" +
            " la salud, llevando a que mas de 44.5 millones de personas sean afectadas y no cuenten con los tratamientos debidos, pues no mas" +
            " del 37% de los ciudadanos ejercen esta carrera por el temor o la gran responsabilidad que presenta disminuyendo la seguridad" +
            " y el acceso que puede tener muchos ante su salud."
        );
    }

    function SetII() {
        a = 0.2, b = 0.8, E = 63, S = 20, c = 32, C = 40.3;

        updateSliders();
        Act_Grafic_state();

        setExplain(
            "La carencia social es uno de los factores mas comunes en la poblacion que bien, no se 'consideran' pobres como tal la carencia" +
            " de recursos, tales como La educacion, La salud, Los servicios basicos como (Luz, agua potable, gas) y en algunos casos, de" +
            " viviendas propias, llevando a que mucha gente tome multiples trabajos para sobrevivir el dia a dia, esto representando el 32%" +
            " de la poblacion total (segun la 4t), teniendo un gran impacto en la seguridad y en el crecimiento economico."
        );
    }

    function SetIII() {
        a = 0.1, b = 0.3, E = 10, S = 40, c = 13, C = 7;

        updateSliders();
        Act_Grafic_state();

        setExplain(
            "La pobreza extrema es uno de las situaciones mas lamentables para la poblacion pero que por fortuna no ah ido en crecimiento," +
            " desde 2024 esa cifra se ah mantenido estable, representando el 0.11% de la poblacion, en su mayor caso muchos no reciben ingresos" +
            " de forma directa, ya sea por incapacidades oh conflitos sociales, familiares o por abandono, por lo que muchos, dia a dia tratan" +
            " de obtener sustento por pequeños apoyos sociales, asi como ofreciendo servicios que estan bajo a su disposicion."
        );
    }

    function SetIV() {
        a = 0.2, b = 0.8, E = 10, S = 46, c = 30, C = 40.3;

        updateSliders();
        Act_Grafic_state();

        setExplain(
            "La escazes salarial es un tema que ah ido mejorando poco a poco en los ultimos dias, pues desde el 2025 esta taza ah caido al 32%" +
            " de las personas que no pueden comprar la canasta basica con su salario, debido a un pequeño aumento en el salario minimo y el" +
            " crecimiento de empleos para que la gente tenga de donde generar para dar sustento a sus hogares y a la vez obtener los servicios" +
            " requeridos para poder vivir su dia a dia."
        );
    }

// logica (clave)
    function P(t){
        let E_pr = E / 100;
        let S_pr = S / 100;
        let c_pr = c / 100;

        return (-a*E_pr - b*S_pr + c_pr)*t + C;
    }

// Logica (subclave)
    function math2() {
        let E_pr = E / 100;
        let S_pr = S / 100;
        let c_pr = c / 100;

        return (-a*E_pr - b*S_pr + c_pr);
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

//Actualizar sliders
    function updateSliders() {
        document.getElementById("sliderA").value = a;
        document.getElementById("valA").textContent = a;

        document.getElementById("sliderB").value = b;
        document.getElementById("valB").textContent = b;

        document.getElementById("sliderE").value = E;
        document.getElementById("valE").textContent = E;

        document.getElementById("sliderS").value = S;
        document.getElementById("valS").textContent = S;

        document.getElementById("sliderC").value = c;
        document.getElementById("valC").textContent = c;
    }

//Sliders
    function conectSlider(id, callback) {
        document.getElementById(id).addEventListener('input', callback);
    }

    conectSlider("sliderA", (e) => {
        a = parseFloat(e.target.value);
        document.getElementById("valA").textContent = a;
        Act_Grafic_state();
    });

    conectSlider("sliderB", (e) => {
        b = parseFloat(e.target.value);
        document.getElementById("valB").textContent = b;
        Act_Grafic_state();
    });

    conectSlider("sliderE", (e) => {
        E = parseFloat(e.target.value);
        document.getElementById("valE").textContent = E;
        Act_Grafic_state();
    });

    conectSlider("sliderS", (e) => {
        S = parseFloat(e.target.value);
        document.getElementById("valS").textContent = S;
        Act_Grafic_state();
    });

    conectSlider("sliderC", (e) => {
        c = parseFloat(e.target.value);
        document.getElementById("valC").textContent = c;
        Act_Grafic_state();
    });