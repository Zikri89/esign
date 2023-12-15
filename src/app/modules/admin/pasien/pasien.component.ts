import { DatePipe, NgFor, NgIf } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
    Input,
} from '@angular/core'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { PasienService } from './services/pasien.service'
import { Pasien } from './pasien.types'
import { FuseDrawerComponent, FuseDrawerPosition } from '@fuse/components/drawer'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { Table, TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { DialogComponent } from './dialog/dialog.component'

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
        MatSidenavModule,
        RouterOutlet,
        NgIf,
        FuseDrawerComponent,
        MatIconModule,
        TableModule,
        DatePipe,
        OrderListModule,
        DynamicDialogModule
    ],
    providers: [DialogService]
})
export class PasienComponent implements OnInit, OnDestroy {
    pasien: Pasien[] = [];
    selectedPasien!: Pasien;
    loading: boolean = true;
    nmPasien : any;
    noRawat : any;
    noRkmMedis : any;

    ref: DynamicDialogRef | undefined;
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _pasienService: PasienService,
        public dialogService: DialogService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._pasienService.data$.subscribe({
            next: (res) => {
                this.pasien = res;
                this.loading = false;
                this.pasien.forEach((pasien) => (pasien.tgl_registrasi = new Date(<Date>pasien.tgl_registrasi)));
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    onRowSelect(event: any) {
        this.nmPasien = event.data.nm_pasien
        this.noRawat = event.data.no_rawat
        this.noRkmMedis = event.data.no_rkm_medis
    }

    onRowUnselect(event: any) {
        console.log('unselected')
    }

    show() {
        this.ref = this.dialogService.open(DialogComponent, {
            data: {
                nmPasien: this.nmPasien,
                noRawat: this.noRawat,
                noRkmMedis: this.noRkmMedis
            },
            header: 'Pilih Formulir'
        });
    }
}
