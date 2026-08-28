import type { Address, Client } from "viem";
import { writeContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";
import { validateAddress, validateClientAccount } from "../validation.js";

export const beginDefaultAdminTransfer = async function (
  client: Client,
  parameters: { address: Address; newAdmin: Address },
) {
  const { address, newAdmin } = parameters ?? {};

  validateClientAccount(client);
  validateAddress(address, "contract");
  validateAddress(newAdmin, "newAdmin");

  return writeContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    account: client.account,
    address,
    args: [newAdmin],
    chain: client.chain,
    functionName: "beginDefaultAdminTransfer",
  });
};
