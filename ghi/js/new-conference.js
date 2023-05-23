window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      const selectTag = document.getElementById('location');
      for (let location of data.locations) {
        let option = document.createElement("option");
        // Create an 'option' element
        option.value = location.id;
        // Set the '.value' property of the option element to the
        // state's abbreviation
        option.innerHTML = location.name;
        // Set the '.innerHTML' property of the option element to
        // the state's name
        selectTag.appendChild(option);
        // Append the option element as a child of the select tag
      }
      const formTag = document.getElementById('create-conference-form');
      formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: json,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          formTag.reset();
          const newConference = await response.json();
          console.log(newConference);
        }
      });
    }
  });
