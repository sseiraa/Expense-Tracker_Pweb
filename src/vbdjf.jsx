function Laporan() {
    const [pemasukan, setPemasukan] = useState([]);
    const [pengeluaran, setPengeluaran] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
  
    useEffect(() => {
      fetchPemasukan();
      fetchPengeluaran();
    }, []);
  
    const fetchPemasukan = async () => {
      // Mengambil data pemasukan
    };
  
    const fetchPengeluaran = async () => {
      // Mengambil data pengeluaran
    };
  
    const groupByMonth = (data) => {
      // Mengelompokkan data berdasarkan bulan
    };
  
    const groupedPemasukan = groupByMonth(pemasukan);
    const groupedPengeluaran = groupByMonth(pengeluaran);
  
    const totalPemasukan = selectedMonth ? groupedPemasukan[selectedMonth]?.total || 0 : 0;
    const totalPengeluaran = selectedMonth ? groupedPengeluaran[selectedMonth]?.total || 0 : 0;
    const difference = totalPemasukan - totalPengeluaran;
  
    return (
      <>
        {/* Elemen UI untuk menampilkan laporan */}
      </>
    );
  }