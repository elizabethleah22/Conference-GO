function createCard(title, description, pictureUrl, starts, ends) {
    return `
      <div class="card shadow" style="margin-bottom: 1.1rem;">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
             <small class="text-muted">${starts} - ${ends}</small>
            </div>
      </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        let count = 1;
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            console.log(details);
            const title = details.conference.name;
            console.log("title", title);
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = new Date(details.conference.starts).toLocaleDateString('en-US');
            const ends = new Date(details.conference.ends).toLocaleDateString('en-US');
            const html = createCard(title, description, pictureUrl, starts, ends);
            if (count === 1) {
                const column = document.querySelector(".first");
                column.innerHTML += html;
            } else if (count === 2) {
                const column = document.querySelector(".second");
                column.innerHTML += html;
            } else {
                const column = document.querySelector(".third");
                column.innerHTML += html;
            }
            if (count === 3) {
                count = 1;
            } else {
                count = count + 1;
            }
          }
        }

      }
    } catch (e) {
      console.log(e);
    }
});
