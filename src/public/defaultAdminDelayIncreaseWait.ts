import { type Address, type Client, isAddress } from "viem";
import { readContract } from "viem/actions";

import { accessControlDefaultAdminRulesAbi } from "../abi.js";

export const defaultAdminDelayIncreaseWait = async function (
  client: Client,
  parameters: { address: Address },
) {
  const { address } = parameters ?? {};

  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }

  return readContract(client, {
    abi: accessControlDefaultAdminRulesAbi,
    address,
    functionName: "defaultAdminDelayIncreaseWait",
  });
};
