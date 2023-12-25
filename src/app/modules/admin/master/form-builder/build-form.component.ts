import { CdkScrollable } from '@angular/cdk/scrolling'
import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { DialogModule } from 'primeng/dialog';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatOptionModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router'
import { MatDatepickerModule } from '@angular/material/datepicker'
import {
    MatSnackBar,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { DynamicForm, DynamicFormField } from './build-form.type'
import { FormManagerService } from '../form-manager/form-manager.service'
import { FormManagerData } from '../form-manager/form-manager.types'
import { MatSidenavModule } from '@angular/material/sidenav'
import { SharedDataService } from 'app/core/share/shared-date-service'
import {
    FuseDrawerComponent,
    FuseDrawerPosition,
} from '@fuse/components/drawer'
import { FormBuilderService } from './build-form.service'
import { EditorModule } from '@tinymce/tinymce-angular'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ListOptionLabelComponent } from './dialog/list-label-option.component'
import { OrderListModule } from 'primeng/orderlist'

interface AutoCompleteCompleteEvent {
    originalEvent: Event
    query: string
}

@Component({
    selector: 'build-form',
    templateUrl: './build-form.component.html',
    styleUrl: './build-form.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        RouterLink,
        MatButtonModule,
        CdkScrollable,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSidenavModule,
        RouterOutlet,
        NgIf,
        FuseDrawerComponent,
        EditorModule,
        ToastModule,
        AutoCompleteModule,
        DragDropModule,
        OrderListModule,
        DialogModule
    ],
    providers: [MessageService, DialogService],
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
    @Input() position: FuseDrawerPosition
    drawerMode: string
    drawerOpened: boolean
    headerData: any
    items: DynamicForm
    dynamicFormId: string
    formId: string
    formManagerData: FormManagerData
    form: FormGroup
    formEditor: FormGroup
    formFields: any[]
    showComponent: boolean | false
    formData: DynamicFormField[] = []

    ref: DynamicDialogRef | undefined

    optionLabels: any[] | undefined
    filteredOptionLabels: any[] | undefined

    showOptions: boolean = false
    visible: boolean = false;
    visibleDuplicateForm: boolean = false;

    createDuplicateForm: FormManagerData[]

    typeOptions: string[] = [
        'text',
        'select',
        'number',
        'email',
        'date',
        'textarea',
        'file',
        'radio',
        'checkbox',
    ]

    validationOptions: string[] = [
        'required',
        'email',
        'number',
        'minLength',
        'maxLength',
        'pattern',
    ]

    constructor(
        private _snackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute,
        private _formManagerService: FormManagerService,
        private fb: FormBuilder,
        private _formBuilderService: FormBuilderService,
        private messageService: MessageService,
        public dialogService: DialogService
    ) {
        this.form = this.fb.group({})
    }

    ngOnInit(): void {
        this.initializeForm()
        this.formEditor = this.fb.group({
            editor: [''],
        })
        this.drawerMode = 'side'
        this.drawerOpened = false

        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id')
        })

        this._formManagerService.formFields$.subscribe({
            next: res => {
                if (res.dynamicForm != null) {
                    this.formFields = res.dynamicForm['formFields']
                    this.showComponent = true
                } else {
                    this.formFields = []
                    this.showComponent = false
                }

                this.headerData = res;
            },
            error: err => {
                console.log(err)
            },
        })

        this._formBuilderService.data$.subscribe({
            next: res => {
                this.items = res
                this.formEditor = this.fb.group({
                    editor: this.items.formulir,
                })
            },
            error: err => {
                console.log(err)
            },
        })

        this.optionLabels = [
            { name: 'Nama Pasien' },
            { name: 'Tanggal Lahir Pasien Atau Wali' },
            { name: 'Alamat Pasien' },
            { name: 'No Telpon Pasien' },
            { name: 'Nama Wali1' },
            { name: 'Nama Wali2' },
            { name: 'Nama Wali3' },
            { name: 'Nama Privasi' },
            { name: 'Nama Profesi' },
            { name: 'Lain Lain' },
            { name: 'Dokter Pelaksana Tindakan' },
            { name: 'Pemberi Informasi' },
            { name: 'Penerima Informasi Atau Pemberi Persetujuan' },
            { name: 'Diagnosis Kerja dan Diagnosis Banding dan dasar diagnosis' },
            { name: 'Kondisi Pasien' },
            { name: 'Tindakan Kedokteran' },
            { name: 'Indikasi Tindakan' },
            { name: 'Tata Cara Tindakan' },
            { name: 'Tujuan Tindakan' },
            { name: 'Risiko Tindakan' },
            { name: 'Komplikasi' },
            { name: 'Tindakan Yang Diusulkan' },
            { name: 'Tatacara dan Tujuan Tindakan' },
            { name: 'Manfaat dan Resiko Tindakan' },
            { name: 'Nama Orang Yang Mengerjakan Tindakan' },
            { name: 'Nama Orang Yang Mengerjakan Tindakan' },
            { name: 'Kemungkinan alternative dan tindakan' },
            { name: 'Prognosis Dari Tindakan' },
            { name: 'Kemungkinan Hasil Yang Tidak Terduga' },
            { name: 'Kemungkinan Hasil Bila Tidak Dilakukan Tindakan' },
            { name: 'Nama Pasien atau Wali' },
            { name: 'Umur Pasien atau Wali' },
            { name: 'Alamat Pasien atau Wali' },
            { name: 'Tindakan atau Pengobatan' },
            { name: 'Umur Pasien' },
            { name: 'Tahun Buat' },
            { name: 'Bulan Buat' },
            { name: 'Tanggal Buat' },
            { name: 'Tanggal Lahir Pasien' },
            { name: 'Pukul Buat' },
            { name: 'No Rekam Medis' },
            { name: 'Nama Dokter I' },
            { name: 'Nama Dokter II' },
            { name: 'Nama Dokter Spesialis I' },
            { name: 'Nama Dokter Spesialis II' },
            { name: 'Nama Dokter Sub Spesialis I' },
            { name: 'Nama Dokter Sub Spesialis II' },
            { name: 'Jenis Kelamin Pasien Atau Wali' },
            { name: 'Jenis Kelamin Pasien' },
            { name: 'Jenis Kelamin Yang Bertanda Tangan' },
            { name: 'Hubungan Dengan Pasien' },
            { name: 'Tanggal Masuk Rawat Inap' },
            { name: 'Ruangan Atau Kelas' },
            { name: 'No Telpon pasien Atau Wali' },
            { name: 'Nama Anggota Keluarga 1' },
            { name: 'Nama Anggota Keluarga 2' },
            { name: 'Nama Anggota Keluarga 3' },
            { name: 'Nama Penjenguk' },
            { name: 'Profesi Penjenguk' },
            { name: 'Tempat Lahir Pasien' },
            { name: 'Tempat Lahir Pasien Atau Wali' },
            { name: 'Status Pasien Sebagai' },
            { name: 'Nama yang Bertanda Tangan' },
            { name: 'Umur yang Bertanda Tangan' },
            { name: 'Tempat Lahir yang Bertanda Tangan' },
            { name: 'Tanggal Lahir yang Bertanda Tangan' },
            { name: 'Alamat Lahir yang Bertanda Tangan' },
            { name: 'Nama Dokter Penanggung Jawab' },
            { name: 'Alamat Yang Bertanda Tangan' },
            { name: 'Hari Operasi dilakukan' },
            { name: 'Tanggal Operasi dilakukan' },
            { name: 'Jenis Operasi' },
            { name: 'Jenis Anastesi' },
            { name: 'Tekanan Intra Okular (TIO)' },
            { name: 'Visus' },
            { name: 'Operator' },
            { name: 'Keluhan Utama' },
            { name: 'Keluhan' },
            { name: 'Riwayat Penyakit Sekarang' },
            { name: 'Riwayat Penyakit Dahulu' },
            { name: 'Riwayat Penyakit Keluarga' },
            { name: 'Riwayat Penggunaan Obat' },
            { name: 'Riwayat Alergi' },
            { name: 'Keadaan Umum' },
            { name: 'Kesadaran' },
            { name: 'gcs' },
            { name: 'Tanda Vital' },
            { name: 'Pemeriksaan Fisik' },
            { name: 'Pemeriksaan Penunjang' },
            {name: 'Saya Menginginkan atau Tidak Menginginkan Privasi Khusus'},
            { name: 'Biaya Pengobatan atau Biaya Tindakan' },
            { name: 'Bentukan Bagian' },
            { name: 'Dokter Bedah' },
            { name: 'Nama Prosedur Tindakan' },
            { name: 'Tanggal Dan Jam Diserahkan' },
            { name: 'Untuk Kemudian' },
            { name: 'Petugas Rumah Sakit' },
            { name: 'Asisten Bedah' },
            { name: 'Sebagai Dokter' },
            { name: 'Spesialis' },
            { name: 'Sub Spesialis' },
            { name: 'Nama RS' },
            { name: 'Bagian' },
            { name: 'Anamnesa' },
            { name: 'Pemeriksaan' },
            { name: 'Diagnosa Kerja' },
            { name: 'Pengobatan Yang Telah Diberikan' },
            { name: 'Rencana Yang Akan Dilanjutkan' },
            { name: 'Alasan Rujukan' },
            { name: 'Nomor KTP' },
            { name: 'Jenis Hasil Pemeriksaan'},
            { name: 'Menolak Untuk Dirujuk Karena'},
            { name: 'Nama Almarhum/Almarhumah'},
            { name: 'Tempat Lahir Almarhum/Almarhumah'},
            { name: 'Tanggal Lahir Almarhum/Almarhumah'},
            { name: 'Jenis Kelamin Almarhum/Almarhumah'},
            { name: 'Alamat Almarhum/Almarhumah'},
            { name: 'No. Register'},
            { name: 'Hubungan Dengan Almarhum/Almarhumah'},
            { name: 'Nama Dokter'},
            { name: 'Menolak Rawat Inap Karena'},
            { name: 'Agama'},
            { name: 'Bahasa Yang Dipakai'},
            { name: 'Lain-Lain, Sebutkan'},
            { name: 'Kebutuhan Penterjemah'},
            { name: 'Kesulitan Komunikasi'},
            { name: 'Pendidikan Pasien'},
            { name: 'Baca dan Tulis'},
            { name: 'Metode Pembelajaran'},
            { name: 'Hambatan Edukasi'},
            { name: 'Penerima Edukasi'},
            { name: 'Evaluasi Pembelajaran'},
            { name: 'Suku Bangsa'},
            { name: 'Nilai Kepercayaan Yang Dianut'},
            { name: 'Kesediaan pasien/keluarga untuk menerima informasi yang di berikan'},
            { name: 'Topik Edukasi'},
            { name: 'Metoda Pembelajaran'},
            { name: 'Keterangan/Catatan'},
            { name: 'Tanggal Edukasi'},
            { name: 'Pilihan Tipe Pembelajaran'},
            { name: 'Topik Edukasi : Hak Pasien dan Keluarga'},
            { name: 'Topik Edukasi : Dokter Spesialis/Dokter Umum'},
            { name: 'Topik Edukasi : Gelang Identitas'},
            { name: 'Topik Edukasi : Manajemen Risiko Jatuh'},
            { name: 'Topik Edukasi : Manajemen Nyeri'},
            { name: 'Topik Edukasi : Nilai-Nilai Kepercayaan Yang Dianut'},
            { name: 'Topik Edukasi : Rehabilitasi Medik'},
            { name: 'Topik Edukasi : Pencegahan Infeksi'},
            { name: 'Topik Edukasi : Nutrisi'},
            { name: 'Topik Edukasi : Kerohanian'},
            { name: 'Topik Edukasi : Farmasi'},
            { name: 'Topik Edukasi : PENKES Kebidanan'},
            { name: 'Topik Edukasi : PENKES Keperawatan'},
            { name: 'Topik Edukasi : PENKES Untuk Dirumah'},
            { name: 'Topik Edukasi : Edukasi Kolaboratif (Case Manager)'},
            { name: 'Topik Edukasi : Edukasi Lanjutan (Pasien yang dirujuk)'},
            { name: 'Nama Sasaran Edukasi'},
            { name: 'Nama Edukator'},
            { name: 'Verifikasi'},
            { name: 'Materi Edukasi'},
            { name: 'Evaluasi'},
            { name: 'Metoda Edukasi'},
            { name: 'Nama Ibu'},
            { name: 'Nama Ayah'},
            { name: 'Dokter/Bidan Penolong'},
            { name: 'Nama Bayi'},
            { name: 'Tanggal Lahir Bayi'},
            { name: 'Jam Lahir Bayi'},
            { name: 'No. Peneng'},
            { name: 'Nama Pemberi No'},
            { name: 'Jenis Kelamin Bayi'},
            { name: 'Warna Kulit Bayi'},
            { name: 'Berat Badan Bayi'},
            { name: 'Panjang Bayi'},
            { name: 'APGAR Skor'},
            { name: 'Nomor peneng dan pengenalnya adalah'},
            { name: 'Kontak Menyusui'},
            { name: 'Rawat Gabung'},
            { name: 'Pemberian ASI Terus Menerus'},
            { name: 'Cairan Lain'},
            { name: 'Pemberian Susu Formula'},
            { name: 'Intervensi'},
            { name: 'Edukasi Yang Diberikan'},
            { name: 'Sasaran Edukasi'},
            { name: 'Lainnya, Sebutkan'},
            { name: 'Tanggal Masuk'},
            { name: 'Jam Masuk'},
            { name: 'RA/Anastesi Regional'},
            { name: 'Alternatif & Risiko'},
            { name: 'PENOLAKAN  untuk dilakukan tindakan'},
            { name: 'Diagnosis'},
            { name: 'Persetujuan untuk dilakukannya tindakan/pengobatan :'},
            { name: 'PERSETUJUAN  untuk dilakukan tindakan :'},
            { name: 'Ada, Sebutkan '},
            { name: 'GCS Skor E '},
            { name: 'GCS Skor V '},
            { name: 'GCS Skor M '},
            { name: 'Tanda Vital TD '},
            { name: 'Tanda Vital Suhu '},
            { name: 'Tanda Vital Nadi '},
            { name: 'Tanda Vital Pernafasan '},
            { name: 'Tanda Vital BB '},
            { name: 'Nomor Handphone'},
            { name: 'Nomor Telepon Yang Bertandatangan'},
            { name: 'Untuk diberikan vaksinasi'},
            { name: 'No. Passport'},
            { name: 'Pekerjaan'},
            { name: 'Pemeriksaan Fisik Inspeksi (Generalis dan Lokalis)'},
            { name: 'Pemeriksaan Fisik Palpasi (Generalis dan Lokalis)'},
            { name: 'Pemeriksaan Fisik Perkusi (Generalis dan Lokalis)'},
            { name: 'Pemeriksaan Fisik Auskultasi (Generalis dan Lokalis)'},
            { name: 'Diagnosis Banding'},
            { name: 'Diagnosis Kerja'},
            { name: 'Penatalaksanaan/Perencanaan Pelayanan'},
            { name: 'Pasien dan keluarga diberikan informasi tentang perencanaan pulang'},
            { name: 'Rencana Lama Rawat'},
            { name: 'Sudah Dapat Ditetapkan Lama Hari'},
            { name: 'Rencana Pulang Tanggal'},
            { name: 'Belum Bisa Ditetapkan Karena'},
            { name: 'Ketika Pulang Masih Memerlukan Kebutuhan'},
            { name: 'Ketika Pulang Masih Memerlukan Perawatan Lanjut'},
            { name: 'Pukul'},
            { name: 'Tiba di IGD'},
            { name: 'Tanggal Tiba di IGD'},
            { name: 'Tanggal Asesmen'},
            { name: 'Diantar Oleh'},
            { name: 'Cara Masuk'},
            { name: 'Pernah Dirawat'},
            { name: 'Masih Dalam Pengobatan'},
            { name: 'Ketergantungan Terhadap'},
            { name: 'Riwayat Pekerjaan (apakah hubungan dengan zat-zat berbahaya)'},
            { name: 'Riwayat Alergi'},
            { name: 'Riwayat Pemakaian'},
            { name: 'Alat Kontrasepsi'},
            { name: 'Status Pernikahan'},
            { name: 'Umur Waktu Pertama Menikah'},
            { name: 'Nama Suami & Usia'},
            { name: 'Nama Suami'},
            { name: 'Hari Pertama Haid Terakhir (HPHT)'},
            { name: 'Taksiran Partus'},
            { name: 'Riwayat Obstetri G'},
            { name: 'Riwayat Obstetri P'},
            { name: 'Riwayat Obstetri A'},
            { name: 'Airway'},
            { name: 'Breathing'},
            { name: 'Circulation'},
            { name: 'Saturasi O2'},
            { name: 'Kepala'},
            { name: 'Mata'},
            { name: 'Reflek Cahaya Kanan'},
            { name: 'Reflek Cahaya Kiri'},
            { name: 'Konjungtiva'},
            { name: 'Sklera'},
            { name: 'THT'},
            { name: 'Thorax'},
            { name: 'Bunyi Jantung I-II'},
            { name: 'Murmur'},
            { name: 'Gallop'},
            { name: 'Paru'},
            { name: 'Tipe Ronkhi'},
            { name: 'Abdomen'},
            { name: 'Ekstremitas'},
            { name: 'Catatan/Pemeriksaan Fisik Lain Yang Ditemukan'},
            { name: 'Inspeksi, Membesar Sesuai Usia Kehamilan'},
            { name: 'Usia Kehamilan'},
            { name: 'Bekas Operasi'},
            { name: 'Palpasi Tinggi Fundus Uteri'},
            { name: 'Letak'},
            { name: 'Presentasi'},
            { name: 'Nyeri Tekan'},
            { name: 'Penurunan Bagian Terendah'},
            { name: 'TBJ'},
            { name: 'Auskultasi DJJ'},
            { name: 'His/Kontraksi'},
            { name: 'Pemeriksaan Dalam Inspeksi'},
            { name: 'Pemeriksaan Dalam Inspekulo'},
            { name: 'Pemeriksaan Dalam VT'},
            { name: 'Pemeriksaan Ginekologi'},
            { name: 'Status Lokalis'},
            { name: 'Deskripsi Luka/Luka Bakar/Fraktur'},
            { name: 'Kode ICD-X'},
            { name: 'Konsul Dokter Spesialis'},
            { name: 'Advice'},
            { name: 'Rawat'},
            { name: 'Rujuk Ke RS'},
            { name: 'PAPS, Alasan'},
            { name: 'Tolak Rujuk, Alasan'},
            { name: 'Tolak Rawat, Alasan'},
            { name: 'Meninggal'},
            { name: 'Pulang'},
            { name: 'Ada Sumbatan, Berupa'},
            { name: 'Hasil EKG'},
            { name: 'Pupil'},
            { name: 'Diameter Kanan'},
            { name: 'Diameter Kiri'},
            { name: 'Penatalaksanaan di IGD'},
            { name: 'Kondisi Klinis saat Pulang'},
            { name: 'Kebutuhan Khusus'},
            { name: 'Kontrol'},
            { name: 'Tiba di Ruangan'},
            { name: 'Nama Pengantar'},
            { name: 'Asal Pasien'},
            { name: 'Riwayat Kesehatan yang Lalu'},
            { name: 'Bidan Yang Mengasesmen'},
            { name: 'Ya, Penyakit'},
            { name: 'Ya, Diagnosa'},
            { name: 'Ya, Kapan'},
            { name: 'Ya, Kapan'},
            { name: 'Ya, Di'},
            { name: 'Ya, Jenis Operasi'},
            { name: 'Ya, Obat'},
            { name: 'Ya, Sebutkan'},
            { name: 'Bila, Ya'},
            { name: 'Sebutkan'},
            { name: 'Riwayat Pengobatan'},
            { name: 'Riwayat Transfusi Darah'},
            { name: 'Riwayat merokok, Apakah anda merokok?'},
            { name: 'Riwayat Minuman Akohol, Apakah anda minum alkohol?'},
            { name: 'Apakah alkohol / obat -obatan menyebabkan masalah dalam hidup anda?'},
            { name: 'Riwayat penggunaan obat penenang (Diluar yang diresepkan dokter)'},
            { name: 'Riwayat Pekerjaan'},
            { name: 'TTV'},
            { name: 'Rambut & Kepala'},
            { name: 'Wajah'},
            { name: 'Telinga'},
            { name: 'Hidung Atau Tenggorokan'},
            { name: 'Mulut'},
            { name: 'Lidah Gigi'},
            { name: 'Leher'},
            { name: 'Respirasi'},
            { name: 'Mammae'},
            { name: 'Jantung'},
            { name: 'Ginjal'},
            { name: 'Genitaliat'},
            { name: 'Extremitas Atas'},
            { name: 'Extremitas Bawah'},
            { name: 'Integumen'},
            { name: 'BAB'},
            { name: 'BAK'},
            { name: 'Pasien Dengan Diagnosis Khusus'},
            { name: 'Status Fungsional'},
            { name: 'Skirining Nyeri'},
            { name: 'Status Psikologis'},
            { name: 'Status Mental'},
            { name: 'Status Sosial'},
            { name: 'Kebutuhan Spiritual Pasien dalam perawatan di RS'},
            { name: 'Status Kultural'},
            { name: 'Status Ekonomi Atau Pendidikan'},
            { name: 'Daftar Masalah Keperawatan'},
            { name: 'Rencana Keperawatan'},
            { name: 'DM Atau KEMOTERAPI Atau HEMODIALISA Atau GEATRI'},
            { name: 'Kebutuhan Khusus'},
            { name: 'Perawatan Lanjutan (Kontrol)'},
            { name: 'Jenis Atau Nama Obat'},
            { name: 'Pernah Di Operasi'},
            { name: 'Reaksi Utama Yang Timbul'},
            { name: 'Jumlah Atau Hari'},
            { name: 'Lama'},
            { name: 'Ya, Jelaskan'},
            { name: 'Reaksi utama Yang Timbul'},
            { name: 'Reaksi Yang Timbul'},
            { name: 'Jenis'},
            { name: 'Asesmen '},
            { name: 'Riwayat Menstruasi'},
            { name: 'Riwayat Menstruasi Menarche, Umur'},
            { name: 'Riwayat Menstruasi Menarche, Siklus'},
            { name: 'Riwayat Menstruasi Menarche, Lama'},
            { name: 'Riwayat Menstruasi Menarche, Volum'},
            { name: 'Riwayat Menstruasi Menarche, Keluhan Saat Haid'},
            { name: 'Riwayat Menstruasi Menarche, HPHT'},
            { name: 'Riwayat Menstruasi Menarche, Taksiran Partus'},
            { name: 'Riwayat Penyakit Ginekologi'},
            { name: 'Tekanan Darah'},
            { name: 'Frekuensi'},
            { name: 'Frekuensi Nadi'},
            { name: 'Frekuensi Nafas'},
            { name: 'Suhu'},
            { name: 'BB Sebelum Hamil'},
            { name: 'TB Sebelum Hamil'},
            { name: 'Lila'},
            { name: 'Riwayat pemakaian alat kontrasepsi'},
            { name: 'Lama Pemakaian'},
            { name: 'Ya Lama Pemakaian'},
            { name: 'Ya Keluhan'},
            { name: 'Ya Jenis'},
            { name: 'Riwayat Pernikahan'},
            { name: 'Menikah'},
            { name: 'Volume'},
            { name: 'Lama Menikah Dengan Suami 1'},
            { name: 'Riwayat Kehamilan Sekarang'},
            { name: 'Asuhan Antenatal'},
            { name: 'Keluhan Saat Hamil'},
            { name: 'Persepsi Dan Harapan Nyeri'},
            { name: 'Nyeri Hilang Bila'},
            { name: 'Durasi'},
            { name: 'Lokasi'},
            { name: 'Kateter, Terpasang Tanggal Atau pukul'},
            { name: 'Kateter, Ukuran Kateter'},
            { name: 'Kateter, Tipe'},
            { name: 'Skala Nyeri'},
            { name: 'Nama Obat'},
            { name: 'Dosis'},
            { name: 'Lama Penggunaan'},
        ]
    }



    filterOption(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = []
        let query = event.query

        for (let i = 0; i < (this.optionLabels as any[]).length; i++) {
            let option = (this.optionLabels as any[])[i]
            if (option.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(option)
            }
        }

        this.filteredOptionLabels = filtered
    }

    ngAfterViewInit(): void {
        this._formManagerService.onGet().subscribe({
            next: (res: FormManagerData) => {
                if (Array.isArray(res)) {
                    this.createDuplicateForm = res.filter((el) => el.dynamicForm != null);
                }
            },
            error: err => {
                console.log(err);
            },
        });
    }

    duplicateForm(): void {
        this.showDialogDuplicateForm()
    }

    addLabelOption(event: any): void {
        const pressedKey = event.event.key

        // Hanya melakukan sesuatu jika tombol yang ditekan adalah tombol "%"
        if (pressedKey === '%') {
            this.showDialog()
        }
    }

    addDuplicateForm(index: number) : void {

        const filteredData = this.createDuplicateForm[index]
        this.items = {
            formManager : this.formId,
            formFields: filteredData.dynamicForm['formFields'],
            formulir: filteredData.dynamicForm['formulir'],
        }

        this._formBuilderService.onPost(this.items).subscribe({
            next: response => {
                this.addDynamicFormToFormManager(response)
                this._snackBar.open('Data posted successfully', 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })

                this.showComponent = true
            },
            error: error => {
                let errorMessage = 'Error posting data'

                if (error && error.error && error.error.message) {
                    errorMessage = error.error.message
                }

                this._snackBar.open(errorMessage, 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })
            },
        })

        this.visibleDuplicateForm = false
    }


    showDialog() {
        this.visible = true
    }

    showDialogDuplicateForm() {
        this.visibleDuplicateForm = true
    }

    selectOption(option: string): void {
        this.showOptions = false
    }

    onOptionSelect(option: string): void {
        this.visible = false;
        const camelCaseOption = this.convertToCamelCase(option);
        const wrappedOption = `%${camelCaseOption}%`;
        this.copyToClipboard(wrappedOption);
    }

    convertToCamelCase(value: string): string {
        return value.replace(/\s+/g, '').replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
            if (+match === 0) return ''; // menghilangkan spasi jika ada
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    copyToClipboard(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    onDrop(event: CdkDragDrop<string[]>) {
        const movedField = this.formFields[event.previousIndex]
        this.formFields.splice(event.previousIndex, 1)
        this.formFields.splice(event.currentIndex, 0, movedField)
    }

    initializeForm() {
        this.form = this.fb.group({
            // Initialize your form controls as needed
            newFieldLabel: ['', Validators.required],
            newFieldType: ['text', Validators.required],
            newFieldValidation: [''],
            newOptionField: [''],
            editor: ['editor', Validators.required],
            newFieldOptions: this.fb.control(''),
        })
    }

    get newFieldOptions() {
        return this.form.get('newFieldOptions') as FormControl
    }

    toggleDrawerMode(): void {
        this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side'
    }

    toggleDrawerOpen(): void {
        this.drawerOpened = !this.drawerOpened
    }

    drawerOpenedChanged(opened: boolean): void {
        this.drawerOpened = opened
    }

    shouldShowOptionField(): boolean {
        // Check whether the option field should be shown based on the selected field type
        const selectedFieldType = this.form.get('newFieldType').value
        return ['select', 'radio', 'checkbox'].includes(selectedFieldType)
    }

    // Di dalam komponen yang terkait
    addField() {
        const newField = this.createField()
        this.formFields.push(newField)
    }

    createField(): any {
        if (this.form.invalid) {
            // Mark the form as touched to display validation errors
            this.form.markAllAsTouched()
            return
        }

        const label = this.form.get('newFieldLabel').value
        const camelCaseName = this.generateNameFromLabel(label)

        const newField = {
            label: label,
            name: camelCaseName,
            type: this.form.get('newFieldType').value,
            validation: this.form.get('newFieldValidation').value,
            options: [],
        }

        // Create FormControl for each option
        if (
            newField.type === 'checkbox' ||
            newField.type === 'radio' ||
            newField.type === 'select'
        ) {
            newField.options = this.form
                .get('newOptionField')
                .value.split(',')
                .map(option => option.trim())
        }

        this.formData.push(newField)
        this.form.addControl(newField.name, this.fb.control('', []))

        // Clear the form controls for the next input
        this.form.get('newFieldLabel').setValue('')
        this.form.get('newFieldType').setValue('text')
        this.form.get('newFieldValidation').setValue('')

        this.drawerOpened = false
        return newField
    }

    resetField() {
        if (this.form.invalid) {
            // Mark the form as touched to display validation errors
            this.form.markAllAsTouched()
            return
        }

        const label = this.form.get('newFieldLabel').value
        const camelCaseName = this.generateNameFromLabel(label)

        const newField = {
            label: label,
            name: camelCaseName,
            type: this.form.get('newFieldType').value,
            validation: this.form.get('newFieldValidation').value,
            options: [],
        }

        // Create FormControl for each option
        if (
            newField.type === 'checkbox' ||
            newField.type === 'radio' ||
            newField.type === 'select'
        ) {
            newField.options = this.form
                .get('newOptionField')
                .value.split(',')
                .map(option => option.trim())
        }

        this.formData.push(newField)
        this.form.addControl(newField.name, this.fb.control('', []))

        // Clear the form controls for the next input
        this.form.get('newFieldLabel').setValue('')
        this.form.get('newFieldType').setValue('text')
        this.form.get('newFieldValidation').setValue('')

        // Convert the form data to JSON and send it
        this.formFields = this.formData
        this.drawerOpened = false
    }

    generateNameFromLabel(label: string): string {
        const sanitizedLabel = label['name'].replace(/[^\w\s]/gi, '') // Remove non-word characters
        const camelCaseName = sanitizedLabel
            .split(' ')
            .map((word, index) =>
                index === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('')

        return camelCaseName
    }

    removeField(index: number) {
        this.formFields.splice(index, 1)
    }

    onSubmit() {
        const angularFormValue = this.form.value
        const finalFormData = this.formFields.map(field => ({
            ...angularFormValue[field.name],
            ...field,
        }))

        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id')
        })

        this.items = {
            formManager : this.formId,
            formFields: finalFormData,
        }

        this._formBuilderService.onPost(this.items).subscribe({
            next: response => {
                this.addDynamicFormToFormManager(response)
                this._snackBar.open('Data posted successfully', 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })

                this.showComponent = true

                // this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                // this._changeDetectorRef.markForCheck();
            },
            error: error => {
                let errorMessage = 'Error posting data'

                if (error && error.error && error.error.message) {
                    errorMessage = error.error.message
                }

                this._snackBar.open(errorMessage, 'Close', {
                    duration: 3000,
                    verticalPosition: 'top' as MatSnackBarVerticalPosition,
                })
            },
        })
    }

    addDynamicFormToFormManager(response) {
        this.dynamicFormId = response['result']['id']
        this.formManagerData = {
            dynamicForm: this.dynamicFormId,
        }

        this._formManagerService
            .onPut(this.formManagerData, this.formId)
            .subscribe({
                next: value => {
                    console.log(value)
                },
                error: err => {
                    console.log(err)
                },
            })
    }

    onSubmitFormat() {
        const editorContent = this.formEditor.get('editor').value
        this._activatedRoute.paramMap.subscribe(params => {
            this.formId = params.get('id')
        })

        this.items = {
            formManager: this.formId,
            formulir: editorContent,
        }

        this._formBuilderService.onPut(this.items, this.formId).subscribe({
            next: res => {
                // this.items.formulir
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Formulir berhasil di buat`,
                })
                console.log(res)
            },
            error: err => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.error,
                })
                console.log(err)
            },
        })
    }
}
