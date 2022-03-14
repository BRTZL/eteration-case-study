import * as api from '.';
import { Simpson } from '../models';

export async function fetchSimpsons(): Promise<Simpson[]> {
  const res = await api.get('/simpsons');

  if (res) {
    return res;
  }
  throw new Error(res.toString());
}
