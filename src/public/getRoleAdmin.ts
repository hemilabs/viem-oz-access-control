import { type Address, type Client, type Hash, isAddress, isHash } from "viem";
import { readContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";

export const getRoleAdmin = async function (
  client: Client,
  parameters: { address: Address; role: Hash },
) {
  const { address, role } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (!isHash(role)) {
    throw new Error("Invalid role");
  }

  return readContract(client, {
    abi: accessControlAbi,
    address,
    args: [role],
    functionName: "getRoleAdmin",
  });
};
