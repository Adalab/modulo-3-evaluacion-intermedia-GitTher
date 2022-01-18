
import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  const [adalabersData, setAdalabersData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCounselor, setNewCounselor] = useState('');
  const [newSpeciality, setNewSpeciality] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    callToApi().then(response => {
      setAdalabersData(response);
    });
  }, []);

  const renderAdalabers = () => {
    return (
      adalabersData
        .filter(adalaber => {
          return adalaber.name.toLowerCase().includes(search.toLowerCase());
        })
        .filter(adalaber => {
          return adalaber.counselor.toLowerCase().includes(filter);
        })
        .map((adalaber, index) => {
          return adalaber.id === undefined ?
            <tr key={index}>
              <td>{adalaber.name}</td>
              <td>{adalaber.counselor}</td>
              <td>{adalaber.speciality}</td>
              <td>{adalaber.social_networks.map((social_network) => {
                return (
                  <a href={`${social_network.url}`}>{social_network.name}</a>
                )
              })}</td>
            </tr>
            :
            <tr key={adalaber.id}>
              <td>{adalaber.name}</td>
              <td>{adalaber.counselor}</td>
              <td>{adalaber.speciality}</td>
              <td>{adalaber.social_networks.map((social_network) => {
                return (
                  <a href={`${social_network.url}`}>{social_network.name}</a>
                )
              })}</td>
            </tr>
        }))
  };

  const handleNewName = (event) => {
    setNewName(event.currentTarget.value);
  }

  const handleNewCounselor = (event) => {
    setNewCounselor(event.currentTarget.value);
  }

  const handleNewSpeciality = (event) => {
    setNewSpeciality(event.currentTarget.value);
  }

  const handleNewAdalaber = (event) => {
    event.preventDefault();
    const newAdalaber = {
      name: newName,
      counselor: newCounselor,
      speciality: newSpeciality,
    };
    setAdalabersData([...adalabersData, newAdalaber]);
    setNewName('');
    setNewCounselor('');
    setNewSpeciality('');
  }

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  }

  const handleFilter = (event) => {
    setFilter(event.currentTarget.value)
  }

  return (
    <div>
      <h1>Adalabers</h1>
      <form>
        <label htmlFor='search'>Nombre:</label>
        <input type="text" id='search' name='search' value={search} onChange={handleSearch} />
        <label htmlFor='filter'>Escoge una tutora:</label>
        <select id='filter' name='filter' value={filter} onChange={handleFilter}>
          <option value="" disabled>Escoge una opción</option>
          <option value="yanelis">Yanelis</option>
          <option value="dayana">Dayana</option>
          <option value="iván">Iván</option>
        </select>
      </form>
      <table>
        <thead><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
          <th>Redes</th>
        </tr></thead>
        <tbody>
          {renderAdalabers()}
        </tbody>
      </table>
      <h2>Añadir una Adalaber</h2>
      <form>
        <label htmlFor='name'>Nombre:</label>
        <input type="text" id='name' name='name' value={newName} onChange={handleNewName} />
        <label htmlFor='counselor'>Tutora:</label>
        <input type="text" id='counselor' name='counselor' value={newCounselor} onChange={handleNewCounselor} />
        <label htmlFor='speciality'>Especialidad:</label>
        <input type="text" id='speciality' name='speciality' value={newSpeciality} onChange={handleNewSpeciality} />
        <input type="submit" value="Añadir una nueva Adalaber" onClick={handleNewAdalaber} />
      </form>
    </div>
  );
}

export default App;
