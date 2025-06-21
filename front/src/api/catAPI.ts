import { Cat } from '../types';
import { Api } from './api'; 

export const API_URL = import.meta.env.VITE_CAT_API_URL!;

export interface ICatAPI {
  getCats: () => Promise<Cat[]>;
  getCat: (id:string)=> Promise<Cat>;
}

export class CatAPI extends Api implements ICatAPI {

  getCats = (): Promise<Cat[]> => {
    return this.request<Cat[]>(`/search?limit=10`, {
      method: "GET"
    });
  };

  getCat= (id:string): Promise<Cat> => {
    return this.request<Cat>(`/`+id, {
      method: "GET"
    });
  }

}

const catAPI=new CatAPI(API_URL);
export default catAPI;
