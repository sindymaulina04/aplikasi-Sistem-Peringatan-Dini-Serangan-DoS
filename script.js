let trafficCount = 0;
const threshold = 100; // Ambang batas trafik per menit
let trafficDataElement = document.getElementById('traffic-data');
let warningContainer = document.getElementById('warning-container');
let mitigationContainer = document.getElementById('mitigation-container');
let simulateTrafficButton = document.getElementById('simulate-traffic');
let resetTrafficButton = document.getElementById('reset-traffic');
let dreadScoresElement = document.getElementById('dread-scores');
let treadStatusElement = document.getElementById('tread-status');
let dreadTotalElement = document.getElementById('dread-total');
let ctx = document.getElementById('trafficChart').getContext('2d');

// Inisialisasi grafik
let trafficChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Trafik per Menit',
            data: [],
            borderColor: 'rgb(125, 59, 5)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
        }
    }
});

// Fungsi untuk mensimulasikan trafik
function simulateTraffic() {
    trafficCount += Math.floor(Math.random() * 10) + 1; // Trafik acak antara 1-10 permintaan
    trafficDataElement.innerText = `Trafik Saat Ini: ${trafficCount} permintaan per menit`;

    // Update grafik
    let currentTime = trafficChart.data.labels.length ? trafficChart.data.labels[trafficChart.data.labels.length - 1] + 1 : 0;
    trafficChart.data.labels.push(currentTime);
    trafficChart.data.datasets[0].data.push(trafficCount);
    trafficChart.update();

    // Deteksi DoS
    if (trafficCount > threshold) {
        showWarning();
        takeMitigationAction();
        calculateDread(); // Hitung nilai DREAD
        updateTreadStatus(); // Perbarui status TREAD
    }
}

// Menampilkan peringatan DoS
function showWarning() {
    warningContainer.classList.remove('hidden');
    warningContainer.innerHTML = `
        <h2>Peringatan Dini</h2>
        <p>Peringatan: Potensi serangan DoS terdeteksi! Trafik: ${trafficCount} permintaan per menit.</p>`;
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = '#f8d7da';
}

// Menampilkan tindakan mitigasi
function takeMitigationAction() {
    mitigationContainer.classList.remove('hidden');
    mitigationContainer.innerHTML = `
        <h2>Tindakan Pengurangan Risiko</h2>
        <p>Langkah: Memblokir IP yang mencurigakan atau membatasi akses.</p>`;
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = '#fff3cd';
}

// Fungsi untuk menghitung nilai DREAD
function calculateDread() {
    const parameters = ['Damage', 'Reproducibility', 'Exploitability', 'Affected Users', 'Discoverability'];
    const scores = parameters.map(() => Math.floor(Math.random() * 10) + 1);
    let total = scores.reduce((a, b) => a + b, 0);

    dreadScoresElement.innerHTML = parameters
        .map((param, index) => `<tr><td>${param}</td><td>${scores[index]}</td></tr>`)
        .join('');
    dreadTotalElement.innerText = total;
}

// Fungsi untuk memperbarui status TREAD
function updateTreadStatus() {
    const treadParameters = ['Threat Detected', 'Response Initiated', 'Evaluation Ongoing', 'Action Taken', 'Defense Strengthened'];
    const statuses = treadParameters.map(param => (Math.random() > 0.5 ? 'Yes' : 'No'));

    treadStatusElement.innerHTML = treadParameters
        .map((param, index) => `<tr><td>${param}</td><td>${statuses[index]}</td></tr>`)
        .join('');
}

// Fungsi untuk mereset trafik
function resetTraffic() {
    trafficCount = 0;
    trafficDataElement.innerText = `Trafik Saat Ini: ${trafficCount} permintaan per menit`;
    trafficChart.data.labels = [];
    trafficChart.data.datasets[0].data = [];
    trafficChart.update();
    warningContainer.classList.add('hidden');
    mitigationContainer.classList.add('hidden');
    dreadScoresElement.innerHTML = '';
    dreadTotalElement.innerText = '0';
    treadStatusElement.innerHTML = '';
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = '#f5f5f5';
}

// Menangani tombol simulasi trafik
simulateTrafficButton.addEventListener('click', simulateTraffic);

// Menangani tombol reset trafik
resetTrafficButton.addEventListener('click', resetTraffic);
