import { type Address, type Client, isAddress } from "viem";
import { writeContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";

export const cancelDefaultAdminTransfer = async function (
  client: Client,
  parameters: { address: Address },
) {
  const { address } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!client.account) {
    throw new Error("Client is missing an account");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }

  return writeContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    account: client.account,
    address,
    chain: client.chain,
    functionName: "cancelDefaultAdminTransfer",
  });
};
