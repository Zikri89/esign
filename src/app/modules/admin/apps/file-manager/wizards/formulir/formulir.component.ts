import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormDataPasienService } from '../form-data-pasien.service';
import { FormDataPasien } from './formulir.type';
import SignaturePad from 'signature_pad'
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilderService } from 'app/modules/admin/master/form-builder/build-form.service';
import { DynamicForm } from 'app/modules/admin/master/form-builder/build-form.type';
import { EditorModule } from 'primeng/editor';
import { MomentModule } from 'ngx-moment';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-general-concent',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
        MatSelectModule,
        CommonModule,
        MatButtonModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        EditorModule,
        MomentModule,
        FormsModule,
  ],
  templateUrl: './formulir.component.html',
  styleUrl: './formulir.component.scss',
})

export class GeneralConcentComponent implements OnInit, AfterViewInit {
    @Pipe({ name: 'safeHtml'})
    @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any
    formDataPasien: FormDataPasien;
    signPad: any
    formulir: DynamicForm
    replacedText: string = '';
    contentForm: SafeHtml;
    signImage: any
    tanggalLahir: string = '';
    constructor(
        private _formDataPasienService: FormDataPasienService,
        private _formBuilderService: FormBuilderService,
        private sanitized: DomSanitizer
    ) {
        moment.locale('id');
    }

    ngOnInit(): void {
        this._formDataPasienService.data$.subscribe({
            next: (res) => {
                this.formDataPasien = res;
            },
            error: (err) => {
                console.log(err);
            }
        })

        this._formBuilderService.data$.subscribe({
            next: (res) => {
                this.formulir = res['formulir']
                this.replacePlaceholders(this.formulir);
            },
            error: (err) => {
                console.log(err)
            }
        })
    }


    ngAfterViewInit() {
        if (this.signaturePadElement) {
            this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
        }
    }


    replacePlaceholders(formulir) {
        const tanggalObjek = moment(this.formDataPasien.dataJson['tanggalLahirPasienAtauWali']);
        const tahun = tanggalObjek.format('YYYY');
        const bulan = tanggalObjek.format('MMMM');
        const tanggal = tanggalObjek.format('D');
        const jam = tanggalObjek.format('H');
        const menit = tanggalObjek.format('m');

        const placeholderData = {};
        Object.entries(this.formDataPasien.dataJson).forEach(([key, value]) => {
            placeholderData[`%${key}%`] = value ?? '............';
        });

        placeholderData['%tanggalLahirPasienAtauWali%'] = tanggalObjek.format('D MMMM YYYY');

        const replacePlaceholders = (template: string, data: any) => {
            return template.replace(/%\w+%/g, match => data[match] || match);
        };

        // Mengganti semua placeholder dalam formulir
        this.replacedText = replacePlaceholders(formulir, placeholderData);

        this.contentForm = this.sanitized.bypassSecurityTrustHtml(this.replacedText);
    }


    startSignPadDrawing(event: Event) {
        console.log(event)
    }

    movedFinger(event: Event) {}

    undoSign() {
        const data = this.signPad.toData()
        if (data) {
            data.pop() // remove the last step
            this.signPad.fromData(data)
        }
    }

    clearSignPad() {
        this.signPad.clear()
    }

    onSubmit(): void {
        // aktfikan jika mau ada ttd digital di bagian form, jangan lupa aktifkan juga attribute model di backend nya
        const base64ImageData = this.signPad.toDataURL()
        this.signImage = base64ImageData
    }
}
