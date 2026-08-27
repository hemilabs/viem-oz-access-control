import { type Address, type Client, isAddress, maxUint48 } from "viem";
import { writeContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";

export const changeDefaultAdminDelay = async function (
  client: Client,
  parameters: { address: Address; newDelay: number },
) {
  const { address, newDelay } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!client.account) {
    throw new Error("Client is missing an account");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (!Number.isInteger(newDelay)) {
    throw new Error("Invalid newDelay");
  }
  if (newDelay < 0) {
    throw new Error("Invalid newDelay, must be greater than or equal to 0");
  }
  if (newDelay > maxUint48) {
    throw new Error("Invalid newDelay, must fit in uint48");
  }

  return writeContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    account: client.account,
    address,
    args: [newDelay],
    chain: client.chain,
    functionName: "changeDefaultAdminDelay",
  });
};
