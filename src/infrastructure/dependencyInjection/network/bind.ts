import { Container } from 'inversify';

import { HttpManager, AxiosHttpManager } from '../../network/http';

export const bind = (container: Container) => {
  container.bind<HttpManager>('HttpManager').to(AxiosHttpManager);
};
