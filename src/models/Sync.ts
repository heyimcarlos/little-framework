import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor(public serverURL: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.serverURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (!id) {
      return axios.post(this.serverURL, data);
    } else {
      return axios.put(`${this.serverURL}/${id}`, data);
    }
  }
}
