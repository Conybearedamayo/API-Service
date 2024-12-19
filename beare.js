if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

function fetchJoke() {
    const jokeSetup = document.getElementById('joke-setup');
    const jokeDelivery = document.getElementById('joke-delivery');

    fetch('https://official-joke-api.appspot.com/random_joke')
        .then((response) => response.json())
        .then((data) => {
            jokeSetup.textContent = data.setup;
            jokeDelivery.textContent = data.punchline;
        })
        .catch((error) => {
            console.log('Error fetching joke:', error);
        });
}