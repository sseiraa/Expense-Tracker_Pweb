-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table laporan.pemasukan
CREATE TABLE IF NOT EXISTS `pemasukan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `kategori` enum('Tunai','Transfer') NOT NULL,
  `nominal` decimal(10,0) NOT NULL,
  `sumber_dana` enum('Pesanan','Harian') NOT NULL,
  `keterangan` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table laporan.pemasukan: ~3 rows (approximately)
REPLACE INTO `pemasukan` (`id`, `tanggal`, `kategori`, `nominal`, `sumber_dana`, `keterangan`) VALUES
	(1, '2025-01-17', 'Tunai', 230000, 'Pesanan', NULL),
	(2, '2025-01-17', 'Tunai', 99999, 'Harian', ''),
	(3, '2024-12-04', 'Tunai', 204000, 'Harian', '');

-- Dumping structure for table laporan.pengeluaran
CREATE TABLE IF NOT EXISTS `pengeluaran` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `kategori` enum('Tunai','Transfer') NOT NULL,
  `nominal` decimal(10,0) NOT NULL,
  `sumber_dana` enum('Pesanan','Harian') NOT NULL,
  `keterangan` text DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table laporan.pengeluaran: ~2 rows (approximately)
REPLACE INTO `pengeluaran` (`id`, `tanggal`, `kategori`, `nominal`, `sumber_dana`, `keterangan`) VALUES
	(1, '2025-01-17', 'Tunai', 140000, 'Pesanan', NULL),
	(2, '2024-12-20', 'Tunai', 60000, 'Harian', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
