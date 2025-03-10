import express from 'express'

// Token
import { getDataUser, insertDataUser, login, logout, changePassword, loginadmin, logoutadmin } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { verifyCsrfToken } from '../middleware/VerifyCsrfToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

// References
import { getDataRumahSakit, getDataRumahSakitFilterbyKabKotaId } from '../controllers/RumahSakitController.js'
import { getDataJenisPelayanan } from '../controllers/JenisPelayananController.js'
import { getDataCaraPembayaran } from '../controllers/CaraPembayaranController.js'
import { getDataJenisSpesialis } from '../controllers/JenisSpesialisController.js'
import { getDataJenisKegiatan, getDataJenisKegiatanLab } from '../controllers/JenisKegiatanController.js'
import { getDataJenisTindakan, getDataGroupJenisTindakan } from '../controllers/JenisGroupTindakanController.js'
import { getMetoda } from '../controllers/MetodaController.js'
import { getGolonganObat } from '../controllers/GolonganObatController.js'
import { getNoUrut } from '../controllers/NoUrutController.js'
import { getIcd10 } from '../controllers/Icd10Controller.js'
import { getDataJenisGolSebabPenyakit, getDataJenisGolSebabPenyakitA, getDataJenisGolSebabPenyakitAbyId, getDataJenisGolSebabPenyakitASebab} from "../controllers/JenisGolSebabPenyakitController.js"
import { getDataJenisGolonganSebabPenyakit, getDataJenisGolonganSebabPenyakitB, getDataJenisGolonganSebabPenyakitBId } from '../controllers/JenisGolonganSebabPenyakitController.js'
import { getDataJenisGolonganPenyakitB, getDataJenisGolonganPenyakitBId} from '../controllers/JenisGolonganPenyakitController.js'
import { getDataKabKota, getDataKabKotabyID, getDataProvinsi } from '../controllers/KabKotaController.js'
import { getDataValidasiByRsId, insertValidasi, updateValidasi, getStatusValidasi } from '../controllers/ValidasiController.js'
import { getKriteriaUser } from '../controllers/KriteriaUserController.js'

// Absensi
import { getAbsensi } from "../controllers/AbsensiController.js";

// Provinsi
import {
    getProvinsi,
    showProvinsi,
  } from "../controllers/ProvinsiController.js";
  
  // KabKota
  import { getKabKota, showKabKota } from "../controllers/KabKotaBaruController.js";
  

// RL 1.2
import { getDatarlSatuTitikDua, insertDataRLSatuTitikDua,updateDatarlSatuTitikDua, 
    getrlSatuTitikDuaById,deleteDataRLSatuTitikDua, getDataRLSatuTitikDuaKodeRSTahun, getDatarlSatuTitikDuaForRSOnline} from '../controllers/RLSatuTitikDuaController.js'

// RL 1.3
import { getDataRLSatuTitikTiga, getDataRLSatuTitikTigaDetailById,
    insertDataRLSatuTitikTiga, updateDataRLSatuTitikTiga, deleteDataRLSatuTitikTiga, getDataRLSatuTitikTigaKodeRSTahun } from '../controllers/RLSatuTitikTigaController.js'

// RL 3.1
import { getDataRLTigaTitikSatu, getDataRLTigaTitikSatuDetailById,
    insertDataRLTigaTitikSatu, updateDataRLTigaTitikSatu, deleteDataRLTigaTitikSatu, getDataRLTigaTitikSatuKodeRSTahun } from '../controllers/RLTigaTitikSatuController.js'

// RL 3.2
import { getDataRLTigaTitikDua, insertDataRLTigaTitikDua, deleteDataRLTigaTitikDua, 
    getDataRLTigaTitikDuaDetail, updateDataRLTigaTitikDua, getDataRLTigaTitikDuaKodeRSTahun } from '../controllers/RLTigaTitikDuaController.js'

// RL 3.3
import { getDataRLTigaTitikTiga, insertDataRLTigaTitikTiga, getDataRLTigaTitikTigaDetail, 
    getRLTigaTitikTigaById, updateDataRLTigaTitikTiga, deleteDataRLTigaTitikTiga, getDataRLTigaTitikTigaKodeRSTahun } from '../controllers/RLTigaTitikTigaController.js'

// RL 3.4
import { getDataRLTigaTitikEmpat, getRLTigaTitikEmpatById, 
    insertDataRLTigaTitikEmpat, updateDataRLTigaTitikEmpat, deleteDataRLTigaTitikEmpat, getDataRLTigaTitikEmpatKodeRSTahun } from '../controllers/RLTigaTitikEmpatController.js'

// RL 3.5
import { getDataRLTigaTitikLima, getRLTigaTitikLimaById, 
    insertDataRLTigaTitikLima, updateDataRLTigaTitikLima, deleteDataRLTigaTitikLima, getDataRLTigaTitikLimaKodeRSTahun } from '../controllers/RLTigaTitikLimaController.js'

// RL 3.6
import { getDataRLTigaTitikEnamIdTahun, 
    getDataRLTigaTitikEnamId ,insertDataRLTigaTitikEnam, deleteDataRLTigaTitikEnamId, updateDataRLTigaTitikEnamId, getDataRLTigaTitikEnamKodeRSTahun } from '../controllers/RLTigaTitikEnamController.js'

// RL 3.8
import { deleteDataRLTigaTitikDelapan, getDataRLTigaTitikDelapan, getDataRLTigaTitikDelapanById,
    getDataRLTigaTitikDelapanDetailKegiatan, insertDataRLTigaTitikDelapan, updateDataRLTigaTitikDelapan,getDataRLTigaTitikDelapanKodeRSTahun } from "../controllers/RLTigaTitikDelapanController.js";

// RL 3.9
import { deleteDataRLTigaTitikSembilanId, getDataRLTigaTitikSembilanId, getDataRLTigaTitikSembilanIdTahun, 
    insertDataRLTigaTitikSembilan, updateDataRLTigaTitikSembilanId, getDataRLTigaTitikSembilanKodeRSTahun } from '../controllers/RLTigaTitikSembilanController.js'

// RL 3.10
import { getDatarlTigaTitikSepuluh, insertDataRLTigaTitikSepuluh, 
    getDatarlTigaTitikSepuluhDetail, getrlTigaTitikSepuluhById, updateDatarlTigaTitikSepuluh, deleteDataRLTigaTitikSepuluh, getDataRLTigaTitikSepuluhKodeRSTahun } from '../controllers/RLTigaTitikSepuluhController.js'

// RL 3.11
import { getDatarlTigaTitikSebelas, insertDataRLTigaTitikSebelas, getDatarlTigaTitikSebelasDetail, 
    getrlTigaTitikSebelasById, updateDatarlTigaTitikSebelas, deleteDataRLTigaTitikSebelas, getDataRLTigaTitikSebelasKodeRSTahun } from '../controllers/RLTigaTitikSebelasController.js'

// RL 3.7
import { insertDataRLTigaTitikTujuh , getDataRLTigaTitikTujuh,getRLTigaTitikTujuhById, 
    getDataRLTigaTitikTujuhDetail, updateDataRLTigaTitikTujuh, deleteDataRLTigaTitikTujuh, getDataRLTigaTitikTujuhKodeRSTahun} 
    from '../controllers/RLTigaTitikTujuhController.js'

// RL 3.12
import { insertDataRLTigaTitikDuaBelas, getDataRLTigaTitikDuaBelas, getRLTigaTitikDuaBelasById, 
    getDataRLTigaTitikDuaBelasDetail, updateDataRLTigaTitikDuaBelas ,deleteDataRLTigaTitikDuaBelas, getDataRLTigaTitikDuaBelasKodeRSTahun} from '../controllers/RLTigaTitikDuaBelasController.js'

// RL 3.13A
import { insertDataRLTigaTitikTigaBelasA, getDataRLTigaTitikTigaBelasA, getRLTigaTitikTigaBelasAById, 
    getDataRLTigaTitikTigaBelasADetail, updateDataRLTigaTitikTigaBelasA ,deleteDataRLTigaTitikTigaBelasA, getDataRLTigaTitikTigaBelasAKodeRSTahun } from '../controllers/RLTigaTitikTigaBelasAController.js'

// RL 3.13B
import { insertDataRLTigaTitikTigaBelasB, getDataRLTigaTitikTigaBelasB, getRLTigaTitikTigaBelasBById, 
    getDataRLTigaTitikTigaBelasBDetail, updateDataRLTigaTitikTigaBelasB ,deleteDataRLTigaTitikTigaBelasB ,getDataRLTigaTitikTigaBelasBKodeRSTahun} from '../controllers/RLTigaTitikTigaBelasBController.js'

// RL 3.14
import { getDataRLTigaTitikEmpatBelas, insertDataRLTigaTitikEmpatBelas, getDataRLTigaTitikEmpatBelasDetail, 
    getRLTigaTitikEmpatBelasById, updateDataRLTigaTitikEmpatBelas, deleteDataRLTigaTitikEmpatBelas, getDataRLTigaTitikEmpatBelasKodeRSTahun } from '../controllers/RLTigaTitikEmpatBelasController.js'

// RL 3.15
import { getDataRLTigaTitikLimaBelas, 
    insertDataRLTigaTitikLimaBelas, 
    getDataRLTigaTitikLimaBelasDetail, 
    getRLTigaTitikLimaBelasById, 
    updateDataRLTigaTitikLimaBelas, 
    deleteDataRLTigaTitikLimaBelas, getDataRLTigaTitikLimaBelasKodeRSTahun } from '../controllers/RLTigaTitikLimaBelasController.js'

// RL 4a
import {
    deleteDataRLEmpatA,
    getDataRLEmpatA,
    getDataRLEmpatAById,
    insertDataRLEmpatA,
    updateDataRLEmpatA,getDataRLEmpatAKodeRSTahun
} from "../controllers/RLEmpatAController.js"

// RL 4a sebab
import {
    deleteDataRLEmpatASebab,
    getDataRLEmpatASebab,
    getDataRLEmpatASebabById,
    insertDataRLEmpatASebab,
    updateDataRLEmpatASebab,getDataRLEmpatASebabKodeRSTahun,
} from "../controllers/RLEmpatASebabController.js";

// RL.4b
import { insertDataRLEmpatB, getDataRLEmpatB, deleteDataRLEmpatBId, 
    getDataRLEmpatBId, updateDataRLEmpatId, getDataRLEmpatBKodeRSTahun } from "../controllers/RLEmpatBController.js"

// RL. 4b sebab
import { insertDataRLEmpatBSebab, getDataRLEmpatBSebab, deleteDataRLEmpatBSebabId, 
    getDataRLEmpatBSebabId,updateDataRLEmpatSebabId, getDataRLEmpatBSebabKodeRSTahun } from '../controllers/RLEmpatBSebabController.js'

// RL 5.1
import { getDataRLLimaTitikSatu, getRLLimaTitikSatuById, insertDataRLLimaTitikSatu, 
    updateDataRLLimaTitikSatu, deleteDataRLLimaTitikSatu, getDataRLLimaTitikSatuKodeRSTahun } from '../controllers/RLLimaTitikSatuController.js'

// RL 5.2
import { getDataRLLimaTitikDua, getRLLimaTitikDuaById, insertDataRLLimaTitikDua, 
    updateDataRLLimaTitikDua, deleteDataRLLimaTitikDua, getDataRLLimaTitikDuaKodeRSTahun } from '../controllers/RLLimaTitikDuaController.js'

// RL 5.3
import { insertDataRLLimaTitikTiga, getDataRLLimaTitikTiga, getRLLimaTitikTigaById, 
    getDataRLLimaTitikTigaDetail, updateDataRLLimaTitikTiga ,deleteDataRLLimaTitikTiga, getDataRLLimaTitikTigaKodeRSTahun } from '../controllers/RLLimaTitikTigaController.js'

// RL 5.4
import { insertDataRLLimaTitikEmpat, getDataRLLimaTitikEmpat, getRLLimaTitikEmpatById, 
    getDataRLLimaTitikEmpatDetail, updateDataRLLimaTitikEmpat ,deleteDataRLLimaTitikEmpat, getDataRLLimaTitikEmpatKodeRSTahun } from '../controllers/RLLimaTitikEmpatController.js'

const router = express.Router()

// Rumah Sakit
router.get('/apisirs/rumahsakit/:id', getDataRumahSakit)
router.get('/apisirs/rumahsakit', verifyToken, getDataRumahSakitFilterbyKabKotaId)

// User
router.get('/apisirs/users', verifyToken, getDataUser)
router.post('/apisirs/users', verifyToken, insertDataUser)
router.patch('/apisirs/users/:id/admin', verifyCsrfToken, verifyToken, changePassword)

// Kriteria User
router.get('/apisirs/kriteriauser', verifyToken, getKriteriaUser)

// Absensi
router.get("/apisirs/absensi", verifyToken, getAbsensi);



// Token
router.post('/apisirs/login', login)
router.delete('/apisirs/logout', verifyCsrfToken, logout)
router.get('/apisirs/token', verifyCsrfToken, refreshToken)

// Jenis Pelayanan
router.get('/apisirs/jenispelayanan', verifyToken,
    getDataJenisPelayanan)

// Cara Pembayaran
router.get('/apisirs/carapembayaran', verifyToken,
    getDataCaraPembayaran)

// Jenis Kegiatan
router.get('/apisirs/jeniskegiatan', verifyToken,
getDataJenisKegiatan)
//Jenis Kegiatan Lab 3.8
router.get('/apisirs/jeniskegiatanlab', verifyToken,
getDataJenisKegiatanLab)

// Jenis Spesialis
router.get('/apisirs/jenisspesialis', verifyToken,
    getDataJenisSpesialis)

// Group Jenis Tindakan
router.get('/apisirs/jenisgrouptindakan', verifyToken, getDataGroupJenisTindakan)

// Jenis Golongan Sebab Penyakit
router.get(
    "/apisirs/jenisgolsebabpenyakit",
    verifyToken,
    getDataJenisGolSebabPenyakit
)
router.get(
    "/apisirs/jenisgolsebabpenyakita/cari",
    verifyToken,
    getDataJenisGolSebabPenyakitA
)
router.get(
    "/apisirs/jenisgolsebabpenyakitasebab/cari",
    verifyToken,
    getDataJenisGolSebabPenyakitASebab
)
router.get(
    "/apisirs/jenisgolsebabpenyakita/id",
    verifyToken,
    getDataJenisGolSebabPenyakitAbyId
)

router.get('/apisirs/jenisgolongansebabpenyakit', verifyToken, getDataJenisGolonganSebabPenyakit)

// RL 1.2
router.post('/apisirs/rlsatutitikdua', verifyCsrfToken, verifyToken, insertDataRLSatuTitikDua)
router.get('/apisirs/rlsatutitikdua', verifyToken, getDatarlSatuTitikDua)
router.get('/apisirs/rlsatutitikduadetail/:id',verifyToken,getrlSatuTitikDuaById )
router.delete("/apisirs/rlsatutitikdua/:id", verifyCsrfToken, verifyToken, deleteDataRLSatuTitikDua)
router.patch('/apisirs/rlsatutitikdua/:id', verifyCsrfToken, verifyToken, updateDatarlSatuTitikDua)
router.get('/apisirs/rlsatutitikduaforrsonline', getDatarlSatuTitikDuaForRSOnline )

// RL 1.3
router.post('/apisirs/rlsatutitiktiga', verifyCsrfToken, verifyToken, insertDataRLSatuTitikTiga)
router.get('/apisirs/rlsatutitiktiga', verifyToken, getDataRLSatuTitikTiga)
router.get('/apisirs/rlsatutitiktigadetail/:id', verifyToken, getDataRLSatuTitikTigaDetailById)
router.patch('/apisirs/rlsatutitiktiga/:id', verifyCsrfToken, verifyToken, updateDataRLSatuTitikTiga)
router.delete('/apisirs/rlsatutitiktiga/:id', verifyCsrfToken, verifyToken, deleteDataRLSatuTitikTiga)

// RL 3.1
router.post('/apisirs/rltigatitiksatu', verifyCsrfToken, verifyToken, insertDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatu', verifyToken, getDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatudetail/:id', verifyToken, getDataRLTigaTitikSatuDetailById)
router.patch('/apisirs/rltigatitiksatu/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikSatu)
router.delete('/apisirs/rltigatitiksatu/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikSatu)

// RL 3.2
router.post('/apisirs/rltigatitikdua', verifyCsrfToken, verifyToken, insertDataRLTigaTitikDua)
router.get('/apisirs/rltigatitikdua', verifyToken, getDataRLTigaTitikDua)
router.delete('/apisirs/rltigatitikdua/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikDua)
router.get('/apisirs/rltigatitikduadetail/:id', verifyToken, getDataRLTigaTitikDuaDetail)
router.patch('/apisirs/rltigatitikduadetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikDua)

// RL 3.3
router.post('/apisirs/rltigatitiktiga', verifyCsrfToken, verifyToken, insertDataRLTigaTitikTiga)
router.get('/apisirs/rltigatitiktiga', verifyToken, getDataRLTigaTitikTiga)
router.delete('/apisirs/rltigatitiktigadetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikTiga)
router.get('/apisirs/rltigatitiktigadetail',verifyToken, getDataRLTigaTitikTigaDetail)
router.get('/apisirs/rltigatitiktigadetail/:id',verifyToken, getRLTigaTitikTigaById)
router.patch('/apisirs/rltigatitiktigadetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikTiga)

// RL 3.4
router.post('/apisirs/rltigatitikempat', verifyCsrfToken, verifyToken, insertDataRLTigaTitikEmpat)
router.get('/apisirs/rltigatitikempat', verifyToken, getDataRLTigaTitikEmpat)
router.get('/apisirs/rltigatitikempatdetail/:id',verifyToken, getRLTigaTitikEmpatById)
router.delete('/apisirs/rltigatitikempat/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikEmpat)
router.patch('/apisirs/rltigatitikempatdetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikEmpat)

// RL 3.5
router.post('/apisirs/rltigatitiklima', verifyCsrfToken, verifyToken, insertDataRLTigaTitikLima)
router.get('/apisirs/rltigatitiklima', verifyToken, getDataRLTigaTitikLima)
router.get('/apisirs/rltigatitiklimadetail/:id',verifyToken, getRLTigaTitikLimaById)
router.delete('/apisirs/rltigatitiklima/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikLima)
router.patch('/apisirs/rltigatitiklimadetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikLima)

// RL 3.6
router.post('/apisirs/rltigatitikenam', verifyCsrfToken, verifyToken, insertDataRLTigaTitikEnam)
router.get('/apisirs/rltigatitikenam', verifyToken, getDataRLTigaTitikEnamIdTahun)
router.get('/apisirs/rltigatitikenam/update/:id', verifyToken, getDataRLTigaTitikEnamId)
router.patch('/apisirs/rltigatitikenam/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikEnamId)
router.delete('/apisirs/rltigatitikenam/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikEnamId)

// RL 3.7
router.post('/apisirs/rltigatitiktujuh', verifyCsrfToken, verifyToken, insertDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuh', verifyToken, getDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuhdetail',verifyToken, getDataRLTigaTitikTujuhDetail)
router.get('/apisirs/rltigatitiktujuhdetail/:id',verifyToken, getRLTigaTitikTujuhById)
router.patch('/apisirs/rltigatitiktujuhdetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikTujuh)
router.delete('/apisirs/rltigatitiktujuhdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikTujuh)

// RL 3.8
router.post(
    "/apisirs/rltigatitikdelapan",
    verifyCsrfToken,
    verifyToken,
    insertDataRLTigaTitikDelapan
);
router.get(
    "/apisirs/rltigatitikdelapan",
    verifyToken,
    getDataRLTigaTitikDelapanDetailKegiatan
);
router.get(
    "/apisirs/rltigatitikdelapan/:id",
    verifyToken,
    getDataRLTigaTitikDelapanById
);
router.delete(
    "/apisirs/rltigatitikdelapan/:id",
    verifyCsrfToken,
    verifyToken,
    deleteDataRLTigaTitikDelapan
);
router.patch(
    "/apisirs/rltigatitikdelapan/:id",
    verifyCsrfToken,
    verifyToken,
    updateDataRLTigaTitikDelapan
);

// RL 3.9
router.post('/apisirs/rltigatitiksembilan', verifyCsrfToken, verifyToken, insertDataRLTigaTitikSembilan)
// router.get('/apisirs/rltigatitiksembilan', getDataRLTigaTitikSembilan)
router.get('/apisirs/rltigatitiksembilan', verifyToken, getDataRLTigaTitikSembilanIdTahun)
router.get('/apisirs/rltigatitiksembilan/update/:id', verifyToken, getDataRLTigaTitikSembilanId)
router.patch('/apisirs/rltigatitiksembilan/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikSembilanId)
router.delete('/apisirs/rltigatitiksembilan/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikSembilanId)

// RL 3.10
router.post('/apisirs/rltigatitiksepuluh', verifyCsrfToken, verifyToken, insertDataRLTigaTitikSepuluh)
router.get('/apisirs/rltigatitiksepuluh', verifyToken, getDatarlTigaTitikSepuluh)
router.get('/apisirs/rltigatitiksepuluhdetail',verifyToken, getDatarlTigaTitikSepuluhDetail)
router.get('/apisirs/rltigatitiksepuluhdetail/:id',verifyToken, getrlTigaTitikSepuluhById)
router.patch('/apisirs/rltigatitiksepuluhdetail/:id', verifyCsrfToken, verifyToken, updateDatarlTigaTitikSepuluh)
router.delete('/apisirs/rltigatitiksepuluhdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikSepuluh)

//Rl 3.11
router.post('/apisirs/rltigatitiksebelas', verifyCsrfToken, verifyToken, insertDataRLTigaTitikSebelas)
router.get('/apisirs/rltigatitiksebelas', verifyToken, getDatarlTigaTitikSebelas)
router.get('/apisirs/rltigatitiksebelasdetail',verifyToken, getDatarlTigaTitikSebelasDetail)
router.get('/apisirs/rltigatitiksebelasdetail/:id',verifyToken, getrlTigaTitikSebelasById)
router.patch('/apisirs/rltigatitiksebelasdetail/:id', verifyCsrfToken, verifyToken, updateDatarlTigaTitikSebelas)
router.delete('/apisirs/rltigatitiksebelasdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikSebelas)

// RL 3.12
router.post('/apisirs/rltigatitikduabelas', verifyCsrfToken, verifyToken, insertDataRLTigaTitikDuaBelas)
router.get('/apisirs/rltigatitikduabelas', verifyToken, getDataRLTigaTitikDuaBelas)
router.get('/apisirs/rltigatitikduabelasdetail',verifyToken, getDataRLTigaTitikDuaBelasDetail)
router.get('/apisirs/rltigatitikduabelasdetail/:id',verifyToken, getRLTigaTitikDuaBelasById)
router.patch('/apisirs/rltigatitikduabelasdetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikDuaBelas);
router.delete('/apisirs/rltigatitikduabelasdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikDuaBelas);
router.get('/apisirs/getmetoda', verifyToken, getMetoda)

// RL 3.13a
router.post('/apisirs/rltigatitiktigabelasa', verifyCsrfToken, verifyToken, insertDataRLTigaTitikTigaBelasA)
router.get('/apisirs/rltigatitiktigabelasa', verifyToken, getDataRLTigaTitikTigaBelasA)
router.get('/apisirs/rltigatitiktigabelasadetail',verifyToken, getDataRLTigaTitikTigaBelasADetail)
router.get('/apisirs/rltigatitiktigabelasadetail/:id',verifyToken, getRLTigaTitikTigaBelasAById)
router.patch('/apisirs/rltigatitiktigabelasadetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikTigaBelasA);
router.delete('/apisirs/rltigatitiktigabelasadetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikTigaBelasA);
router.get('/apisirs/getgolonganobat', verifyToken, getGolonganObat)

// RL 3.13b
router.post('/apisirs/rltigatitiktigabelasb', verifyCsrfToken, verifyToken, insertDataRLTigaTitikTigaBelasB)
router.get('/apisirs/rltigatitiktigabelasb', verifyToken, getDataRLTigaTitikTigaBelasB)
router.get('/apisirs/rltigatitiktigabelasbdetail',verifyToken, getDataRLTigaTitikTigaBelasBDetail)
router.get('/apisirs/rltigatitiktigabelasbdetail/:id',verifyToken, getRLTigaTitikTigaBelasBById)
router.patch('/apisirs/rltigatitiktigabelasbdetail/:id',verifyCsrfToken, verifyToken, updateDataRLTigaTitikTigaBelasB);
router.delete('/apisirs/rltigatitiktigabelasbdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikTigaBelasB);
router.get('/apisirs/getgolonganobat', verifyToken, getGolonganObat)

// RL 3.14
router.post('/apisirs/rltigatitikempatbelas', verifyCsrfToken, verifyToken, insertDataRLTigaTitikEmpatBelas)
router.get('/apisirs/rltigatitikempatbelas', verifyToken, getDataRLTigaTitikEmpatBelas)
router.delete('/apisirs/rltigatitikempatbelasdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLTigaTitikEmpatBelas)
router.get('/apisirs/rltigatitikempatbelasdetail/:id',verifyToken, getDataRLTigaTitikEmpatBelasDetail)
router.get('/apisirs/rltigatitikempatbelasdetail/:id',verifyToken, getRLTigaTitikEmpatBelasById)
router.patch('/apisirs/rltigatitikempatbelasdetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikEmpatBelas)

// RL 3.15
router.post('/apisirs/rltigatitiklimabelas', verifyCsrfToken, verifyToken, insertDataRLTigaTitikLimaBelas)
router.get('/apisirs/rltigatitiklimabelas', verifyToken, getDataRLTigaTitikLimaBelas)
router.delete('/apisirs/rltigatitiklimabelasdetail/:id', verifyCsrfToken, deleteDataRLTigaTitikLimaBelas)
router.get('/apisirs/rltigatitiklimabelasdetail/:id',verifyToken, getDataRLTigaTitikLimaBelasDetail)
router.get('/apisirs/rltigatitiklimabelasdetail/:id',verifyToken, getRLTigaTitikLimaBelasById)
router.patch('/apisirs/rltigatitiklimabelasdetail/:id', verifyCsrfToken, verifyToken, updateDataRLTigaTitikLimaBelas)

// RL 4a
router.post("/apisirs/rlempata", verifyCsrfToken, verifyToken, insertDataRLEmpatA);
router.get("/apisirs/rlempata", verifyToken, getDataRLEmpatA);
router.delete("/apisirs/rlempata/:id", verifyCsrfToken, verifyToken, deleteDataRLEmpatA);
router.get("/apisirs/rlempata/:id", verifyToken, getDataRLEmpatAById);
router.patch("/apisirs/rlempata/:id", verifyCsrfToken, verifyToken, updateDataRLEmpatA);

// RL 4aSebab
router.post("/apisirs/rlempatasebab", verifyCsrfToken, verifyToken, insertDataRLEmpatASebab);
router.get("/apisirs/rlempatasebab", verifyToken, getDataRLEmpatASebab);
router.delete(
    "/apisirs/rlempatasebab/:id",
    verifyCsrfToken,
    verifyToken,
    deleteDataRLEmpatASebab
);
router.get("/apisirs/rlempatasebab/:id", verifyToken, getDataRLEmpatASebabById);
router.patch(
    "/apisirs/rlempatasebab/:id",
    verifyCsrfToken,
    verifyToken,
    updateDataRLEmpatASebab
);

// RL 4b
router.post('/apisirs/rlempatb', verifyCsrfToken, verifyToken, insertDataRLEmpatB)
router.get('/apisirs/rlempatb', verifyToken, getDataRLEmpatB)
router.delete('/apisirs/rlempatb/:id', verifyCsrfToken, verifyToken, deleteDataRLEmpatBId)
router.get('/apisirs/rlempatb/penyakit', verifyToken, getDataJenisGolonganPenyakitB)
router.get('/apisirs/rlempatb/idpenyakit', verifyToken, getDataJenisGolonganPenyakitBId)
router.get('/apisirs/rlempatb/update/:id', verifyToken, getDataRLEmpatBId)
router.patch('/apisirs/rlempatb/:id', verifyCsrfToken, verifyToken, updateDataRLEmpatId)

// RL 4b sebab
router.post('/apisirs/rlempatbsebab', verifyCsrfToken, verifyToken, insertDataRLEmpatBSebab)
router.get('/apisirs/rlempatbsebab', verifyToken, getDataRLEmpatBSebab)
router.get('/apisirs/rlempatbsebab/penyakit', verifyToken, getDataJenisGolonganSebabPenyakitB)
router.get('/apisirs/rlempatbsebab/idpenyakit', verifyToken, getDataJenisGolonganSebabPenyakitBId)
router.delete('/apisirs/rlempatbsebab/:id', verifyCsrfToken, verifyToken, deleteDataRLEmpatBSebabId)
router.get('/apisirs/rlempatbsebab/update/:id', verifyToken, getDataRLEmpatBSebabId)
router.patch('/apisirs/rlempatbsebab/:id', verifyCsrfToken, verifyToken, updateDataRLEmpatSebabId)

// RL 5.1
router.post('/apisirs/rllimatitiksatu', verifyCsrfToken, verifyToken, insertDataRLLimaTitikSatu)
router.get('/apisirs/rllimatitiksatu', verifyToken, getDataRLLimaTitikSatu)
router.get('/apisirs/rllimatitiksatudetail/:id',verifyToken, getRLLimaTitikSatuById)
router.delete('/apisirs/rllimatitiksatu/:id', verifyCsrfToken, verifyToken, deleteDataRLLimaTitikSatu)
router.patch('/apisirs/rllimatitiksatudetail/:id', verifyCsrfToken, verifyToken, updateDataRLLimaTitikSatu)

// RL 5.2
router.post('/apisirs/rllimatitikdua', verifyCsrfToken, verifyToken, insertDataRLLimaTitikDua)
router.get('/apisirs/rllimatitikdua', verifyToken, getDataRLLimaTitikDua)
router.get('/apisirs/rllimatitikduadetail/:id',verifyToken, getRLLimaTitikDuaById)
router.delete('/apisirs/rllimatitikdua/:id', verifyCsrfToken, verifyToken, deleteDataRLLimaTitikDua)
router.patch('/apisirs/rllimatitikduadetail/:id', verifyCsrfToken, verifyToken, updateDataRLLimaTitikDua)

// RL 5.3
router.post('/apisirs/rllimatitiktiga', verifyCsrfToken, verifyToken, insertDataRLLimaTitikTiga)
router.get('/apisirs/rllimatitiktiga', verifyToken, getDataRLLimaTitikTiga)
router.get('/apisirs/rllimatitiktigadetail',verifyToken, getDataRLLimaTitikTigaDetail)
router.get('/apisirs/rllimatitiktigadetail/:id',verifyToken, getRLLimaTitikTigaById)
router.patch('/apisirs/rllimatitiktigadetail/:id', verifyCsrfToken, verifyToken, updateDataRLLimaTitikTiga);
router.delete('/apisirs/rllimatitiktigadetail/:id', verifyCsrfToken, deleteDataRLLimaTitikTiga);
router.get('/apisirs/getnourut', verifyToken, getNoUrut)
router.get('/apisirs/geticd10', verifyToken, getIcd10)

// RL 5.4
router.post('/apisirs/rllimatitikempat', verifyCsrfToken, verifyToken, insertDataRLLimaTitikEmpat)
router.get('/apisirs/rllimatitikempat', verifyToken, getDataRLLimaTitikEmpat)
router.get('/apisirs/rllimatitikempatdetail',verifyToken, getDataRLLimaTitikEmpatDetail)
router.get('/apisirs/rllimatitikempatdetail/:id',verifyToken, getRLLimaTitikEmpatById)
router.patch('/apisirs/rllimatitikempatdetail/:id', verifyCsrfToken, verifyToken, updateDataRLLimaTitikEmpat);
router.delete('/apisirs/rllimatitikempatdetail/:id', verifyCsrfToken, verifyToken, deleteDataRLLimaTitikEmpat);
router.get('/apisirs/getnourut', verifyToken, getNoUrut)
router.get('/apisirs/geticd10', verifyToken, getIcd10)

// KabKota
router.get('/apisirs/kabkota', verifyToken, getDataKabKota)

// Provinsi
router.get('/apisirs/provinsi', verifyToken, getDataProvinsi)

// Admin Login
router.post('/apisirs/loginadmin', loginadmin)
router.delete('/apisirs/logoutadmin', logoutadmin)

// bibo
router.get('/apisirs/rltigatitikempatadmin', verifyToken, getDataRLTigaTitikEmpatKodeRSTahun)
router.get('/apisirs/rltigatitiklimaadmin', verifyToken, getDataRLTigaTitikLimaKodeRSTahun)
router.get('/apisirs/rllimatitiksatuadmin', verifyToken, getDataRLLimaTitikSatuKodeRSTahun)
router.get('/apisirs/rllimatitikduaadmin', verifyToken, getDataRLLimaTitikDuaKodeRSTahun)

// nasrul
router.get('/apisirs/rltigatitiktujuhadmin', verifyToken, getDataRLTigaTitikTujuhKodeRSTahun)
router.get('/apisirs/rltigatitikduabelasadmin', verifyToken, getDataRLTigaTitikDuaBelasKodeRSTahun)
router.get('/apisirs/rltigatitiktigabelasaadmin', verifyToken, getDataRLTigaTitikTigaBelasAKodeRSTahun)
router.get('/apisirs/rltigatitiktigabelasbadmin', verifyToken, getDataRLTigaTitikTigaBelasBKodeRSTahun)
router.get('/apisirs/rllimatitikempatadmin', verifyToken, getDataRLLimaTitikEmpatKodeRSTahun)

//Yohanes
router.get('/apisirs/rlsatutitiktigaadmin', verifyToken, getDataRLSatuTitikTigaKodeRSTahun)
router.get('/apisirs/rltigatitiksatuadmin', verifyToken, getDataRLTigaTitikSatuKodeRSTahun)
router.get('/apisirs/rltigatitikenamadmin', verifyToken, getDataRLTigaTitikEnamKodeRSTahun)
router.get('/apisirs/rltigatitiksembilanadmin', verifyToken, getDataRLTigaTitikSembilanKodeRSTahun)
router.get('/apisirs/rlempatbadmin',verifyToken, getDataRLEmpatBKodeRSTahun)
router.get('/apisirs/rlempatbsebabadmin', verifyToken, getDataRLEmpatBSebabKodeRSTahun)

//bims
router.get("/apisirs/rltigatitikdelapanadmin", verifyToken, getDataRLTigaTitikDelapanKodeRSTahun)
router.get('/apisirs/rlempataadmin', verifyToken, getDataRLEmpatAKodeRSTahun)
router.get('/apisirs/rlempatasebabadmin', verifyToken, getDataRLEmpatASebabKodeRSTahun)

// wahyudin
router.get('/apisirs/rltigatitiksepuluhadmin', verifyToken, getDataRLTigaTitikSepuluhKodeRSTahun)
router.get('/apisirs/rltigatitiksebelasadmin', verifyToken, getDataRLTigaTitikSebelasKodeRSTahun)
router.get('/apisirs/rllimatitiktigaadmin',verifyToken, getDataRLLimaTitikTigaKodeRSTahun)
router.get('/apisirs/rlsatutitikduaadmin',verifyToken, getDataRLSatuTitikDuaKodeRSTahun)

// zulkifli
router.get('/apisirs/rltigatitikduaadmin', verifyToken, getDataRLTigaTitikDuaKodeRSTahun)
router.get('/apisirs/rltigatitiktigaadmin', verifyToken, getDataRLTigaTitikTigaKodeRSTahun)
router.get('/apisirs/rltigatitikempatbelasadmin',verifyToken, getDataRLTigaTitikEmpatBelasKodeRSTahun)
router.get('/apisirs/rltigatitiklimabelasadmin',verifyToken, getDataRLTigaTitikLimaBelasKodeRSTahun)

// Validasi Data
router.get('/apisirs/validasi', verifyToken, getDataValidasiByRsId)
router.post('/apisirs/validasi', verifyToken, insertValidasi)
router.patch('/apisirs/validasi/:id', verifyToken, updateValidasi)
router.get('/apisirs/statusvalidasi', getStatusValidasi)

// Provinsi
router.get("/apisirs/provinsibaru", verifyToken, getProvinsi);
router.get("/apisirs/provinsibaru/:id", verifyToken, showProvinsi);

// KabKota
router.get("/apisirs/kabkotabaru", verifyToken, getKabKota);
router.get("/apisirs/kabkotabaru/:id", verifyToken, showKabKota);

export default router