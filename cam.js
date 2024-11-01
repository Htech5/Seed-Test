// Memilih elemen video
const video1 = document.getElementById('webcam1');
const video2 = document.getElementById('webcam2');

// Fungsi untuk memulai streaming dari kamera tertentu
async function startWebcam(deviceId, videoElement) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId ? { exact: deviceId } : undefined }
        });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Tidak dapat mengakses webcam:", error);
    }
}

// Fungsi untuk mendeteksi dan memulai kedua kamera
async function initDualWebcams() {
    try {
        // Mendapatkan daftar perangkat media
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // Jika ada dua kamera, mulai streaming di masing-masing elemen video
        if (videoDevices.length >= 2) {
            startWebcam(videoDevices[0].deviceId, video1);
            startWebcam(videoDevices[1].deviceId, video2);
        } else {
            console.error("Tidak ditemukan dua kamera.");
        }
    } catch (error) {
        console.error("Gagal mendeteksi perangkat media:", error);
    }
}

// Memulai proses deteksi kamera saat halaman dimuat
initDualWebcams();
