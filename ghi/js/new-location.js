window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);

      const selectTag = document.getElementById('state');
      for (let state of data.states) {
        let option = document.createElement("option");
        option.value = state.abbreviation;
        option.innerHTML = state.name;
        selectTag.appendChild(option);
      }
      const formTag = document.getElementById('create-location-form');
      formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json, "json");
        const locationUrl = "http://localhost:8000/api/locations/";
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        console.log("response", response);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
        }
      });
    }
  });
