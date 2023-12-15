import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormDataPasienService } from '../form-data-pasien.service';
import { FormDataPasien } from './general-concent.type';
import SignaturePad from 'signature_pad'
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
        MatIconModule
  ],
  templateUrl: './general-concent.component.html',
  styleUrl: './general-concent.component.scss'
})
export class GeneralConcentComponent implements OnInit, AfterViewInit {
    formDataPasien: FormDataPasien;
    signPad: any
    @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any
    signImage: any
    constructor(
        private _formDataPasienService: FormDataPasienService
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
    }

    ngAfterViewInit() {
        if (this.signaturePadElement) {
            this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
        }
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
