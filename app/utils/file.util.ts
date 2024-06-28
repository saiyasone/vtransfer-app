import moment from 'moment';
import fs from 'react-native-fs';

export async function getFileDateCreated(uri: string) {
  const statResult = await fs.stat(uri);
  const mtime = await statResult.mtime;

  if (mtime) {
    const date = new Date(mtime);
    return moment(date).format('MM/DD/YYYY');
  }

  return '';
}
