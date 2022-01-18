
import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  const [adalabersData, setAdalabersData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCounselor, setNewCounselor] = useState('');
  const [newSpeciality, setNewSpeciality] = useState('');

  useEffect(() => {
    callToApi().then(response => {
      setAdalabersData(response);
    });
  }, []);

  const renderAdalabers = () => {
    return adalabersData.map((adalaber, index) => {
      return adalaber.id === undefined ?
        <tr key={index}>
          <td>{adalaber.name}</td>
          <td>{adalaber.counselor}</td>
          <td>{adalaber.speciality}</td>
        </tr>
        :
        <tr key={adalaber.id}>
          <td>{adalaber.name}</td>
          <td>{adalaber.counselor}</td>
          <td>{adalaber.speciality}</td>
        </tr>
    });
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

  return (
    <div>
      <h1>Adalabers</h1>
      <table>
        <thead><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
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
