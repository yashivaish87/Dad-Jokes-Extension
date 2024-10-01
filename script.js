const fonts = [
    "'Pacifico', cursive",
    "'Comic Sans MS', cursive, sans-serif",
    "'Chewy', cursive",
    "'Luckiest Guy', cursive",
    "'Lobster', cursive",
    "'Dancing Script', cursive",
    "'Bubblegum Sans', cursive",
    "'Fredoka One', cursive",
    "'Bangers', cursive",
    "'Cedarville Cursive', cursive",
    "'Baloo 2', cursive",
    "'Abril Fatface', cursive"
];

function fetchJoke() {
    fetch('https://icanhazdadjoke.com/slack')
        .then(data => data.json())
        .then(jokeData => {
            const jokeText = jokeData.attachments[0].text; 
            const jokeElement = document.getElementById('jokeElement');
            jokeElement.innerHTML = jokeText; 
            
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            jokeElement.style.fontFamily = randomFont; 
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            const jokeElement = document.getElementById('jokeElement');
            jokeElement.innerHTML = 'Oops! Something went wrong. Please try again.'; 
            jokeElement.style.fontFamily = ''; 
        });
}

//button for more
document.getElementById('newJokeBtn').addEventListener('click', fetchJoke);

//event listener for share
document.getElementById('shareJokeBtn').addEventListener('click', () => {
    const jokeText = document.getElementById('jokeElement').innerText; // Get the current joke text
    const shareData = {
        title: 'Dad Joke',
        text: jokeText,
        url: 'https://icanhazdadjoke.com/'
    };
    
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Joke shared successfully!'))
            .catch(error => console.error('Error sharing joke:', error));
    } else {
        
        alert('Share feature is not supported in this browser. You can copy the joke manually.');
    }
});
//event listener for copy icon
document.getElementById('copyJokeBtn').addEventListener('click', () => {
    const jokeText = document.getElementById('jokeElement').innerText; 
    navigator.clipboard.writeText(jokeText) 
        .then(() => {
            const feedbackMessage = document.getElementById('copyFeedback'); 
            feedbackMessage.innerText = 'Copied!'; 
            feedbackMessage.style.display = 'inline'; 
            
            
            setTimeout(() => {
                feedbackMessage.style.display = 'none'; 
            }, 2000);
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
});

fetchJoke();
