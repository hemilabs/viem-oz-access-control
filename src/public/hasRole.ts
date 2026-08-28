import type { Address, Client, Hash } from "viem";
import { readContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";
import {
  validateAddress,
  validateClient,
  validateRole,
} from "../validation.js";

export const hasRole = async function (
  client: Client,
  parameters: { account: Address; address: Address; role: Hash },
) {
  const { account, address, role } = parameters ?? {};

  validateClient(client);
  validateAddress(address, "contract");
  validateRole(role);
  validateAddress(account, "account");

  return readContract(client, {
    abi: accessControlAbi,
    address,
    args: [role, account],
    functionName: "hasRole",
  });
};
