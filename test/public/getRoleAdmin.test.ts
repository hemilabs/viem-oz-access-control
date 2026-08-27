import { type PublicClient, zeroAddress, zeroHash } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { getRoleAdmin } from "../../src/public/getRoleAdmin.js";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = { address: zeroAddress, role: zeroHash };

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("getRoleAdmin", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(getRoleAdmin(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(getRoleAdmin(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the role is not hex", async function () {
    const parameters = { ...validParameters, role: "KEEPER_ROLE" };
    // @ts-expect-error - Testing invalid input
    await expect(getRoleAdmin(client, parameters)).rejects.toThrow(
      "Invalid role",
    );
  });

  it("should throw an error if the role is not 32 bytes long", async function () {
    const parameters = { ...validParameters, role: "0x1234" } as const;

    await expect(getRoleAdmin(client, parameters)).rejects.toThrow(
      "Invalid role",
    );
  });

  it("should call readContract if all parameters are valid", async function () {
    await getRoleAdmin(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [validParameters.role],
      functionName: "getRoleAdmin",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(getRoleAdmin(client, {})).rejects.toThrow("Invalid address");
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(getRoleAdmin(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
