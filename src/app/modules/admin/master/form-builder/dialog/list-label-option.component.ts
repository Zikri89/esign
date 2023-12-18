import { Component, OnInit } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterLink } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'list-option-label',
  standalone: true,
  imports: [OrderListModule, RouterLink,DynamicDialogModule],
  templateUrl: './list-label-option.component.html',
  providers: [DynamicDialogRef]
})

export class ListOptionLabelComponent implements OnInit {
    optionLabels: any[] = [];
    constructor(
        public ref: DynamicDialogRef, public config: DynamicDialogConfig,
        public dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.optionLabels = [
            { name: '%namaPasien%' },
            { name: '%tanggalLahirPasienAtauWali%' },
            { name: '%alamatPasien%' },
            { name: '%noTelponPasien%' },
            { name: '%namaWali1%' },
            { name: '%namaWali2%' },
            { name: '%namaWali3%' },
            { name: '%namaPrivasi%' },
            { name: '%namaProfesi%' },
            { name: '%lainLain%' },
            { name: '%dokterPelaksanaTindakan%' },
            { name: '%pemberiInformasi%' },
            { name: '%penerimaInformasi%' },
            { name: '%diagnosisKerjaDanDiagnosisBanding%' },
            { name: '%kondisiPasien%' },
            { name: '%tindakanYangDiusulkan%' },
            { name: '%tatacaraDanTujuanTindakan%' },
            { name: '%manfaatDanResikoTindakan%' },
            { name: '%namaOrangYangMengerjakanTindakan%' },
            { name: '%namaOrangYangMengerjakanTindakan%' },
            { name: '%prognosisDariTindakan%' },
            { name: '%kemungkinanHasilYangTidakTerduga%' },
            { name: '%kemungkinanHasilBilaTidakDilakukanTindakan%' },
            { name: '%namaPasienAtauWali%' },
            { name: '%umurPasienAtauWali%' },
            { name: '%alamatPasienAtauWali%' },
            { name: '%tindakanAtauPengobatan%' },
            { name: '%umurPasien%' },
            { name: '%tahunBuat%' },
            { name: '%bulanBuat%' },
            { name: '%tanggalBuat%' },
            { name: '%tanggalLahirPasien%' },
            { name: '%pukulBuat%' },
            { name: '%noRekamMedis%' },
            { name: '%namaDokterI%' },
            { name: '%namaDokterII%' },
            { name: '%namaDokterSpesialisI%' },
            { name: '%namaDokterSpesialisII%' },
            { name: '%namaDokterSubSpesialisI%' },
            { name: '%namaDokterSubSpesialisII%' },
            { name: '%jenisKelaminPasienAtauWali%' },
            { name: '%jenisKelaminPasien%' },
            { name: '%tanggalMasukRawatInap%' },
            { name: '%ruangAtauKelas%' },
            { name: '%noTelponPasienAtauWali%' },
            { name: '%namaAnggotaKeluarga1%' },
            { name: '%namaAnggotaKeluarga2%' },
            { name: '%namaAnggotaKeluarga3%' },
            { name: '%namaPenjenguk%' },
            { name: '%profesiPenjenguk%' },
            { name: '%tempatLahirPasien%' },
            { name: '%tempatLahirPasienAtauWali%' },
            { name: '%statusPasienSebagai%' },
            { name: '%namaYangBertandaTangan%' },
            { name: '%umurYangBertandaTangan%' },
            { name: '%tempatLahirYangBertandaTangan%' },
            { name: '%tanggalLahirYangBertandaTangan%' },
            { name: '%alamatLahirYangBertandaTangan%' },
            { name: '%namaDokterPenanggungJawab%' },
            { name: '%alamatYangBertandaTangan%' },
            { name: '%sayaMenginginkanAtauTidakMenginginkanPrivasiKhusus%' },
            { name: '%biayaPengobatanAtauBiayaTindakan%' },
          ];


    }

    hideDialog(): void {
        this.ref.close
    }
}
