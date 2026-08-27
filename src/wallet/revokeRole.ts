import { type Address, type Client, type Hash, isAddress, isHash } from "viem";
import { writeContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";

export const revokeRole = async function (
  client: Client,
  parameters: { account: Address; address: Address; role: Hash },
) {
  const { account, address, role } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!client.account) {
    throw new Error("Client is missing an account");
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

  return writeContract(client, {
    abi: accessControlAbi,
    account: client.account,
    address,
    args: [role, account],
    chain: client.chain,
    functionName: "revokeRole",
  });
};
