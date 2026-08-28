import { type PublicClient, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { defaultAdminDelay } from "../../src/public/defaultAdminDelay.js";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = { address: zeroAddress };

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("defaultAdminDelay", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(defaultAdminDelay(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = { address: "invalid_address" };
    // @ts-expect-error - Testing invalid input
    await expect(defaultAdminDelay(client, parameters)).rejects.toThrow(
      "Invalid address for contract",
    );
  });

  it("should call readContract if all parameters are valid", async function () {
    await defaultAdminDelay(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      functionName: "defaultAdminDelay",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(defaultAdminDelay(client, {})).rejects.toThrow(
      "Invalid address for contract",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(defaultAdminDelay(client, undefined)).rejects.toThrow(
      "Invalid address for contract",
    );
  });
});
