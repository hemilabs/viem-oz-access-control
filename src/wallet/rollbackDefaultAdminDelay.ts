import type { Address, Client } from "viem";
import { writeContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";
import { validateAddress, validateClientAccount } from "../validation.js";

export const rollbackDefaultAdminDelay = async function (
  client: Client,
  parameters: { address: Address },
) {
  const { address } = parameters ?? {};

  validateClientAccount(client);
  validateAddress(address, "contract");

  return writeContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    account: client.account,
    address,
    chain: client.chain,
    functionName: "rollbackDefaultAdminDelay",
  });
};
