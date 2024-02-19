import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss'
import List from './components/List';
import FloatingBox from './components/FloatingBox';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState({ x: null, y: null });
  const [showFloatingDiv, setShowFloatingDiv] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  const [darkModeText, setDarkModeText] = useState('Light side')


  const handleDarkMode = (event) => {
    event.target.classList.toggle( 'active' )
    darkMode? setDarkModeText('Dark side'): setDarkModeText('Light side')
    document.body.classList.toggle('dark-mode')
    setDarkMode(!darkMode)
  }

  const handleItemClick = (clickedPosition) => {
    setPosition(clickedPosition);
    setShowFloatingDiv(true);
  };
  const handleMouseLeave = () => {
    setShowFloatingDiv(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingDiv(false); // Ocultar el div flotante al hacer scroll
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []); //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pajmunoz.github.io/htmx/api.json');
        setData(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
      {loading ? (

        <div className="loader"></div>

      ) : (
       
        <div>
          
          <button className='btn-darkMode' onClick={handleDarkMode}>{darkModeText}</button>
          <h1>{data.name.first} {data.name.last}</h1>
          <figure>
            <img src={data.picture.large} alt="" />
          </figure>
          <h4>{data.location.state}, {data.location.country}</h4>
          <div className="list">
            <h3>Stack:</h3>

            <List title="Front End:" bg="odd" endpoint={data.stack.front} onItemClick={handleItemClick} />
            <List title="Back End:" bg="par" endpoint={data.stack.back} onItemClick={handleItemClick} />
            <List title="Teams:" bg="odd" endpoint={data.stack.team} onItemClick={handleItemClick} />


            <h3>Studies:</h3>
            <List title="University:" bg="par" endpoint={data.studies.university} onItemClick={handleItemClick} />
            <List title="Certifications:" bg="odd" endpoint={data.studies.certifications} onItemClick={handleItemClick} />

            {showFloatingDiv && position.x !== null && position.y !== null && (
              <FloatingBox posX={position.x} posY={position.y} mouseLeaveProp={handleMouseLeave} text={'hola'} />

            )}
          </div>

          <hr />

          <div className="footer">
            Can reach me out at: <b>{data.email}</b>
          </div>
        </div>
      )}
    </>
  )
}

export default App
