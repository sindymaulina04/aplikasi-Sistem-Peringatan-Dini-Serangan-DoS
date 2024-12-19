let trafficCount = 0;
const threshold = 100; // Ambang batas trafik per menit
let trafficDataElement = document.getElementById('traffic-data');
let warningContainer = document.getElementById('warning-container');
let mitigationContainer = document.getElementById('mitigation-container');
let simulateTrafficButton = document.getElementById('simulate-traffic');
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
    }
}

// Menampilkan peringatan DoS
function showWarning() {
    warningContainer.classList.remove('hidden');
    warningContainer.innerHTML = `<h2>Peringatan Dini</h2><p>Peringatan: Potensi serangan DoS terdeteksi! Trafik: ${trafficCount} permintaan per menit.</p>`;
    document.body.style.backgroundColor = '#f8d7da'; // Ubah latar belakang menjadi merah muda untuk peringatan
}

// Menampilkan tindakan mitigasi
function takeMitigationAction() {
    mitigationContainer.classList.remove('hidden');
    mitigationContainer.innerHTML = `<h2>Tindakan Pengurangan Risiko</h2><p>Langkah: Memblokir IP yang mencurigakan atau membatasi akses.</p>`;
    document.body.style.backgroundColor = '#fff3cd'; // Ubah latar belakang menjadi kuning untuk mitigasi
}

// Menangani tombol simulasi trafik
simulateTrafficButton.addEventListener('click', simulateTraffic);
