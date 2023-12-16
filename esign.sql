-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 12:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esign`
--

-- --------------------------------------------------------

--
-- Table structure for table `archive`
--

CREATE TABLE `archive` (
  `kd_dokter` varchar(255) NOT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext DEFAULT NULL,
  `originalRecordId` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `kd_dokter` varchar(255) NOT NULL,
  `nm_dokter` varchar(255) DEFAULT NULL,
  `jk` varchar(255) DEFAULT NULL,
  `tmp_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gol_drh` varchar(255) DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `almt_tgl` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `stts_nikah` varchar(255) DEFAULT NULL,
  `kd_sps` varchar(255) DEFAULT NULL,
  `alumni` varchar(255) DEFAULT NULL,
  `no_ijn_praktek` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`createdAt`, `updatedAt`, `id`, `kd_dokter`, `nm_dokter`, `jk`, `tmp_lahir`, `tgl_lahir`, `gol_drh`, `agama`, `almt_tgl`, `no_telp`, `stts_nikah`, `kd_sps`, `alumni`, `no_ijn_praktek`, `status`) VALUES
(1702299097517, 1702299097517, 1, 'DK001', 'Hendra', 'L', 'Bogor', '0000-00-00', 'O', 'Islam', 'Perumahan Buana Asri', '082119305818', 'MENIKAH', 'SPS001', 'Ganesha', '123456789', '1'),
(1702299166599, 1702299166599, 2, 'DK002', 'Agung', 'L', 'Bogor', '0000-00-00', 'O', 'Islam', 'Perumahan Buana Asri', '082119305818', 'MENIKAH', 'SPS002', 'Ganesha', '123456789', '1');

-- --------------------------------------------------------

--
-- Table structure for table `dynamic_form`
--

CREATE TABLE `dynamic_form` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `form_field` longtext DEFAULT NULL,
  `formulir` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dynamic_form`
--

INSERT INTO `dynamic_form` (`createdAt`, `updatedAt`, `id`, `form_field`, `formulir`) VALUES
(1702648738229, 1702648738229, 1, '[{\"label\":\"Nama\",\"name\":\"nama\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', '\"<p class=\\\"ql-align-center\\\" style=\\\"text-align: center;\\\"><strong>FORMULIR PERSETUJUAN UMUM GENERAL CONCENT</strong></p>\\n<p class=\\\"ql-align-center\\\" style=\\\"text-align: center;\\\">(PASIEN DAN ATAU WALI DIMINTA MEMBACA MEMAHAMI DAN MENGISI INFORMASI BERIKUT)</p>\\n<p class=\\\"ql-align-center\\\"><strong><em>&nbsp;</em></strong></p>\\n<p class=\\\"ql-align-justify\\\">Yang bertanda tangan dibawah ini :</p>\\n<p class=\\\"ql-align-justify\\\">Nama : %namaPasienAtauWali%</p>\\n<p class=\\\"ql-align-justify\\\">Tanggal lahir : <span style=\\\"color: rgb(75, 85, 99);\\\">%tanggalLahirPasienAtauWali%</span></p>\\n<p class=\\\"ql-align-justify\\\">Alamat : <span style=\\\"color: rgb(75, 85, 99);\\\">%alamatPasienAtauWali%</span></p>\\n<p class=\\\"ql-align-justify\\\">No. Telp : <span style=\\\"color: rgb(75, 85, 99);\\\">%noTelponPasienAtauWali%</span></p>\\n<p class=\\\"ql-align-justify\\\">Selaku pasien/&nbsp;keluarga/&nbsp;penanggungjawab di Rumah Sakit Umum Daerah Tanjung Priok dengan ini menyatakan persetujuan :</p>\\n<p class=\\\"ql-align-justify\\\">&nbsp;</p>\\n<p class=\\\"ql-align-justify\\\"><strong>I.&nbsp;PERSETUJUAN UNTUK PERAWATAN DAN PENGOBATAN</strong></p>\\n<ol>\\n<li class=\\\"ql-align-justify\\\">Saya mengetahui bahwa saya memiliki kondisi yang membutuhkan perawatan medis, saya mengijinkan dokter dan profesional kesehatan lainnya untuk melakukan prosedur diagnostic dan untuk memberikan pengobatan medis seperti yang diperlukan dalam penilaian profesional mereka. Prosedur diagnostic dan perawatn medis <u>termasuk tapi tidak terbatas pada</u>&nbsp;elektrokardiagram, x-ray, tes darah, terapi fisik, dan pemberian obat.</li>\\n<li class=\\\"ql-align-justify\\\">Saya sadar bahwa praktik kedokteran dan bedah bukanlah ilmu pasti dan saya mengakui bahwa tidak ada jaminan atas hasil apapun, terhadap perawatan, prosedur atau pemeriksaan, apapun yang dilakukan kepada saya.</li>\\n<li class=\\\"ql-align-justify\\\">Saya mengerti dan memahami bahwa :</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Saya memiliki hak untuk mengajukan pertanyaan tentang pengobatan yang diusulkan (termasuk identitas setiap orang yang memberikan atau mengamati pengobatan) setiap saat.</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Saya mengerti dan memahami bahwa saya memiliki hak untuk persetujuan atau menolak persetujuan untuk setiap prosedur terapi.</li>\\n<li class=\\\"ql-align-justify\\\">Jika saya memutuskan untuk mengehentikan perawatan medis untuk diri saya sendiri, saya memahami dan menyadari bahwa Rumah Sakit Umum Daerah Tanjung Priok&nbsp;dan dokter tidak bertanggung jawab atas hasil yang merugikan saya.</li>\\n</ol>\\n<p class=\\\"ql-align-justify\\\">&nbsp;</p>\\n<p class=\\\"ql-align-justify\\\"><strong>II.</strong>&nbsp;<strong>PERSETUJUAN PELEPASAN INFORMASI</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya memahami informasi yang ada didalam diri saya, termasuk diagnosis, hasil laboratorium, hasil tes diagnostik, yang akan digunakan untuk perawatan medis Rumah Sakit Umum Daerah Tanjung Priok akan dijamin kerahasiaannya.</p>\\n<p class=\\\"ql-align-justify\\\">Saya memberikan wewenang kepada Rumah Sakit untuk memberikan informasi tentang diagnosis, hasil pelayanan dan pengobatan serta catatan lainnya, bila diperlukan untuk memproses klaim asuransi / BPJS / perusahaan dan atau lembaga pemerintah.</p>\\n<p class=\\\"ql-align-justify\\\">Saya memberikan wewenang kepada Rumah Sakit untuk memberikan informasi tentang diagnosis hasil pelayanan dan pengobatan saya kepada anggota keluarga saya, seperti tercantum di bawah ini :</p>\\n<p class=\\\"ql-align-justify\\\">1. Nama : %namaAnggotaKeluarga1%</p>\\n<p class=\\\"ql-align-justify\\\">2. Nama : %namaAnggotaKeluarga2%</p>\\n<p class=\\\"ql-align-justify\\\">3. Nama : %namaAnggotaKeluarga3%</p>\\n<p class=\\\"ql-align-justify\\\">&nbsp;</p>\\n<p class=\\\"ql-align-justify\\\"><strong>III.&nbsp;BARANG BERHARGA MILIK PRIBADI</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya telah memahami bahwa rumah sakit tidak bertanggung jawab atas semua kehilangan barang-barang milik saya dan saya secara pribadi bertanggung jawab atas barang-barang berharga yang saya miliki termasuk namun tidak terbatas pada uang, perhiasan, buku cek, kartu kredit, handphone, atau barang lainnya. Dan apabila saya membutuhkan maka saya dapat menitipkan barang-barang saya pada rumah sakit.</p>\\n<p class=\\\"ql-align-justify\\\">Saya juga mengerti bahwa saya harus memberi tahu/ menitipkan pada Rumah Sakit jika saya memiliki gigi palsu, kacamata, lensa kontak, prothesik, atau barang lainnya yang saya butuhkan untuk diamakan.</p>\\n<p><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>IV.&nbsp;HAK PASIEN DAN KELUARGA </strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya telah mendapat informasi tentang hak dan kewajiban pasien di Rumah Sakit Umum Daerah Tanjung Priok melalui leafleat dan banner yang disediakan oleh petugas.</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>V.&nbsp;PELAYANAN KEROHANIAN</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya telah mendapat informasi tentang pelayanan kerohanian yang disediakan Rumah Sakit, dan saya dapat mengajukan pelayanan kerohanian petugas Rawat Inap jika saya membutuhkan.</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>VI.&nbsp;PEMELIHARAN FASILITAS RUMAH SAKIT</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya memahami dan mengerti jika terjadi kehilangan dan kerusakan fasilitas umum dan fasilitas medis yang disebabkan oleh saya atau keluarga saya maka hal tersebut menjadi tanggung jawab saya.</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>VII.&nbsp;KEINGINAN PRIVASI</strong></p>\\n<ol>\\n<li class=\\\"ql-align-justify\\\">Saya tidak mengijinkan Rumah Sakit memberi akses bagi keluarga dan handaitaulan serta orang yang akan menemui/ menjenguk saya (disebutkan nama dan profesi jika ada permintaan)</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Nama : %namaPenjenguk%</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Profesi : %profesiPenjenguk%</li>\\n<li class=\\\"ql-align-justify\\\">Saya menginginkan/ tidak menginginkan privasi khusus *)</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Pada saat wawancara kritis</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Pada saat pemeriksaan fisik</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Pada saat keperawatan</li>\\n<li class=\\\"ql-indent-1 ql-align-justify\\\">Lain-lain %lainLain%</li>\\n</ol>\\n<p class=\\\"ql-align-justify\\\">&nbsp;</p>\\n<p class=\\\"ql-align-justify\\\"><strong>VIII.&nbsp;INFORMASI RAWAT INAP</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya telah menerima informasi tentang peraturan yang dilakukan oleh Rumah Sakit dan saya beserta keluarga bersedia untuk mematuhinya, termasuk akan mematuhi jam berkunjung pasien sesuai dengan aturan Rumah Sakit.</p>\\n<p class=\\\"ql-align-justify\\\">Anggota keluarga saya yang menunggu saya bersedia untuk selalu memakai tanda pengenal khusus yang diberikan oleh Rumah Sakit dan demi keamanan seluruh pasien. Setiap keluarga dan siapapun yang akan mengunjungi saya diluar jam berkunjung untuk diminta/ diperiksa identitasnya. Serta, menukarkan identitas dengan kartu tamu/ kartu pengunjung demi keselamatan dan keamanan pasien dan keluarga.</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>IX.&nbsp;SARAN DAN KRITIK</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya dapat menyampaikan tentang keluhan terhadap pelayanan konflik atau dilema lain kepada Rumah Sakit Umum Daerah Tanjung Priok melalui SMS ke nomor 087720498182 atau melalui kotak saran yang tersedia disetiap lantai.</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>X.&nbsp;INFORMASI BIAYA</strong></p>\\n<p class=\\\"ql-align-justify\\\">Saya memahami tentang informasi biaya pengobatan atau biaya tindakan yang telah dijelaskan oleh petugas Rumah Sakit Rp %biayaPengobatanAtauBiayaTindakan%</p>\\n<p class=\\\"ql-align-justify\\\"><strong>&nbsp;</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>TANDA TANGAN</strong></p>\\n<p class=\\\"ql-align-justify\\\"><strong>Dengan tanda tangan saya dibawah ini</strong>&nbsp;saya menyatakan bahwa saya telah <strong>membaca</strong>&nbsp;dan&nbsp;<strong>memahami</strong>&nbsp;seluruh item pada persetujuan umum (general consent).</p>\"'),
(1702660612347, 1702660612347, 2, '[{\"label\":\"Nama\",\"name\":\"nama\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat\",\"name\":\"alamat\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tanggal Lahir\",\"name\":\"tanggalLahir\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":\"No. Telpon\",\"name\":\"noTelpon\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', '\"<p class=\\\"MsoNormal\\\" align=\\\"center\\\"><strong>PERSETUJUAN TINDAKAN/ PENGOBATAN KEDOKTERAN</strong></p>\\n<table style=\\\"border-collapse: collapse; width: 100%; border: 1px solid black;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 9.78261%;\\\"><col style=\\\"width: 26.9324%;\\\"><col style=\\\"width: 44.2029%;\\\"><col style=\\\"width: 19.0821%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td style=\\\"border-color: black; padding: 5px;\\\" colspan=\\\"4\\\">\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: center;\\\"><strong>PEMBERIAN INFORMASI</strong></p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Dokter Pelaksana Tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%dokterPelaksanaTindakan%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Pemberi Informasi</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%pemberiInformasi%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Penerima Infomasi / Pemberi Persetujuan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%penerimaInformasi%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>NO</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>JENIS INFORMASI</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>ISI INFORMASI</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>BERI TANDA (check)</strong></td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>1</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Diagnosis (diagnosis kerja &amp; diagnosis banding) dan dasar diagnosis</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%diagnosisKerjadanDiagnosisBanding%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>2</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kondisi Pasien</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kondisiPasien%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>3</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Tindakan yang diusulkan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%tindakanYangDiUsulkan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>4</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Tata cara dan tujuan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%tatacaraDanTujuanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>5</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Manfaat dan resiko tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%manfaatDanResikoTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>6</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Nama orang yangmengerjakan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%namaOrangYangMengerjakanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>7</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan alternative dan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%namaOrangYangMengerjakanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>8</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Prognosis dari tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%prognosisDariTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>9</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan hasil yang tidak terduga</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kemungkinanHasilYangTidakTerduga%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>10</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan hasil bila tidak dilakukan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kemungkinanHasilBilaTidakDilakukanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\" colspan=\\\"3\\\">Dengan ini menyatakan bahwa saya telah menerangkan hal-hal diatas secara benar-benar, jelas dan memberikan kesempatan untuk bertanya dan/atau berdiskusi</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>%ttdUser%</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: center; padding: 5px;\\\" colspan=\\\"4\\\"><strong>PERSETUJUAN TINDAKAN/PENGOBATAN KEDOKTERAN</strong></td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: center; padding: 5px;\\\" colspan=\\\"4\\\">\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Yang bertandatangan di bawah ini, saya,</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %namaPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Umur &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %umurPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Jenis Kelamin : laki-laki/perempuan</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Alamat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %alamatPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Dengan ini menyatakan persetujuan untuk dilakukannya tindakan/pengobatan :</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\"><span style=\\\"text-decoration: underline;\\\">%tindakanAtauPengobatan%</span> terhadap saya/Istri/Suami/Anak/Ayah/Ibu/wali</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %namaPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Umur &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %umurPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Jenis Kelamin &nbsp;: laki-laki/ Perempuan</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Alamat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %alamatPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Saya memahami perlunya dan manfaat tindakan tersebut sebagaimana telah dijelaskan seperti di atas kepada saya, termasuk risiko dan komplikasi yang mungkin timbul.</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Saya juga menyadari bahwa oleh karena ilmu kedokteran bukanlah ilmu pasti, maka keberhasilan tindakan kedokteran bukanlah keniscayaan, melainkan sangat bergantung kepada izin Tuhan Yang Maha Esa</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\"><span style=\\\"text-decoration: underline;\\\">%tahunBuat% %bulanBuat%</span>,&nbsp;&nbsp;tanggal <span style=\\\"text-decoration: underline;\\\">%tanggalBuat% </span>pukul <span style=\\\"text-decoration: underline;\\\">%pukulBuat%</span></p>\\n</td>\\n</tr>\\n</tbody>\\n</table>\\n<p>&nbsp;</p>\\n<p>&nbsp;</p>\\n<p>&nbsp;</p>\"'),
(1702663850788, 1702663850788, 3, '[{\"label\":\"Dokter Pelaksana Tindakan\",\"name\":\"dokterPelaksanaTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Pemberi Informasi\",\"name\":\"pemberiInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Penerima Informasi\",\"name\":\"penerimaInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Diagnosis (diagnosis kerja & diagnosis banding) dan dasar diagnosis\",\"name\":\"diagnosisDiagnosisKerjaDiagnosisBandingDanDasarDiagnosis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kondisi Pasien\",\"name\":\"kondisiPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan yang diusulkan\",\"name\":\"tindakanYangDiusulkan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tata cara dan tujuan tindakan\",\"name\":\"tataCaraDanTujuanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Manfaat dan resiko tindakan\",\"name\":\"manfaatDanResikoTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama orang yangmengerjakan tindakan\",\"name\":\"namaOrangYangmengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan alternative dan tindakan\",\"name\":\"kemungkinanAlternativeDanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Prognosis dari tindakan\",\"name\":\"prognosisDariTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil yang tidak terduga\",\"name\":\"kemungkinanHasilYangTidakTerduga\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil bila tidak dilakukan tindakan \",\"name\":\"kemungkinanHasilBilaTidakDilakukanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Yang Bertanda Tangan\",\"name\":\"namaYangBertandaTangan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Yang Bertanda Tangan\",\"name\":\"umurYangBertandaTangan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', '\"<p class=\\\"MsoNormal\\\" align=\\\"center\\\"><strong>PENOLAKAN TINDAKAN/ PENGOBATAN KEDOKTERAN</strong></p>\\n<table style=\\\"border-collapse: collapse; width: 100%; border: 1px solid black;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 9.78261%;\\\"><col style=\\\"width: 26.9324%;\\\"><col style=\\\"width: 44.2029%;\\\"><col style=\\\"width: 19.0821%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td style=\\\"border-color: black; padding: 5px;\\\" colspan=\\\"4\\\">\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: center;\\\"><strong>PEMBERIAN INFORMASI</strong></p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Dokter Pelaksana Tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%dokterPelaksanaTindakan%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Pemberi Informasi</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%pemberiInformasi%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">Penerima Infomasi / Pemberi Penolakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\" colspan=\\\"2\\\">%penerimaInformasi%</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>NO</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>JENIS INFORMASI</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>ISI INFORMASI</strong></td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>BERI TANDA (check)</strong></td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>1</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Diagnosis (diagnosis kerja &amp; diagnosis banding) dan dasar diagnosis</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%diagnosisKerjadanDiagnosisBanding%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>2</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kondisi Pasien</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kondisiPasien%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>3</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Tindakan yang diusulkan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%tindakanYangDiUsulkan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>4</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Tata cara dan tujuan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%tatacaraDanTujuanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>5</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Manfaat dan resiko tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%manfaatDanResikoTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>6</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Nama orang yangmengerjakan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%namaOrangYangMengerjakanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>7</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan alternative dan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%namaOrangYangMengerjakanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>8</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Prognosis dari tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%prognosisDariTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>9</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan hasil yang tidak terduga</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kemungkinanHasilYangTidakTerduga%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\"><strong>10</strong></td>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\">Kemungkinan hasil bila tidak dilakukan tindakan</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">%kemungkinanHasilBilaTidakDilakukanTindakan%</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\" colspan=\\\"3\\\">Dengan ini menyatakan bahwa saya telah menerangkan hal-hal diatas secara benar-benar, jelas dan memberikan kesempatan untuk bertanya dan/atau berdiskusi</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>%ttdUser%</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\" colspan=\\\"3\\\">\\n<p class=\\\"MsoNormal\\\">Dengan ini menyatakan bahwa saya telah menerima informasi sebagaimana di atas yang saya beri tanda/paraf di kolom kanannya, dan telah memahaminya</p>\\n</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>%ttdUser%</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: left; padding: 5px;\\\" colspan=\\\"3\\\">\\n<p class=\\\"MsoNormal\\\">*Bila pasien tidak kompeten atau tidak mau menerima informasi, maka penerima informasi adalah wali atau keluarga terdekat</p>\\n</td>\\n<td style=\\\"text-align: center; border: 1px solid black; padding: 5px;\\\">\\n<p>&nbsp;</p>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: center; padding: 5px;\\\" colspan=\\\"4\\\"><strong>PENOLAKAN TINDAKAN/PENGOBATAN KEDOKTERAN</strong></td>\\n</tr>\\n<tr>\\n<td style=\\\"border: 1px solid black; text-align: center; padding: 5px;\\\" colspan=\\\"4\\\">\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Yang bertandatangan di bawah ini, saya,</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %namaPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Umur &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %umurPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Jenis Kelamin : laki-laki/perempuan</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Alamat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %alamatPasienAtauWali%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Dengan ini menyatakan persetujuan untuk dilakukannya tindakan/pengobatan :</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\"><span style=\\\"text-decoration: underline;\\\">%tindakanAtauPengobatan%</span> terhadap saya/Istri/Suami/Anak/Ayah/Ibu/wali</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %namaPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Umur &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %umurPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Jenis Kelamin &nbsp;: laki-laki/ Perempuan</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Alamat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: %alamatPasien%</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Saya memahami perlunya dan manfaat tindakan tersebut sebagaimana telah dijelaskan seperti di atas kepada saya, termasuk risiko dan komplikasi yang mungkin timbul.</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\">Saya juga menyadari bahwa oleh karena ilmu kedokteran bukanlah ilmu pasti, maka keberhasilan tindakan kedokteran bukanlah keniscayaan, melainkan sangat bergantung kepada izin Tuhan Yang Maha Esa</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: left;\\\"><span style=\\\"text-decoration: underline;\\\">%tahunBuat% %bulanBuat%</span>,&nbsp;&nbsp;tanggal <span style=\\\"text-decoration: underline;\\\">%tanggalBuat% </span>pukul <span style=\\\"text-decoration: underline;\\\">%pukulBuat%</span></p>\\n</td>\\n</tr>\\n</tbody>\\n</table>\\n<p>&nbsp;</p>\"'),
(1702705276705, 1702705276705, 4, '[{\"label\":\"Dokter Pelaksana Tindakan\",\"name\":\"dokterPelaksanaTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Pemberi Informasi\",\"name\":\"pemberiInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Penerima Informasi\",\"name\":\"penerimaInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Diagnosis (diagnosis kerja & diagnosis banding) dan dasar diagnosis\",\"name\":\"diagnosisDiagnosisKerjaDiagnosisBandingDanDasarDiagnosis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kondisi Pasien\",\"name\":\"kondisiPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan yang diusulkan\",\"name\":\"tindakanYangDiusulkan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tata cara dan tujuan tindakan\",\"name\":\"tataCaraDanTujuanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Manfaat dan resiko tindakan\",\"name\":\"manfaatDanResikoTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama orang yangmengerjakan tindakan\",\"name\":\"namaOrangYangmengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan alternative dan tindakan\",\"name\":\"kemungkinanAlternativeDanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Prognosis dari tindakan\",\"name\":\"prognosisDariTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil yang tidak terduga\",\"name\":\"kemungkinanHasilYangTidakTerduga\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil bila tidak dilakukan tindakan \",\"name\":\"kemungkinanHasilBilaTidakDilakukanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Yang Bertanda Tangan\",\"name\":\"namaYangBertandaTangan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Yang Bertanda Tangan\",\"name\":\"umurYangBertandaTangan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', '\"<p class=\\\"MsoNormal\\\" style=\\\"text-align: center; line-height: 2;\\\"><span style=\\\"font-size: 10pt;\\\"><strong>PERNYATAAN PERSETUJUAN RAWAT BERSAMA</strong></span></p>\\n<table style=\\\"border-collapse: collapse; width: 100%; border: 1px solid rgb(0, 0, 0);\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 99.8815%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td style=\\\"padding: 5px; border-color: rgb(0, 0, 0); line-height: 2;\\\">\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Yang bertanda tangan di bawah ini :</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Nama : %namaPasienAtauWali% L/P*</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Umur : %umurPasienAtauWali% Tahun</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Alamat : %alamatPasienAtauWali%</span></p>\\n<p class=\\\"MsoNormal\\\" align=\\\"justify\\\">&nbsp;</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Dalam hal ini bertindak sebagai diri sendiri / suami / istri / ayah / ibu / wali penanggung jawab * dari pasien:</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Nama : %namaPasien% L/P*</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">No Rekam Medis : %noRekamMedis%</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Umur : %umurPasien%Tahun</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Alamat : %alamatPasien%</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\">&nbsp;</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Saya telah mendapatkan penjelasan sepenuhnya dari Dokter mengenai sifat dan tujuan untuk menjalani rawat bersama, serta telah mendapatkan informasi dari Petugas mengenai tata tertib dan biaya perawatan di RSUD Tanjung Priok, Dengan demikian saya menyatakan :</span></p>\\n<p style=\\\"line-height: 2;\\\"><span style=\\\"font-size: 10pt;\\\"><!-- [if !supportLists]-->1. Setuju untuk dilakukan rawat bersama di RSUD Tanjung Priok</span></p>\\n<table style=\\\"border-collapse: collapse; width: 100.613%; height: 77.1718px; border-width: 0px;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 15.4802%;\\\"><col style=\\\"width: 14.8451%;\\\"><col style=\\\"width: 20.4039%;\\\"><col style=\\\"width: 12.7%;\\\"><col style=\\\"width: 9.12936%;\\\"><col style=\\\"width: 27.3881%;\\\"></colgroup>\\n<tbody>\\n<tr style=\\\"height: 22.3906px;\\\">\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Nama Dokter I&nbsp; :</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\" colspan=\\\"2\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterI%</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Nama Dokter II&nbsp; :</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\" colspan=\\\"2\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterII%</span></td>\\n</tr>\\n<tr style=\\\"height: 22.3906px;\\\">\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Sebagai Dokter :</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Umum</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\">&nbsp;</td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Sebagai Dokter&nbsp; :</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Umum</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\">&nbsp;</td>\\n</tr>\\n<tr style=\\\"height: 22.3906px;\\\">\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\">&nbsp;</td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Spesialis</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterSpesialisI%</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\">&nbsp;</td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Spesialis</span></td>\\n<td style=\\\"height: 22.3906px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterSpesialisII%</span></td>\\n</tr>\\n<tr style=\\\"height: 10px;\\\">\\n<td style=\\\"height: 10px; border-width: 0px;\\\">&nbsp;</td>\\n<td style=\\\"height: 10px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Sub Spesialis</span></td>\\n<td style=\\\"height: 10px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterSubSpesialisI%</span></td>\\n<td style=\\\"height: 10px; border-width: 0px;\\\">&nbsp;</td>\\n<td style=\\\"height: 10px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">Sub Spesialias</span></td>\\n<td style=\\\"height: 10px; border-width: 0px;\\\"><span style=\\\"font-size: 10pt;\\\">%namaDokterSubSpesialisII%</span></td>\\n</tr>\\n</tbody>\\n</table>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\"><!-- [if !supportLists]--><span style=\\\"mso-list: Ignore;\\\">2.&nbsp;</span><!--[endif]-->Setuju dan memberi ijin kepada Dokter tersebut &nbsp;untuk merawat saya/pasien tersebut diatas</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\"><!-- [if !supportLists]--><span style=\\\"mso-list: Ignore;\\\">3.&nbsp;</span><!--[endif]-->Telah menyetujui dan telah bersedia mentaati segala peraturan dan tata tertib di RSUD Tanjung Priok</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\"><!-- [if !supportLists]--><span style=\\\"mso-list: Ignore;\\\">4.&nbsp;</span><!--[endif]-->Sanggup dan bersedia membayar seluruh biaya perawatan sesuai dengan dokter yang saya kehendaki.</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\"><!-- [if !supportLists]--><span style=\\\"mso-list: Ignore;\\\">5.&nbsp;</span><!--[endif]-->Memberi kuasa kepada Dokter/Rumah Sakit untuk memberikan keterangan yang diperlukan oleh pihak penanggung biaya perawatan saya/pasien tersebut diatas.</span></p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\">&nbsp;</p>\\n<p class=\\\"MsoNormal\\\" style=\\\"line-height: 2;\\\" align=\\\"justify\\\"><span style=\\\"font-size: 10pt;\\\">Demikian pernyataan ini saya buat dengan penuh kesadaran dan tanpa paksaan pihak manapun.</span></p>\\n<table style=\\\"border-collapse: collapse; width: 100.08%;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 49.9601%;\\\"><col style=\\\"width: 49.9601%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td>&nbsp;</td>\\n<td style=\\\"text-align: right;\\\"><span style=\\\"font-size: 10pt;\\\">Jakarta,%tanggalBuat% Jam : %pukulBuat%</span></td>\\n</tr>\\n</tbody>\\n</table>\\n</td>\\n</tr>\\n<tr>\\n<td style=\\\"padding: 5px; border-color: rgb(0, 0, 0);\\\">\\n<p class=\\\"MsoNormal\\\" align=\\\"justify\\\">&nbsp;</p>\\n</td>\\n</tr>\\n</tbody>\\n</table>\\n<p class=\\\"MsoNormal\\\" style=\\\"text-align: center; line-height: 2;\\\">&nbsp;</p>\"'),
(1702713180022, 1702713180022, 5, '[{\"label\":\"Dokter Pelaksana Tindakan\",\"name\":\"dokterPelaksanaTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Pemberi Informasi\",\"name\":\"pemberiInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Penerima Infomasi / Pemberi Persetujuan\",\"name\":\"penerimaInfomasiPemberiPersetujuan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Diagnosis Kerja dan Diagnosis Banding\",\"name\":\"diagnosisKerjaDanDiagnosisBanding\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kondisi Pasien\",\"name\":\"kondisiPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan Yang di Usulkan\",\"name\":\"tindakanYangDiUsulkan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tata Cara Dan Tujuan Tindakan\",\"name\":\"tataCaraDanTujuanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Manfaat Dan Resiko Tindakan\",\"name\":\"manfaatDanResikoTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Orang Yang Mengerjakan Tindakan\",\"name\":\"namaOrangYangMengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Orang Yang Mengerjakan Tindakan\",\"name\":\"namaOrangYangMengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Prognosis Dari Tindakan\",\"name\":\"prognosisDariTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan Hasil Yang Tidak Terduga\",\"name\":\"kemungkinanHasilYangTidakTerduga\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan Hasil Bila Tidak Dilakukan Tindakan\",\"name\":\"kemungkinanHasilBilaTidakDilakukanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien Atau Wali\",\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien Atau Wali\",\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien Atau Wali\",\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan Atau Pengobatan\",\"name\":\"tindakanAtauPengobatan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien\",\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien\",\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien\",\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tanggal\",\"name\":\"tanggal\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702714195802, 1702714195802, 6, '[{\"label\":\"Dokter Pelaksana Tindakan\",\"name\":\"dokterPelaksanaTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Pemberi Informasi\",\"name\":\"pemberiInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Penerima Infomasi / Pemberi Persetujuan\",\"name\":\"penerimaInfomasiPemberiPersetujuan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Diagnosis Kerja dan Diagnosis Banding\",\"name\":\"diagnosisKerjaDanDiagnosisBanding\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kondisi Pasien\",\"name\":\"kondisiPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan Yang di Usulkan\",\"name\":\"tindakanYangDiUsulkan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tata Cara Dan Tujuan Tindakan\",\"name\":\"tataCaraDanTujuanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Manfaat Dan Resiko Tindakan\",\"name\":\"manfaatDanResikoTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Orang Yang Mengerjakan Tindakan\",\"name\":\"namaOrangYangMengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Orang Yang Mengerjakan Tindakan\",\"name\":\"namaOrangYangMengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Prognosis Dari Tindakan\",\"name\":\"prognosisDariTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan Hasil Yang Tidak Terduga\",\"name\":\"kemungkinanHasilYangTidakTerduga\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan Hasil Bila Tidak Dilakukan Tindakan\",\"name\":\"kemungkinanHasilBilaTidakDilakukanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien Atau Wali\",\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien Atau Wali\",\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien Atau Wali\",\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan Atau Pengobatan\",\"name\":\"tindakanAtauPengobatan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien\",\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien\",\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien\",\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tanggal\",\"name\":\"tanggal\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL);
INSERT INTO `dynamic_form` (`createdAt`, `updatedAt`, `id`, `form_field`, `formulir`) VALUES
(1702717256614, 1702717256614, 7, '[{\"label\":\"Dokter Pelaksana Tindakan\",\"name\":\"dokterPelaksanaTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Pemberi Informasi\",\"name\":\"pemberiInformasi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Penerima Infomasi / Pemberi Penolakan\",\"name\":\"penerimaInfomasiPemberiPenolakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Diagnosis (diagnosis kerja & diagnosis banding) dan dasar diagnosis\",\"name\":\"diagnosisDiagnosisKerjaDiagnosisBandingDanDasarDiagnosis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kondisi Pasien\",\"name\":\"kondisiPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan yang diusulkan\",\"name\":\"tindakanYangDiusulkan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tata cara dan tujuan tindakan\",\"name\":\"tataCaraDanTujuanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Manfaat dan resiko tindakan\",\"name\":\"manfaatDanResikoTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama orang yangmengerjakan tindakan\",\"name\":\"namaOrangYangmengerjakanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan alternative dan tindakan\",\"name\":\"kemungkinanAlternativeDanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Prognosis dari tindakan\",\"name\":\"prognosisDariTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil yang tidak terduga\",\"name\":\"kemungkinanHasilYangTidakTerduga\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Kemungkinan hasil bila tidak dilakukan tindakan \",\"name\":\"kemungkinanHasilBilaTidakDilakukanTindakan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Penolak\",\"name\":\"namaPenolak\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Penolak\",\"name\":\"umurPenolak\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Jenis Kelamin Penolak\",\"name\":\"jenisKelaminPenolak\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":\"Alamat Penolak\",\"name\":\"alamatPenolak\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tindakan Atau Pengobatan\",\"name\":\"tindakanAtauPengobatan\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien\",\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien\",\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Jenis Kelamin Pasien\",\"name\":\"jenisKelaminPasien\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":\"Alamat Pasien\",\"name\":\"alamatPasien\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Tanggal\",\"name\":\"tanggal\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702717910712, 1702717910712, 8, '[{\"label\":\"Nama\",\"name\":\"nama\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Jenis Kelamin\",\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]}]', NULL),
(1702718268339, 1702718268339, 9, '[{\"label\":\"Nama\",\"name\":\"nama\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Jenis Kelamin\",\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":\"Alamat\",\"name\":\"alamat\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien\",\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"No. Rekam Medis\",\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien\",\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien\",\"name\":\"alamatPasien\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Dokter I\",\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Sebagai Dokter\",\"name\":\"sebagaiDokter\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"Umum\",\"Spesialis\",\"Sub Spesialis\"]},{\"label\":\"Nama Dokter II\",\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Sebagai Dokter\",\"name\":\"sebagaiDokter\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"Umum\",\"Spesialis\",\"Sub Spesialis\"]},{\"label\":\"Tanggal\",\"name\":\"tanggal\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702718456925, 1702718456925, 10, '[{\"label\":\"Nama\",\"name\":\"nama\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Jenis Kelamin\",\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":\"Alamat\",\"name\":\"alamat\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Pasien\",\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"No. Rekam Medis\",\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Umur Pasien\",\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Alamat Pasien\",\"name\":\"alamatPasien\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Nama Dokter I\",\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Sebagai Dokter\",\"name\":\"sebagaiDokter\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"Umum\",\"Spesialis\",\"Sub Spesialis\"]},{\"label\":\"Nama Dokter II\",\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":\"Sebagai Dokter\",\"name\":\"sebagaiDokter\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"Umum\",\"Spesialis\",\"Sub Spesialis\"]},{\"label\":\"Ruang Kelas\",\"name\":\"ruangKelas\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"1\",\"2\",\"3\"]},{\"label\":\"Tanggal Masuk\",\"name\":\"tanggalMasuk\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702721536157, 1702721536157, 11, '[{\"label\":\"Nama Atau Wali\",\"name\":\"namaAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702724868269, 1702724868269, 12, '[{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702725211600, 1702725211600, 13, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Buat\"},\"name\":\"tanggalBuat\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702726268477, 1702726268477, 14, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Buat\"},\"name\":\"tanggalBuat\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Jenis Kelamin\"},\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]}]', NULL),
(1702727061533, 1702727061533, 15, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Jenis Kelamin\"},\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":{\"name\":\"Tanggal Lahir Pasien\"},\"name\":\"tanggalLahirPasien\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Masuk Rawat Inap\"},\"name\":\"tanggalMasukRawatInap\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702727678786, 1702727678786, 16, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien\"},\"name\":\"tanggalLahirPasien\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Jenis Kelamin\"},\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":{\"name\":\"Tanggal Masuk Rawat Inap\"},\"name\":\"tanggalMasukRawatInap\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702728175326, 1702728175326, 17, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien\"},\"name\":\"tanggalLahirPasien\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Jenis Kelamin\"},\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":{\"name\":\"Tanggal Masuk Rawat Inap\"},\"name\":\"tanggalMasukRawatInap\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702728284353, 1702728284353, 18, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien atau Wali\"},\"name\":\"umurPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Pasien\"},\"name\":\"namaPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Jenis Kelamin\"},\"name\":\"jenisKelamin\",\"type\":\"radio\",\"validation\":\"required\",\"options\":[\"laki-laki\",\"perempuan\"]},{\"label\":{\"name\":\"Tanggal Lahir Pasien\"},\"name\":\"tanggalLahirPasien\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Rekam Medis\"},\"name\":\"noRekamMedis\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Umur Pasien\"},\"name\":\"umurPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien\"},\"name\":\"alamatPasien\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter I\"},\"name\":\"namaDokterI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter II\"},\"name\":\"namaDokterIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis I\"},\"name\":\"namaDokterSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Spesialis II\"},\"name\":\"namaDokterSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis I\"},\"name\":\"namaDokterSubSpesialisI\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Dokter Sub Spesialis II\"},\"name\":\"namaDokterSubSpesialisIi\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Masuk Rawat Inap\"},\"name\":\"tanggalMasukRawatInap\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702728911471, 1702728911471, 19, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702728980646, 1702728980646, 20, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702729296283, 1702729296283, 21, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702729413024, 1702729413024, 22, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Penjenguk\"},\"name\":\"namaPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Profesi Penjenguk\"},\"name\":\"profesiPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702729530952, 1702729530952, 23, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Penjenguk\"},\"name\":\"namaPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Profesi Penjenguk\"},\"name\":\"profesiPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Saya menginginkan atau tidak menginginkan privasi khusus\"},\"name\":\"sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus\",\"type\":\"checkbox\",\"validation\":\"required\",\"options\":[\"a.Pada saat wawancara kritis\",\"b.Pada saat pemeriksaan fisik\",\"c.Pada saat keperawatan\",\"Lain-lain\"]}]', NULL),
(1702729669291, 1702729669291, 24, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Penjenguk\"},\"name\":\"namaPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Profesi Penjenguk\"},\"name\":\"profesiPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Saya Menginginkan atau Tidak Menginginkan Privasi Khusus\"},\"name\":\"sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus\",\"type\":\"checkbox\",\"validation\":\"required\",\"options\":[\"Pada saat wawancara kritis\",\"Pada saat pemeriksaan fisik\",\"Pada saat keperawatan\",\"lain-lain\"]}]', NULL),
(1702729686926, 1702729686926, 25, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Penjenguk\"},\"name\":\"namaPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Profesi Penjenguk\"},\"name\":\"profesiPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Saya Menginginkan atau Tidak Menginginkan Privasi Khusus\"},\"name\":\"sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus\",\"type\":\"checkbox\",\"validation\":\"required\",\"options\":[\"Pada saat wawancara kritis\",\"Pada saat pemeriksaan fisik\",\"Pada saat keperawatan\",\"lain-lain\"]},{\"label\":{\"name\":\"Biaya Pengobatan atau Biaya Tindakan\"},\"name\":\"biayaPengobatanAtauBiayaTindakan\",\"type\":\"number\",\"validation\":\"required\",\"options\":[]}]', NULL),
(1702731157968, 1702731157968, 26, '[{\"label\":{\"name\":\"Nama Pasien atau Wali\"},\"name\":\"namaPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Tanggal Lahir Pasien Atau Wali\"},\"name\":\"tanggalLahirPasienAtauWali\",\"type\":\"date\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Alamat Pasien atau Wali\"},\"name\":\"alamatPasienAtauWali\",\"type\":\"textarea\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"No Telpon pasien Atau Wali\"},\"name\":\"noTelponPasienAtauWali\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 1\"},\"name\":\"namaAnggotaKeluarga1\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 2\"},\"name\":\"namaAnggotaKeluarga2\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Anggota Keluarga 3\"},\"name\":\"namaAnggotaKeluarga3\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Nama Penjenguk\"},\"name\":\"namaPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Profesi Penjenguk\"},\"name\":\"profesiPenjenguk\",\"type\":\"text\",\"validation\":\"required\",\"options\":[]},{\"label\":{\"name\":\"Saya Menginginkan atau Tidak Menginginkan Privasi Khusus\"},\"name\":\"sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus\",\"type\":\"checkbox\",\"validation\":\"required\",\"options\":[\"Pada saat wawancara kritis\",\"Pada saat pemeriksaan fisik\",\"Pada saat keperawatan\",\"lain-lain\"]},{\"label\":{\"name\":\"Biaya Pengobatan atau Biaya Tindakan\"},\"name\":\"biayaPengobatanAtauBiayaTindakan\",\"type\":\"number\",\"validation\":\"required\",\"options\":[]}]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `formdatapasien`
--

CREATE TABLE `formdatapasien` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `noRawat` varchar(255) DEFAULT NULL,
  `formulir` varchar(255) DEFAULT NULL,
  `dataJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dataJson`)),
  `isDeleted` tinyint(1) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `deletedAt` longtext DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formdatapasien`
--

INSERT INTO `formdatapasien` (`createdAt`, `updatedAt`, `id`, `noRawat`, `formulir`, `dataJson`, `isDeleted`, `deletedBy`, `deletedAt`, `status`) VALUES
(1702734991367, 1702734991367, 5, '2023/12/14/000010', '1', '{\"namaPasienAtauWali\":\"Ratna\",\"tanggalLahirPasienAtauWali\":\"2023-12-13T17:00:00.000Z\",\"alamatPasienAtauWali\":\"Perumahan Buana Asri\",\"noTelponPasienAtauWali\":\"082119305818\",\"namaAnggotaKeluarga1\":\"Latansa\",\"namaAnggotaKeluarga2\":\"\",\"namaAnggotaKeluarga3\":\"\",\"namaPenjenguk\":\"\",\"profesiPenjenguk\":\"\",\"sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus\":{\"Pada saat wawancara kritis\":false,\"Pada saat pemeriksaan fisik\":false,\"Pada saat keperawatan\":false,\"lain-lain\":false},\"biayaPengobatanAtauBiayaTindakan\":\"25000\"}', 0, '', NULL, ''),
(1702735808925, 1702735808925, 6, '2023/12/14/000010', '4', '{\"namaPasienAtauWali\":\"Sari\",\"umurPasienAtauWali\":\"23\",\"alamatPasienAtauWali\":\"Perumahan Buana Asri\",\"namaPasien\":\"Ratna\",\"jenisKelamin\":\"perempuan\",\"tanggalLahirPasien\":\"2023-12-12T00:00:00.000+07:00\",\"noRekamMedis\":\"RM001\",\"umurPasien\":28,\"alamatPasien\":\"Perumahan Buana Asri\",\"namaDokterI\":\"Hendra\",\"namaDokterIi\":\"Hendra\",\"namaDokterSpesialisI\":\"\",\"namaDokterSpesialisIi\":\"\",\"namaDokterSubSpesialisI\":\"\",\"namaDokterSubSpesialisIi\":\"\",\"tanggalMasukRawatInap\":\"\"}', 0, '', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `form_manager`
--

CREATE TABLE `form_manager` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `deletedAt` longtext DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `dynamicForm` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_manager`
--

INSERT INTO `form_manager` (`createdAt`, `updatedAt`, `id`, `name`, `description`, `isDeleted`, `deletedBy`, `deletedAt`, `status`, `dynamicForm`) VALUES
(1702306818369, 1702731158217, 1, 'General Concent', 'Form', 0, '', NULL, '', 26),
(1702717851085, 1702728284451, 4, 'PERNYATAAN PERSETUJUAN RAWAT BERSAMA', 'Form', 0, '', NULL, '', 18);

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `no_rkm_medis` varchar(255) DEFAULT NULL,
  `nm_pasien` varchar(255) DEFAULT NULL,
  `no_ktp` varchar(255) DEFAULT NULL,
  `jk` varchar(255) DEFAULT NULL,
  `tmp_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `stts_nikah` varchar(255) DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `no_tlp` varchar(255) DEFAULT NULL,
  `no_peserta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`createdAt`, `updatedAt`, `id`, `no_rkm_medis`, `nm_pasien`, `no_ktp`, `jk`, `tmp_lahir`, `tgl_lahir`, `alamat`, `stts_nikah`, `agama`, `no_tlp`, `no_peserta`) VALUES
(1702301885295, 1702301885295, 1, 'RM001', 'Ratna', '123456', 'L', 'Bogor', '2023-12-14', 'Perumahan Buana Asri', 'MENIKAH', 'Islam', '082119305818', 'PST001'),
(1702301901140, 1702301901140, 2, 'RM002', 'Sari', '123456', 'L', 'Bogor', '2023-12-14', 'Perumahan Buana Asri', 'MENIKAH', 'Islam', '082119305818', 'PST001'),
(1702394202281, 1702394202281, 15, 'RM003', 'Lina', '1234511', 'P', 'Bogor', '2023-12-14', 'Perumahan Buana Asri', 'MENIKAH', 'Islam', '082119305818', 'PST001'),
(1702660356725, 1702660356725, 16, 'RM004', 'Andi', '1234512', 'L', 'Bogor', '2023-12-06', 'Perumahan Buana Asri', 'MENIKAH', 'Islam', '082119305817', 'PST002');

-- --------------------------------------------------------

--
-- Table structure for table `penjab`
--

CREATE TABLE `penjab` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `kd_pj` varchar(255) NOT NULL,
  `png_jawab` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penjab`
--

INSERT INTO `penjab` (`createdAt`, `updatedAt`, `id`, `kd_pj`, `png_jawab`) VALUES
(1702301920134, 1702301920134, 1, 'PJ001', 'Jojon'),
(1702301927912, 1702301927912, 2, 'PJ002', 'Andi');

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `nip` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `jk` varchar(255) DEFAULT NULL,
  `tmp_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gol_darah` varchar(255) DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `stts_nikah` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `kd_jbtn` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`createdAt`, `updatedAt`, `id`, `nip`, `nama`, `jk`, `tmp_lahir`, `tgl_lahir`, `gol_darah`, `agama`, `stts_nikah`, `alamat`, `kd_jbtn`, `no_telp`, `status`) VALUES
(1702301941039, 1702301941039, 1, '123456', 'Joni', 'L', 'Bogor', '1989-04-15', 'O', 'Islam', 'MENIKAH', 'Perubahan Bogor Asri', 'JBT001', '082119305588', '1'),
(1702301954046, 1702301954046, 2, '123457', 'Ardi', 'L', 'Bogor', '1989-04-15', 'O', 'Islam', 'MENIKAH', 'Perubahan Bogor Asri', 'JBT001', '082119305588', '1');

-- --------------------------------------------------------

--
-- Table structure for table `poliklinik`
--

CREATE TABLE `poliklinik` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `kd_poli` varchar(255) NOT NULL,
  `nm_poli` varchar(255) DEFAULT NULL,
  `registrasi` double DEFAULT NULL,
  `registrasilama` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poliklinik`
--

INSERT INTO `poliklinik` (`createdAt`, `updatedAt`, `id`, `kd_poli`, `nm_poli`, `registrasi`, `registrasilama`) VALUES
(1702301969806, 1702301969806, 1, 'PLI001', 'Penyakit Dalam', 123456, 1234567),
(1702301989811, 1702301989811, 2, 'PLI002', 'Syaraf', 123457, 1234568);

-- --------------------------------------------------------

--
-- Table structure for table `reg_periksa`
--

CREATE TABLE `reg_periksa` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `no_reg` varchar(255) DEFAULT NULL,
  `no_rawat` varchar(255) NOT NULL,
  `tgl_registrasi` date DEFAULT NULL,
  `jam_reg` time DEFAULT NULL,
  `no_rkm_medis` varchar(255) DEFAULT NULL,
  `p_jawab` varchar(255) DEFAULT NULL,
  `almt_pj` varchar(255) DEFAULT NULL,
  `hubunganpj` varchar(255) DEFAULT NULL,
  `biaya_reg` double DEFAULT NULL,
  `stts` varchar(255) DEFAULT NULL,
  `stts_daftar` varchar(255) DEFAULT NULL,
  `status_lanjut` varchar(255) DEFAULT NULL,
  `umurdaftar` double DEFAULT NULL,
  `sttsumur` varchar(255) DEFAULT NULL,
  `status_bayar` varchar(255) DEFAULT NULL,
  `status_poli` varchar(255) DEFAULT NULL,
  `kd_dokter` varchar(255) DEFAULT NULL,
  `kd_poli` varchar(255) DEFAULT NULL,
  `kd_pj` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reg_periksa`
--

INSERT INTO `reg_periksa` (`createdAt`, `updatedAt`, `id`, `no_reg`, `no_rawat`, `tgl_registrasi`, `jam_reg`, `no_rkm_medis`, `p_jawab`, `almt_pj`, `hubunganpj`, `biaya_reg`, `stts`, `stts_daftar`, `status_lanjut`, `umurdaftar`, `sttsumur`, `status_bayar`, `status_poli`, `kd_dokter`, `kd_poli`, `kd_pj`) VALUES
(1702661950901, 1702661950901, 1, '123428', '2023/12/14/000010', '2023-12-15', '21:00:00', 'RM001', 'Cucut', 'Perubahan Bogor Asri', 'kakak', 5000, 'Belum', 'Lama', 'Ralan', 28, 'Th', 'Belum Bayar', 'Lama', 'DK001', 'PLI002', 'PJ001');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` double NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`createdAt`, `updatedAt`, `id`, `id_user`, `password`) VALUES
(1702299544744, 1702299544744, 1, 'AD001', '123456'),
(1702299554666, 1702299554666, 2, 'AD002', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archive`
--
ALTER TABLE `archive`
  ADD PRIMARY KEY (`kd_dokter`),
  ADD UNIQUE KEY `kd_dokter` (`kd_dokter`);

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`kd_dokter`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `kd_dokter` (`kd_dokter`);

--
-- Indexes for table `dynamic_form`
--
ALTER TABLE `dynamic_form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `formdatapasien`
--
ALTER TABLE `formdatapasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `form_manager`
--
ALTER TABLE `form_manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `no_rkm_medis` (`no_rkm_medis`);

--
-- Indexes for table `penjab`
--
ALTER TABLE `penjab`
  ADD PRIMARY KEY (`kd_pj`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `kd_pj` (`kd_pj`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`nip`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nip` (`nip`);

--
-- Indexes for table `poliklinik`
--
ALTER TABLE `poliklinik`
  ADD PRIMARY KEY (`kd_poli`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `kd_poli` (`kd_poli`);

--
-- Indexes for table `reg_periksa`
--
ALTER TABLE `reg_periksa`
  ADD PRIMARY KEY (`no_rawat`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `no_rawat` (`no_rawat`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dynamic_form`
--
ALTER TABLE `dynamic_form`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `formdatapasien`
--
ALTER TABLE `formdatapasien`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `form_manager`
--
ALTER TABLE `form_manager`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `penjab`
--
ALTER TABLE `penjab`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `poliklinik`
--
ALTER TABLE `poliklinik`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reg_periksa`
--
ALTER TABLE `reg_periksa`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
