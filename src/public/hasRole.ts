import { type Address, type Client, type Hash, isAddress, isHash } from "viem";
import { readContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";

export const hasRole = async function (
  client: Client,
  parameters: { account: Address; address: Address; role: Hash },
) {
  const { account, address, role } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (!isHash(role)) {
    throw new Error("Invalid role");
  }
  if (!isAddress(account)) {
    throw new Error("Invalid account address");
  }

  return readContract(client, {
    abi: accessControlAbi,
    address,
    args: [role, account],
    functionName: "hasRole",
  });
};
