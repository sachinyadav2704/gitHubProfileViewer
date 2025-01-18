import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from './box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faSearch, faSun, faMoon, faArrowDown } from '@fortawesome/free-solid-svg-icons';

let formatDate = inputDate => {
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   const date = new Date(inputDate);

   return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const App = () => {
   const [user, setUser] = useState([]);
   const [profile, setProfile] = useState('sachinyadav2704');
   const [click, setClick] = useState(true);
   const [isThemeLight, setIsThemeLight] = useState(false);

   useEffect(() => {
      if (click) {
         axios.get(`https://api.github.com/users/${profile}`).then(res => {
            setUser(res.data);
         });
         setClick(prevClick => !prevClick);
      }
   }, [click, profile]);

   return (
      <main className={!isThemeLight ? 'dark-theme' : 'light-theme'}>
         <div className="header">
            <h1>Find your GitHub Profile here</h1>
         </div>
         <FontAwesomeIcon
            icon={faArrowDown}
            style={{ color: '#ffffff', backgroundColor: '#5c5c5cb1', padding: '1rem', borderRadius: '50%' }}
            className="icon"
         />
         <div className="search">
            <input
               type="text"
               className="search-bar"
               placeholder="Search the Github Profile"
               name="profile"
               value={profile}
               onChange={event => setProfile(event.target.value)}
            />
            <button
               onClick={() => {
                  setClick(prevClick => !prevClick);
               }}
            >
               <FontAwesomeIcon icon={faSearch} style={{ color: '#ffffff' }} className="icon" />
            </button>
            <button onClick={() => setIsThemeLight(!isThemeLight)}>
               <FontAwesomeIcon icon={!isThemeLight ? faSun : faMoon} style={{ color: '#ffffff' }} className="icon" />
            </button>
         </div>
         {user.length !== 0 && (
            <div className="github">
               <div className="image" onClick={() => window.open(`${user.avatar_url}`, '_blank')} style={{ backgroundImage: `url(${user.avatar_url})` }}></div>
               <h1 className="name">{user.name}</h1>
               <h3 className="userid" onClick={() => window.open(`https://github.com/${user.login}`, '_blank')}>
                  @{user.login}
               </h3>
               <div className="info">
                  {user.location && (
                     <div>
                        <FontAwesomeIcon icon={faLocationDot} className={`icon ${!isThemeLight ? 'dark-theme' : 'light-theme'}`} />
                        <p>{user.location}</p>
                     </div>
                  )}
                  <div>
                     <FontAwesomeIcon icon={faCalendarDays} className={`icon ${!isThemeLight ? 'dark-theme' : 'light-theme'}`} />
                     <p>Joined {formatDate(`${user.created_at}`)}</p>
                  </div>
               </div>
               <div className="container">
                  <Box className="info-box" number={user.followers} string="followers" />
                  <Box className="info-box" number={user.following} string="following" />
                  <Box className="info-box" number={user.public_repos} string="repositories" />
               </div>
            </div>
         )}
      </main>
   );
};

export default App;
