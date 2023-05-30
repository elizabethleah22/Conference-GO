import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConference';
import PresentationForm from './PresentationForm';

export default function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Route path="/conferences/new">
          <ConferenceForm />
          </Route>
          <Route path="/attendees/new">
            <AttendConferenceForm/>
          </Route>
          <Route path="/attendees">
            <AttendeesList attendees={props.attendees}/>
          </Route>
          <Route path="/locations/new">
            <LocationForm />
          </Route>
          <Route path="/presentations/new">
            <PresentationForm />
          </Route>
        </div>
      </BrowserRouter>
    </>
  );
}
