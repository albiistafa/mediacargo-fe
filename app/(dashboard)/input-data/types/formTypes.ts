export interface RuteItem {
  rute_id: string;
  urutan: number;
}

export interface RuteOption {
  id: string;
  rute: string;
}

export interface FormData {
  noSuratJalan: string;
  noSeal: string;
  nameDriver: string;
  nameRute: string;
  ruteType: string;
  jenisRitase: string;
  platNomor: string;
  keteranganPlat: string;
  jenisMobil: string;
  jenisTrip: string;
  waktuBerangkat: string;
  waktuTiba: string;
  rateSebelumTax: string; 
  ppn: string;
  pph: string;
  totalSetelahTax: string;
  keterangan: string;
  noInvoice: string;
  ruteList: RuteItem[];
}

export interface InputDataFormProps {
  initialData?: Partial<FormData>;
  onSubmit?: (data: FormData) => void;
}
