import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Laporan() {
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const fetchPemasukan = async () => {
    const response = await fetch('http://localhost:5000/pemasukan');
    if (response.ok) {
      const data = await response.json();
      setPemasukan(data);
    }
  };

  const fetchPengeluaran = async () => {
    const response = await fetch('http://localhost:5000/pengeluaran');
    if (response.ok) {
      const data = await response.json();
      setPengeluaran(data);
    }
  };

  useEffect(() => {
    fetchPemasukan();
    fetchPengeluaran();
  }, []);

  // Group data by month
  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.tanggal);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = { items: [], total: 0 };
      }
      acc[key].items.push(item);
      acc[key].total += parseFloat(item.nominal);
      return acc;
    }, {});
  };

  const groupedPemasukan = groupByMonth(pemasukan);
  const groupedPengeluaran = groupByMonth(pengeluaran);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Calculate total amounts for the selected month
  const totalPemasukan = selectedMonth ? groupedPemasukan[selectedMonth]?.total || 0 : 0;
  const totalPengeluaran = selectedMonth ? groupedPengeluaran[selectedMonth]?.total || 0 : 0;
  const difference = totalPemasukan - totalPengeluaran;

  return (
    <>
      <h1 className='HeaderText'>Laporan</h1>
      <label className='labelLaporan' htmlFor="month-select">Select Month: </label>
      <select id="month-select" onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">--Select a Month--</option>
        {Object.keys(groupedPemasukan).map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      {selectedMonth && (
        <>
          <h2 className='header2'>Pemasukan for {selectedMonth} - Total: {totalPemasukan}</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Nominal</th>
                <th>Sumber Dana</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {groupedPemasukan[selectedMonth].items.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.tanggal)}</td>
                  <td>{item.kategori}</td>
                  <td>{item.nominal}</td>
                  <td>{item.sumber_dana}</td>
                  <td>{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedMonth && (
        <>
          <h2 className='header2'>Pengeluaran for {selectedMonth} - Total: {totalPengeluaran}</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Nominal</th>
                <th>Sumber Dana</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {groupedPengeluaran[selectedMonth]?.items.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.tanggal)}</td>
                  <td>{item.kategori}</td>
                  <td>{item.nominal}</td>
                  <td>{item.sumber_dana}</td>
                  <td>{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="total-box">
        <h2 className='header2'>Difference: {difference}</h2>
      </div>
      <Link to="/">
        <button className='btn-page'>Go to Pemasukan</button>
      </Link>
      <Link to="/pengeluaran">
        <button className='btn-page'>Go to Pengeluaran</button>
      </Link>
    </>
  );
}

export default Laporan;
