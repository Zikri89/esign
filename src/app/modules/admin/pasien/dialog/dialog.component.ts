import { Component, OnInit } from '@angular/core';
import { Pasien } from '../pasien.types';
import { PasienService } from '../pasien.service';
import { OrderListModule } from 'primeng/orderlist';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormManagerData } from '../../master/form-manager/form-manager.types';
import { FormManagerService } from '../../master/form-manager/form-manager.service';
import { RouterLink } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [OrderListModule, RouterLink],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
    formManager: FormManagerData;
    nmPasien: any;
    noRawat: any;
    noRkmMedis: any;

    constructor(
        private _formManagerService: FormManagerService,
        public ref: DynamicDialogRef, public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.nmPasien = this.config.data.nmPasien
        this.noRawat = this.config.data.noRawat
        this.noRkmMedis = this.config.data.noRkmMedis
        this._formManagerService.data$.subscribe({
            next: (res) => {
                this.formManager = res;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    encodeId(id: string): void {
        encodeURIComponent(id);
    }
}
