// Zamanı güncelleyen işlev
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = now.toLocaleDateString('tr-TR', { weekday: 'long' });
    const date = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${day}, ${date}`;
}

// Hava durumu verilerini getiren işlev
function getWeather() {
    const apiKey = 'API_KEYİNİ_BURAYA_YERLEŞTİR'; // OpenWeather API anahtarı
    const city = 'Istanbul'; // Burada sabit bir şehir seçtim, dinamik de yapılabilir
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = data.name;
            const description = data.weather[0].description;
            const temp = Math.round(data.main.temp);

            document.getElementById('location').textContent = location;
            document.getElementById('weather-description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
            document.getElementById('temperature').textContent = `${temp}°C`;
        })
        .catch(error => console.error('Hava durumu verisi alınamadı:', error));
}

// Sayfa yüklendiğinde saat ve hava durumunu güncelle
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    getWeather();
    setInterval(updateClock, 1000); // Her saniye saati güncelle
});
