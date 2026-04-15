
const ctx = document.getElementById('grafica').getContext('2d');
let chart;


function updatevalue() {
    document.getElementById('c1Val').textContent = document.getElementById('c1').value;
    document.getElementById('c2Val').textContent = document.getElementById('c2').value;
    document.getElementById('aVal').textContent = document.getElementById('a').value;
    document.getElementById('bVal').textContent = document.getElementById('b').value;
}

function mathdata() {
    const c1 = parseFloat(document.getElementById('c1').value);
    const c2 = parseFloat(document.getElementById('c2').value);
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);

    const w = Math.sqrt(Math.max(b - (a*a)/4, 0.01));

    let datos = [];
    let labels = [];

    for (let t = 0; t <= 10; t += 0.1) {
        let y = Math.exp(-a/2 * t) * (c1 * Math.cos(w*t) + c2 * Math.sin(w*t));
        datos.push(y);
        labels.push(t.toFixed(1));
    }

    return {datos, labels};
}

function updategraphic() {
     updatevalue();
    const {datos, labels} = mathdata();

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'y(t)',
                data: datos,
                borderWidth:2
            }]
        }
    });
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updategraphic);
});

updategraphic();