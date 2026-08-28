import type { Address, Client, Hash } from "viem";
import { readContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";
import {
  validateAddress,
  validateClient,
  validateRole,
} from "../validation.js";

export const getRoleAdmin = async function (
  client: Client,
  parameters: { address: Address; role: Hash },
) {
  const { address, role } = parameters ?? {};

  validateClient(client);
  validateAddress(address, "contract");
  validateRole(role);

  return readContract(client, {
    abi: accessControlAbi,
    address,
    args: [role],
    functionName: "getRoleAdmin",
  });
};
