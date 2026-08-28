import { maxUint48, zeroAddress } from "viem";
import type { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { changeDefaultAdminDelay } from "../../src/wallet/changeDefaultAdminDelay.js";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = { address: zeroAddress, newDelay: 86400 };

describe("changeDefaultAdminDelay", function () {
  it("should throw an error if the client is not defined", async function () {
    await expect(
      // @ts-expect-error - Testing invalid input
      changeDefaultAdminDelay(undefined, validParameters),
    ).rejects.toThrow("Client is not defined");
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      changeDefaultAdminDelay(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(changeDefaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid address for contract",
    );
  });

  it("should throw an error if newDelay is not a number", async function () {
    const parameters = { ...validParameters, newDelay: BigInt(86400) };
    // @ts-expect-error - Testing invalid input
    await expect(changeDefaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid newDelay",
    );
  });

  it("should throw an error if newDelay is not an integer", async function () {
    const parameters = { ...validParameters, newDelay: 1.5 };

    await expect(changeDefaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid newDelay",
    );
  });

  it("should throw an error if newDelay is negative", async function () {
    const parameters = { ...validParameters, newDelay: -1 };

    await expect(changeDefaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid newDelay, must be greater than or equal to 0",
    );
  });

  it("should throw an error if newDelay does not fit in uint48", async function () {
    const parameters = {
      ...validParameters,
      newDelay: Number(maxUint48) + 1,
    };

    await expect(changeDefaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid newDelay, must fit in uint48",
    );
  });

  it("should call writeContract if all parameters are valid", async function () {
    await changeDefaultAdminDelay(client, validParameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      args: [validParameters.newDelay],
      chain: client.chain,
      functionName: "changeDefaultAdminDelay",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(changeDefaultAdminDelay(client, {})).rejects.toThrow(
      "Invalid address for contract",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(changeDefaultAdminDelay(client, undefined)).rejects.toThrow(
      "Invalid address for contract",
    );
  });
});
