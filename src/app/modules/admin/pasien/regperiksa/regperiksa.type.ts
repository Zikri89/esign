// row.model.ts
export interface RowModel {
    tgl_registrasi: string;
    jam_reg: string;
    nomor_antrian: string;
    no_rkm_medis: string;
    nm_pasien: string;
    tgl_lahir: string;
    alam_pasien: string;
    ktp_pasien: string;
    tlp_pasien: string;
    umurdaftar: number;
    sttsumur: string;
    png_jawab: string;
    nm_poli: string;
    nm_dokter: string;
    no_rawat: string;
    stts: string;
    biaya_reg: number;
    kd_dokter: string;
    kd_poli: string;
  }

  // field.model.ts
  export interface FieldModel {
    catalog: string;
    db: string;
    table: string;
    orgTable: string;
    name: string;
    orgName: string;
    charsetNr: number;
    length: number;
    type: number;
    flags: number;
    decimals: number;
    zeroFill: boolean;
    protocol41: boolean;
  }

  // data.model.ts
  export interface RegPeriksa {
    rows: RowModel[];
    fields: FieldModel[];
  }
