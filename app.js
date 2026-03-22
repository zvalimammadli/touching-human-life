fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('stories');

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card';

      div.innerHTML = `
        <h2>${item.title}</h2>
        <p><b>Problem:</b> ${item.problem}</p>
        <p><b>Solution:</b> ${item.solution}</p>
        <p><b>Result:</b> ${item.result}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById('stories').innerText = "Data yüklənmədi ❌";
    console.error(error);
  });
