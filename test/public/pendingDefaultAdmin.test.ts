import { type PublicClient, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { pendingDefaultAdmin } from "../../src/public/pendingDefaultAdmin.js";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = { address: zeroAddress };

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("pendingDefaultAdmin", function () {
  it("should throw an error if the client is not defined", async function () {
    await expect(
      // @ts-expect-error - Testing invalid input
      pendingDefaultAdmin(undefined, validParameters),
    ).rejects.toThrow("Client is not defined");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(pendingDefaultAdmin(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should call readContract if all parameters are valid", async function () {
    await pendingDefaultAdmin(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      functionName: "pendingDefaultAdmin",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(pendingDefaultAdmin(client, {})).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(pendingDefaultAdmin(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
