import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormDataPasienService } from '../form-data-pasien.service';
import { FormDataPasien } from './general-concent.type';
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
        MomentModule
  ],
  templateUrl: './general-concent.component.html',
  styleUrl: './general-concent.component.scss'
})
export class GeneralConcentComponent implements OnInit, AfterViewInit {
    @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any
    formDataPasien: FormDataPasien;
    signPad: any
    formulir: DynamicForm
    replacedText: string = '';
    signImage: any
    tanggalLahir: string = '';
    constructor(
        private _formDataPasienService: FormDataPasienService,
        private _formBuilderService: FormBuilderService
    ) {}

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
        this.tanggalLahir = moment.utc(this.formDataPasien.dataJson['tanggalLahir']).local().format('MM-DD-YYYY');
        this.replacedText = formulir
          .replace('%namaPasien%', this.formDataPasien.dataJson['nama'])
          .replace('%tanggalLahir%', this.tanggalLahir)
          .replace('%alamatPasien%', this.formDataPasien.dataJson['alamat'])
          .replace('%noTelponPasien%', this.formDataPasien.dataJson['noTelpon'])
          .replace('%namaWali1%', this.formDataPasien.dataJson['namaWali1'] ?? '..........')
          .replace('%namaWali2%', this.formDataPasien.dataJson['namaWali2'] ?? '..........')
          .replace('%namaWali3%', this.formDataPasien.dataJson['namaWali3'] ?? '..........')
          .replace('%namaPrivasi%', this.formDataPasien.dataJson['namaPrivasi'] ?? '..........')
          .replace('%namaProfesi%', this.formDataPasien.dataJson['namaProfesi'] ?? '..........')
          .replace('%lainLain%', this.formDataPasien.dataJson['lainLain'] ?? '..........')
          .replace('%biaya%', this.formDataPasien.dataJson['biaya'] ?? '..........');
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
