import { Component, OnInit } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormManagerData } from '../../master/form-manager/form-manager.types';
import { FormManagerService } from '../../master/form-manager/form-manager.service';
import { RouterLink } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [OrderListModule, RouterLink,DynamicDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  providers: [DynamicDialogRef]
})

export class DialogComponent implements OnInit {
    formManager: FormManagerData;
    nmPasien: any;
    noRawat: any;
    noRkmMedis: any;
    codec = new HttpUrlEncodingCodec();

    constructor(
        private _formManagerService: FormManagerService,
        public ref: DynamicDialogRef, public config: DynamicDialogConfig,
        public dialogService: DialogService
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

    hideDialog(): void {
        this.ref.close
    }

    encodeId(noRawat: string): string {
       return this.codec.encodeValue(noRawat);
    }
}
