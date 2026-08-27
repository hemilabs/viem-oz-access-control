import type { Account, Chain, Client, Transport } from "viem";

import { defaultAdmin } from "./public/defaultAdmin.js";
import { defaultAdminDelay } from "./public/defaultAdminDelay.js";
import { defaultAdminDelayIncreaseWait } from "./public/defaultAdminDelayIncreaseWait.js";
import { getRoleAdmin } from "./public/getRoleAdmin.js";
import { hasRole } from "./public/hasRole.js";
import { pendingDefaultAdmin } from "./public/pendingDefaultAdmin.js";
import { pendingDefaultAdminDelay } from "./public/pendingDefaultAdminDelay.js";
import { acceptDefaultAdminTransfer } from "./wallet/acceptDefaultAdminTransfer.js";
import { beginDefaultAdminTransfer } from "./wallet/beginDefaultAdminTransfer.js";
import { cancelDefaultAdminTransfer } from "./wallet/cancelDefaultAdminTransfer.js";
import { changeDefaultAdminDelay } from "./wallet/changeDefaultAdminDelay.js";
import { grantRole } from "./wallet/grantRole.js";
import { renounceRole } from "./wallet/renounceRole.js";
import { revokeRole } from "./wallet/revokeRole.js";
import { rollbackDefaultAdminDelay } from "./wallet/rollbackDefaultAdminDelay.js";

export { accessControlAbi, accessControlDefaultAdminRulesAbi } from "./abi.js";
export { defaultAdminRole } from "./constants.js";
export { roleId } from "./utils.js";

// for .extend() usage
export const accessControlPublicActions =
  () =>
  <
    TTransport extends Transport = Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ) => ({
    defaultAdmin: (params: Parameters<typeof defaultAdmin>[1]) =>
      defaultAdmin(client, params),
    defaultAdminDelay: (params: Parameters<typeof defaultAdminDelay>[1]) =>
      defaultAdminDelay(client, params),
    defaultAdminDelayIncreaseWait: (
      params: Parameters<typeof defaultAdminDelayIncreaseWait>[1],
    ) => defaultAdminDelayIncreaseWait(client, params),
    getRoleAdmin: (params: Parameters<typeof getRoleAdmin>[1]) =>
      getRoleAdmin(client, params),
    hasRole: (params: Parameters<typeof hasRole>[1]) => hasRole(client, params),
    pendingDefaultAdmin: (params: Parameters<typeof pendingDefaultAdmin>[1]) =>
      pendingDefaultAdmin(client, params),
    pendingDefaultAdminDelay: (
      params: Parameters<typeof pendingDefaultAdminDelay>[1],
    ) => pendingDefaultAdminDelay(client, params),
  });

// for .extend() usage
export const accessControlWalletActions = () => (client: Client) => ({
  acceptDefaultAdminTransfer: (
    params: Parameters<typeof acceptDefaultAdminTransfer>[1],
  ) => acceptDefaultAdminTransfer(client, params),
  beginDefaultAdminTransfer: (
    params: Parameters<typeof beginDefaultAdminTransfer>[1],
  ) => beginDefaultAdminTransfer(client, params),
  cancelDefaultAdminTransfer: (
    params: Parameters<typeof cancelDefaultAdminTransfer>[1],
  ) => cancelDefaultAdminTransfer(client, params),
  changeDefaultAdminDelay: (
    params: Parameters<typeof changeDefaultAdminDelay>[1],
  ) => changeDefaultAdminDelay(client, params),
  grantRole: (params: Parameters<typeof grantRole>[1]) =>
    grantRole(client, params),
  renounceRole: (params: Parameters<typeof renounceRole>[1]) =>
    renounceRole(client, params),
  revokeRole: (params: Parameters<typeof revokeRole>[1]) =>
    revokeRole(client, params),
  rollbackDefaultAdminDelay: (
    params: Parameters<typeof rollbackDefaultAdminDelay>[1],
  ) => rollbackDefaultAdminDelay(client, params),
});
