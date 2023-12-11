import { DatePipe, NgFor, NgIf } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { PasienService } from './pasien.service'
import { Pasien } from './pasien.types'
import { DataTablesModule } from 'angular-datatables'

@Component({
    selector: 'pasien',
    templateUrl: './pasien.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        RouterLink,
        NgFor,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        DataTablesModule,
    ],
})
export class PasienComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    dtOptions: DataTables.Settings = {}
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _pasienService: PasienService,
        private datePipe: DatePipe,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback: any) => {
                this._pasienService.data$.subscribe(data => {
                    callback({
                        data: data,
                    })
                })
            },
            columns: [
                {
                    title: 'Tanggal Registrasi',
                    data: 'tgl_registrasi',
                    render: function(data, type, row){
                        return data
                    }
                },
                {
                    title: 'Jam Registrasi',
                    data: 'jam_reg',
                },
                {
                    title: 'Nomor Antrian',
                    data: 'nomor_antrian',
                },
                {
                    title: 'No Rekam Medis',
                    data: 'no_rkm_medis',
                },
                {
                    title: 'Nama Pasien',
                    data: 'nm_pasien',
                },
                {
                    title: 'Usia',
                    data: 'umurdaftar',
                    render: function(data, type, row){
                        row.u
                        return `${row.umurdaftar}  ${row.sttsumur}`;
                    }
                },
                {
                    title: 'Penanggung Jawab',
                    data: 'png_jawab',
                },
                {
                    title: 'Nama Poli',
                    data: 'nm_poli',
                },
                {
                    title: 'Nama Dokter',
                    data: 'nm_dokter',
                },
                {
                    title: 'No Rawat',
                    data: 'no_rawat',
                },
                {
                    title: 'Status',
                    data: 'stts',
                },
                {
                    title: 'Biaya Registrasi',
                    data: 'biaya_reg',
                },
                {
                    title: 'Kode Dokter',
                    data: 'kd_dokter',
                },
                {
                    title: 'Kode Poli',
                    data: 'kd_poli',
                },
            ],
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }
}
