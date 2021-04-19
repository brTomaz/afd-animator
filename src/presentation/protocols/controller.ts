import { Response } from './response';

export interface Controller {
  handle: () => Response;
}
