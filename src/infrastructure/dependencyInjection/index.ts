import { Container } from 'inversify';

import { bind as networkBind } from './network/bind';
import { bind as repositoryBind } from './repository/bind';
import { bind as localStorageBind } from './storage/bind';

export const container = new Container();
networkBind(container);
repositoryBind(container);
localStorageBind(container);
