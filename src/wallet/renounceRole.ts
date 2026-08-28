import type { Address, Client, Hash } from "viem";
import { writeContract } from "viem/actions";

import { accessControlAbi } from "../abi.js";
import {
  validateAddress,
  validateClientAccount,
  validateRole,
} from "../validation.js";

export const renounceRole = async function (
  client: Client,
  parameters: { address: Address; callerConfirmation: Address; role: Hash },
) {
  const { address, callerConfirmation, role } = parameters ?? {};

  validateClientAccount(client);
  validateAddress(address, "contract");
  validateRole(role);
  validateAddress(callerConfirmation, "callerConfirmation");

  return writeContract(client, {
    abi: accessControlAbi,
    account: client.account,
    address,
    args: [role, callerConfirmation],
    chain: client.chain,
    functionName: "renounceRole",
  });
};
