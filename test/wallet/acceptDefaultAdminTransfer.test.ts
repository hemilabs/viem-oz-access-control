import { zeroAddress } from "viem";
import type { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { acceptDefaultAdminTransfer } from "../../src/wallet/acceptDefaultAdminTransfer.js";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = { address: zeroAddress };

describe("acceptDefaultAdminTransfer", function () {
  it("should throw an error if the client is not defined", async function () {
    await expect(
      // @ts-expect-error - Testing invalid input
      acceptDefaultAdminTransfer(undefined, validParameters),
    ).rejects.toThrow("Client is not defined");
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      acceptDefaultAdminTransfer(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { address: "invalid_address" };
    await expect(
      // @ts-expect-error - Testing invalid input
      acceptDefaultAdminTransfer(client, parameters),
    ).rejects.toThrow("Invalid address for contract");
  });

  it("should call writeContract if all parameters are valid", async function () {
    await acceptDefaultAdminTransfer(client, validParameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      chain: client.chain,
      functionName: "acceptDefaultAdminTransfer",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(acceptDefaultAdminTransfer(client, {})).rejects.toThrow(
      "Invalid address for contract",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(acceptDefaultAdminTransfer(client, undefined)).rejects.toThrow(
      "Invalid address for contract",
    );
  });
});
