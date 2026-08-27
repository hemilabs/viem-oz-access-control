import { type Address, type Client, type Hash, isAddress, isHash } from "viem";
import { writeContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";

export const renounceRole = async function (
  client: Client,
  parameters: { address: Address; callerConfirmation: Address; role: Hash },
) {
  const { address, callerConfirmation, role } = parameters ?? {};

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
  if (!isAddress(callerConfirmation)) {
    throw new Error("Invalid callerConfirmation address");
  }

  return writeContract(client, {
    abi: accessControlAbi,
    account: client.account,
    address,
    args: [role, callerConfirmation],
    chain: client.chain,
    functionName: "renounceRole",
  });
};
