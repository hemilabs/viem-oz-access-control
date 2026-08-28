import type { Address, Client, Hash } from "viem";
import { writeContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";
import {
  validateAddress,
  validateClientAccount,
  validateRole,
} from "../validation.js";

export const grantRole = async function (
  client: Client,
  parameters: { account: Address; address: Address; role: Hash },
) {
  const { account, address, role } = parameters ?? {};

  validateClientAccount(client);
  validateAddress(address, "contract");
  validateRole(role);
  validateAddress(account, "account");

  return writeContract(client, {
    abi: accessControlAbi,
    account: client.account,
    address,
    args: [role, account],
    chain: client.chain,
    functionName: "grantRole",
  });
};
