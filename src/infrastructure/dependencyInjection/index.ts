import { Container } from "inversify";

import { bind as networkBind } from "./network/bind";
import { bind as repositoryBind } from "./repository/bind";

export const container = new Container();
networkBind(container);
repositoryBind(container);
