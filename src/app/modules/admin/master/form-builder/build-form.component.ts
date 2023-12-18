import { CdkScrollable } from '@angular/cdk/scrolling'
import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule, NgClass, NgIf } from '@angular/common'
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
            { name: 'Pasien dan keluarga diberikan informasi tentang perencanaan pulang ?' },
            { name: 'Waktu Rencana Lama Rawat' },
            { name: 'Rencana Lama Rawat Belum Bisa ditetapkan Karena' },
            { name: 'Ketika pulang, masih memerlukan kebutuhan khusus' },
            { name: 'Ketika pulang, masih memerlukan kebutuhan khusus Remark (Ya)' },
            { name: 'Ketika pulang, masih memerlukan perawatan lanjutan Remark (kontrol)' },
            {name: 'Saya Menginginkan atau Tidak Menginginkan Privasi Khusus'},
            { name: 'Biaya Pengobatan atau Biaya Tindakan' },
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

    ngAfterViewInit(): void {}

    addLabelOption(event: any): void {
        const pressedKey = event.event.key

        // Hanya melakukan sesuatu jika tombol yang ditekan adalah tombol "%"
        if (pressedKey === '%') {
            this.showDialog()
        }
    }

    showDialog() {
        this.ref = this.dialogService.open(ListOptionLabelComponent, {
            header: 'Pilih Label',
        })
    }

    selectOption(option: string): void {
        this.showOptions = false
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
