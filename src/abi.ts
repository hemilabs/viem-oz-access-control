export const accessControlAbi = [
  {
    inputs: [{ name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "callerConfirmation", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "role", type: "bytes32" },
      { indexed: true, name: "previousAdminRole", type: "bytes32" },
      { indexed: true, name: "newAdminRole", type: "bytes32" },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "role", type: "bytes32" },
      { indexed: true, name: "account", type: "address" },
      { indexed: true, name: "sender", type: "address" },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "role", type: "bytes32" },
      { indexed: true, name: "account", type: "address" },
      { indexed: true, name: "sender", type: "address" },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { name: "account", type: "address" },
      { name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
] as const;

export const accessControlDefaultAdminRulesAbi = [
  ...accessControlAbi,
  {
    inputs: [],
    name: "acceptDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "newAdmin", type: "address" }],
    name: "beginDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelDefaultAdminTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "newDelay", type: "uint48" }],
    name: "changeDefaultAdminDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdmin",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdminDelay",
    outputs: [{ name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAdminDelayIncreaseWait",
    outputs: [{ name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingDefaultAdmin",
    outputs: [
      { name: "newAdmin", type: "address" },
      { name: "acceptSchedule", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingDefaultAdminDelay",
    outputs: [
      { name: "newDelay", type: "uint48" },
      { name: "effectSchedule", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rollbackDefaultAdminDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [],
    name: "DefaultAdminDelayChangeCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "newDelay", type: "uint48" },
      { indexed: false, name: "effectSchedule", type: "uint48" },
    ],
    name: "DefaultAdminDelayChangeScheduled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "DefaultAdminTransferCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "newAdmin", type: "address" },
      { indexed: false, name: "acceptSchedule", type: "uint48" },
    ],
    name: "DefaultAdminTransferScheduled",
    type: "event",
  },
  {
    inputs: [{ name: "schedule", type: "uint48" }],
    name: "AccessControlEnforcedDefaultAdminDelay",
    type: "error",
  },
  {
    inputs: [],
    name: "AccessControlEnforcedDefaultAdminRules",
    type: "error",
  },
  {
    inputs: [{ name: "defaultAdmin", type: "address" }],
    name: "AccessControlInvalidDefaultAdmin",
    type: "error",
  },
] as const;
