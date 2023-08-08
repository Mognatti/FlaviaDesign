export interface CreatingProcedimentoCardProps {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CalendarPreviewProps {
  emailLink: string;
}

export interface Client {
  id?: number;
  name: string;
  cel_number: string;
  last_visit?: string;
  last_service?: string;
  services?: string[];
}

export interface DateLib {
  $D: number;
  $H: number;
  $L: number;
  $M: number;
  $W: number;
  $d: string;
  $m: number;
  $ms: number;
  $s: number;
  $u?: number;
  $x: JSON;
  $y: number;
}

export interface Procedimento {
  id: number;
  name: string;
  price: number;
  hours: number;
  minutes: number;
}
