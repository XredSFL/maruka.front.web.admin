import { createReadStream } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { path } = req.query;
  const imagePath = join(process.cwd(), 'public', 'img', ...path);

  const stream = createReadStream(imagePath);
  stream.pipe(res);
}

export const config = {
  api: {
    responseLimit: false,
  },
};