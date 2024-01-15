import { IPlante } from 'app/shared/model/plante.model';
import { IParcelle } from 'app/shared/model/parcelle.model';

export interface IPlantage {
  id?: number;
  date?: string | null;
  nombre?: number | null;
  planteLibelle?: IPlante | null;
  parcelleLibelle?: IParcelle | null;
}

export const defaultValue: Readonly<IPlantage> = {};
