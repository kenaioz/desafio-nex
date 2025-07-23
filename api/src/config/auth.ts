import { TextEncoder } from 'util';

import config from './env';

export const JWT_SECRET = new TextEncoder().encode(config.JWT_SECRET);
