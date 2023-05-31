import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';

function ConferenceColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const conference = data.conference;
        return (
          <div key={conference.href} className="card mb-3 shadow">
            <img src={conference.location.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{conference.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {conference.location.name}
              </h6>
              <p className="card-text">
                {conference.description}
              </p>
            </div>
            <div className="card-footer">
              {new Date(conference.starts).toLocaleDateString()}
              -
              {new Date(conference.ends).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MainPage = (props) =>  {
  const [conferenceColumns, setConferenceColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const requests = [];
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);
        const columns = [[], [], []];

        let i = 0;
        for (const conferenceResponse of responses) {
          if (conferenceResponse.ok) {
            const details = await conferenceResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(conferenceResponse);
          }
        }

        setConferenceColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold">Conference GO!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The only resource you'll ever need to plan an run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Upcoming conferences</h2>
        <div className="row">
          {conferenceColumns.map((conferenceList, index) => {
            return (
              <ConferenceColumn key={index} list={conferenceList} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainPage;
