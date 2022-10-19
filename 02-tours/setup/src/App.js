import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    // extra precaution to make sure loading is true when fetching
    setLoading(true);
    try {
      // call the api
      const response = await fetch(url);
      // parse json
      const tours = await response.json();
      console.log("tours", tours, tours[0].id);
      setLoading(false);
      setTours(tours);
    }
    catch(error){
      setLoading(false);
      console.log(error);

    }
  }

  const removeTour = (id) => {
    // remove the tour using the filter function
    const newTours = tours.filter((tour) =>  tour.id !== id)
    //  update the state
    setTours(newTours);
  }

  // useEffect when component renders
  // runs only one when you don't have a dependency with empty array
  useEffect(() => {
    fetchTours();
  }, [])

  // loading check
  if(loading) {
    return (
      <main>
        <Loading/>
      </main>
    );
  }

  // when there are no tours
  if(tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Tours Left</h2>
          <button onClick={fetchTours} className='btn'> Refresh </button>
        </div>
      </main>
    )
  }

  // tours get data to render
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default App
