import { CatLike, DataCatLike, SuccessResult } from '../types';
import { Api } from './api'; 

export const API_URL = import.meta.env.VITE_CAT_LIKE_API_URL!;

export interface ICatLikeAPI {
  getCatLikes: () => Promise<DataCatLike>;
  postLike: (like:CatLike)=>Promise<SuccessResult>;
  deleteLike: (id:string)=>Promise<SuccessResult>;
}

export class CatLikeAPI extends Api implements ICatLikeAPI {

  getCatLikes = async (): Promise<DataCatLike> => {
    const res=await this.request<DataCatLike>(`/likes`, {
      method: "GET"
    });
    console.log('api getCatLikes',res)
    return res;
  };

  postLike = async (like:CatLike)=> {
    const res=await this.request<SuccessResult>(`/likes`, {
      method: "POST",
      body: JSON.stringify({ ...like }),      
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  deleteLike = async (id:string): Promise<SuccessResult> => {
    const res=await this.request<SuccessResult>(`/likes/`+id, {
      method: "DELETE"
    });
    return res;
  };


}

const catLikeAPI=new CatLikeAPI(API_URL);
export default catLikeAPI;
