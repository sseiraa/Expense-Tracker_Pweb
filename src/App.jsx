import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [pemasukan, setPemasukan] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState('');
  const [sumberDana, setSumberDana] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddPemasukan = async (e) => {
    e.preventDefault();
    if (tanggal && kategori && nominal) {
      const response = await fetch('http://localhost:5000/pemasukan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tanggal, kategori, nominal, sumber_dana: sumberDana, keterangan }),
      });
      if (response.ok) {
        const newPemasukan = await response.json();
        setPemasukan([...pemasukan, newPemasukan]);
        resetForm();
      }
    }
  };

  const fetchPemasukan = async () => {
    const response = await fetch('http://localhost:5000/pemasukan');
    if (response.ok) {
      const data = await response.json();
      setPemasukan(data);
    }
  };

  const handleDeletePemasukan = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this data?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5000/pemasukan/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPemasukan(pemasukan.filter(item => item.id !== id));
      }
    }
  };

  const handleEditPemasukan = (item) => {
    setEditingId(item.id);
    setTanggal(item.tanggal);
    setKategori(item.kategori);
    setNominal(item.nominal);
    setSumberDana(item.sumber_dana);
    setKeterangan(item.keterangan);
  };

  const handleUpdatePemasukan = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/pemasukan/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tanggal, kategori, nominal, sumber_dana: sumberDana, keterangan }),
    });
    if (response.ok) {
      const updatedPemasukan = await response.json();
      setPemasukan(pemasukan.map(item => (item.id === editingId ? updatedPemasukan : item)));
      resetForm();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTanggal('');
    setKategori('');
    setNominal('');
    setSumberDana('');
    setKeterangan('');
  };

  const handleCancelUpdate = () => {
    resetForm();
  };

  useEffect(() => {
    fetchPemasukan();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <>
      <h1 className='HeaderText'>Pemasukan List</h1>
      <form className='form-group' onSubmit={editingId ? handleUpdatePemasukan : handleAddPemasukan}>
        <label>Pilih Kategori:</label>
        <select
          className='input-kategori'
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
        >
          <option value="">Select Kategori</option>
          <option value="Tunai">Tunai</option>
          <option value="Transfer">Transfer</option>
        </select>
        <label>Masukan Nominal:</label>
        <input
          className='input'
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          placeholder="Nominal"
          required
          step="0.01"
          min="0"
        />
        <label>Pilih Tanggal:</label>
        <input
          className='input'
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          placeholder="Tanggal"
        />
        <label>Pilih Sumber Dana:</label>
        <select
          className='input-sumberdana'
          value={sumberDana}
          onChange={(e) => setSumberDana(e.target.value)}
          required
        >
          <option value="">Select Sumber Dana</option>
          <option value="Harian">Harian</option>
          <option value="Pesananan">Pesananan</option>
        </select>
        <label>Masukan Keterangan:</label>
        <input
          className='input'
          type="text"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Keterangan"
        />
        <button className='btn' type="submit">{editingId ? 'Update Pemasukan' : 'Add Pemasukan'}</button>
        {editingId && <button type="button" onClick={handleCancelUpdate}>Cancel</button>}
      </form>
      <table className='table'>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Kategori</th>
            <th>Nominal</th>
            <th>Sumber Dana</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pemasukan.map((item) => (
            <tr key={item.id}>
              <td>{formatDate(item.tanggal)}</td>
              <td>{item.kategori}</td>
              <td>{item.nominal}</td>
              <td>{item.sumber_dana}</td>
              <td>{item.keterangan}</td>
              <td>
                <button className='btn-u' onClick={() => handleEditPemasukan(item)}>Edit</button>
                <button className='btn-d' onClick={() => handleDeletePemasukan(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/pengeluaran">
        <button className='btn-page'>Go to Pengeluaran</button>
      </Link>
      <Link to="/laporan">
        <button className='btn-page'>Go to Laporan</button>
      </Link>
    </>
  );
}

export default App;
