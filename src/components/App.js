
import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  const [adalabersData, setAdalabersData] = useState([]);

  useEffect(() => {
    callToApi().then(response => {
      setAdalabersData(response);
    });
  }, []);

  const renderAdalabers = () => {
    return adalabersData.map(adalaber => {
      return (
        <tr key={adalaber.id}>
          <td>{adalaber.name}</td>
          <td>{adalaber.counselor}</td>
          <td>{adalaber.speciality}</td>
        </tr>
      );
    });
  };

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
        <input type="text" id='name' name='name' />
        <label htmlFor='counselor'>Tutora:</label>
        <input type="text" id='counselor' name='counselor' />
        <label htmlFor='speciality'>Especialidad:</label>
        <input type="text" id='speciality' name='speciality' />
        <input type="submit" value="Añadir una nueva Adalaber" />
      </form>
    </div>
  );
}

export default App;
