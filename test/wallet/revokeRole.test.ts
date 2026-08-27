import { zeroAddress, zeroHash } from "viem";
import type { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { revokeRole } from "../../src/wallet/revokeRole.js";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = {
  account: zeroAddress,
  address: zeroAddress,
  role: zeroHash,
};

describe("revokeRole", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      revokeRole(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the role is not hex", async function () {
    const parameters = { ...validParameters, role: "KEEPER_ROLE" };
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(client, parameters)).rejects.toThrow(
      "Invalid role",
    );
  });

  it("should throw an error if the role is not 32 bytes long", async function () {
    const parameters = { ...validParameters, role: "0x1234" } as const;

    await expect(revokeRole(client, parameters)).rejects.toThrow(
      "Invalid role",
    );
  });

  it("should throw an error if the account address is not valid", async function () {
    const parameters = { ...validParameters, account: "invalid_account" };
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(client, parameters)).rejects.toThrow(
      "Invalid account address",
    );
  });

  it("should call writeContract if all parameters are valid", async function () {
    await revokeRole(client, validParameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      args: [validParameters.role, validParameters.account],
      chain: client.chain,
      functionName: "revokeRole",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(client, {})).rejects.toThrow("Invalid address");
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(revokeRole(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
