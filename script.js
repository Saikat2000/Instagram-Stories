const storyListEl = document.getElementById('story-list');
const storyViewer = document.getElementById('story-viewer');
const storyImage = document.getElementById('story-image');
const progressBar = document.getElementById('progress-bar');
const prevStory = document.getElementById('prev-story');
const nextStory = document.getElementById('next-story');
const homeButton = document.getElementById('home-button');

let stories = [];
let currentIndex = 0;
let timer = null;

async function fetchStories() {
    const res = await fetch('stories.json');
    stories = await res.json();
    renderStoryList();
}

function renderStoryList() {
    stories.forEach((story, index) => {
        const img = document.createElement('img');
        img.src = story;
        img.alt = `Story ${index + 1}`;
        img.addEventListener('click', () => openStory(index));
        storyListEl.appendChild(img);
    });
}

function openStory(index) {
    currentIndex = index;
    storyViewer.style.display = 'flex';
    storyViewer.classList.add('show');
    showStory(currentIndex);
}

function showStory(index) {
    clearTimeout(timer);
    storyImage.style.opacity = 0;

    const img = new Image();
    img.src = stories[index];
    img.onload = () => {
        storyImage.src = img.src;
        storyImage.style.opacity = 1;
        startProgress();
    };
}

function startProgress() {
    progressBar.innerHTML = '';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    progressBar.appendChild(fill);
    fill.offsetWidth; // trigger reflow
    fill.style.width = '100%';

    timer = setTimeout(() => {
        if (currentIndex < stories.length - 1) {
            currentIndex++;
            showStory(currentIndex);
        } else {
            closeViewer();
        }
    }, 5000);
}

function closeViewer() {
    clearTimeout(timer);
    storyViewer.style.display = 'none';
    storyViewer.classList.remove('show');
}

prevStory.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showStory(currentIndex);
    }
});

nextStory.addEventListener('click', () => {
    if (currentIndex < stories.length - 1) {
        currentIndex++;
        showStory(currentIndex);
    } else {
        closeViewer();
    }
});

// Home button event listener
homeButton.addEventListener('click', closeViewer);

fetchStories();
