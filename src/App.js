import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {

  // changes the Browser title to "Workout Log Client"
  useEffect(() => {
    document.title = 'Workout Log Client';
  }, []);

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }


  //Logout function
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  //View for when user has a session token
  const protectedViews = () => {
    return(sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
    : <Auth updateToken={updateToken} />)
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {/* The following line of code loads up the WorkoutIndex view/component upon successful login */}
      {protectedViews()}
    </div>
  );
}

export default App;