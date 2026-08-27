import { zeroAddress } from "viem";
import type { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { cancelDefaultAdminTransfer } from "../../src/wallet/cancelDefaultAdminTransfer.js";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = { address: zeroAddress };

describe("cancelDefaultAdminTransfer", function () {
  it("should throw an error if the client is not defined", async function () {
    await expect(
      // @ts-expect-error - Testing invalid input
      cancelDefaultAdminTransfer(undefined, validParameters),
    ).rejects.toThrow("Client is not defined");
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      cancelDefaultAdminTransfer(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { address: "invalid_address" };
    await expect(
      // @ts-expect-error - Testing invalid input
      cancelDefaultAdminTransfer(client, parameters),
    ).rejects.toThrow("Invalid address");
  });

  it("should call writeContract if all parameters are valid", async function () {
    await cancelDefaultAdminTransfer(client, validParameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      chain: client.chain,
      functionName: "cancelDefaultAdminTransfer",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(cancelDefaultAdminTransfer(client, {})).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(cancelDefaultAdminTransfer(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
