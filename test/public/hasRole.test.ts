import { type PublicClient, zeroAddress, zeroHash } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { hasRole } from "../../src/public/hasRole.js";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = {
  account: zeroAddress,
  address: zeroAddress,
  role: zeroHash,
};

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("hasRole", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the role is not hex", async function () {
    const parameters = { ...validParameters, role: "KEEPER_ROLE" };
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(client, parameters)).rejects.toThrow("Invalid role");
  });

  it("should throw an error if the role is not 32 bytes long", async function () {
    const parameters = { ...validParameters, role: "0x1234" } as const;

    await expect(hasRole(client, parameters)).rejects.toThrow("Invalid role");
  });

  it("should throw an error if the account address is not valid", async function () {
    const parameters = { ...validParameters, account: "invalid_account" };
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(client, parameters)).rejects.toThrow(
      "Invalid account address",
    );
  });

  it("should call readContract if all parameters are valid", async function () {
    await hasRole(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [validParameters.role, validParameters.account],
      functionName: "hasRole",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(client, {})).rejects.toThrow("Invalid address");
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(hasRole(client, undefined)).rejects.toThrow("Invalid address");
  });
});
