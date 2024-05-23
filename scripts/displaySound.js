/** @format */

// Define the URL of the JSON data
const url = "data/sounds.json";

// Select the element where sound information will be displayed
const soundContainer = document.getElementById("soundContainer");

// Function to fetch and display sound information
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch JSON (${response.status} ${response.statusText})`
      );
    }
    return response.json();
  })
  .then((data) => {
    // Iterate through each sound object in the JSON data
    data.sounds.forEach((sound) => {
      // Create a container for each sound entry
      const soundEntry = document.createElement("div");
      soundEntry.classList.add("sound-entry");

      // Create elements for sound information
      const nameElement = document.createElement("h2");
      nameElement.textContent = sound.name;

      const authorElement = document.createElement("p");
      authorElement.textContent = sound.author;

      // Create a container for title and author
      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info-container");

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = ` ${sound.description}`;

      // Append title and author elements to infoContainer
      infoContainer.appendChild(nameElement);
      infoContainer.appendChild(authorElement);

      // Create an audio player
      const audioPlayer = document.createElement("audio");
      audioPlayer.classList.add("audio-player");
      audioPlayer.src = sound.mp3;
      audioPlayer.controls = true; // Show default audio controls (play/pause)
      // Create a download button
      const downloadButton = document.createElement("a");
      downloadButton.href = sound.mp3;
      downloadButton.download = sound.name; // Optional: specify the file name
      downloadButton.textContent = "Download";
      downloadButton.classList.add("download-button");

      // Append elements to soundEntry
      soundEntry.appendChild(infoContainer);
      soundEntry.appendChild(downloadButton);
      soundEntry.appendChild(audioPlayer);

      // Append the sound entry container to the soundContainer element
      soundContainer.appendChild(soundEntry);
    });
  })
  .catch((error) => {
    console.error("Error fetching or parsing JSON:", error);
  });
