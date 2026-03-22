const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const item = data.find(x => x.id === id);

    if (!item) {
      document.body.innerHTML = "<h2>Story not found</h2>";
      return;
    }

    // TEXT
    document.getElementById("title").innerText = item.title;
    document.getElementById("desc").innerText = item.description;
    document.getElementById("problem").innerText = item.problem;
    document.getElementById("action").innerText = item.action;
    document.getElementById("result").innerText = item.result;

    // 🎬 YOUTUBE FIX
    let videoUrl = item.video;

    if (videoUrl.includes("youtube.com/watch")) {
      const videoId = videoUrl.split("v=")[1];
      videoUrl = "https://www.youtube.com/embed/" + videoId;
    }

    document.getElementById("video").src = videoUrl;

  });