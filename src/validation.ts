import {
  type Account,
  type Address,
  type Client,
  type Hash,
  isAddress,
  isHash,
} from "viem";

export const validateClient = function (client: Client) {
  if (!client) {
    throw new Error("Client is not defined");
  }
};

export const validateClientAccount: (
  client: Client,
) => asserts client is Client & { account: Account } = function (client) {
  validateClient(client);
  if (!client.account) {
    throw new Error("Client is missing an account");
  }
};

export const validateAddress = function (address: Address, name: string) {
  if (!isAddress(address)) {
    throw new Error(`Invalid address for ${name}`);
  }
};

export const validateRole = function (role: Hash) {
  if (!isHash(role)) {
    throw new Error("Invalid role");
  }
};
