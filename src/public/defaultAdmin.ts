import type { Address, Client } from "viem";
import { readContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";
import { validateAddress, validateClient } from "../validation.js";

export const defaultAdmin = async function (
  client: Client,
  parameters: { address: Address },
) {
  const { address } = parameters ?? {};

  validateClient(client);
  validateAddress(address, "contract");

  return readContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    address,
    functionName: "defaultAdmin",
  });
};
