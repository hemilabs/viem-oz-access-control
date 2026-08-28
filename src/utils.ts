import { keccak256, stringToBytes } from "viem";

export const roleId = (name: string) => keccak256(stringToBytes(name));
