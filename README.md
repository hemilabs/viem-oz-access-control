# viem-oz-access-control

Viem extensions for OpenZeppelin AccessControl and DefaultAdminRules contracts

[![NPM version](https://img.shields.io/npm/v/viem-oz-access-control)](https://www.npmjs.com/package/viem-oz-access-control) [![Package size](https://img.shields.io/bundlephobia/minzip/viem-oz-access-control)](https://bundlephobia.com/package/viem-oz-access-control) [![Follow Hemi on X](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fhemi_xyz&style=flat&logo=x&label=%40hemi_xyz&labelColor=%23ff6c15&color=%230a0a0a)](https://x.com/intent/follow?screen_name=hemi_xyz)

## Installation

Install `viem` and `viem-oz-access-control` as dependencies:

```sh
npm install viem viem-oz-access-control
```

## Methods

This package provides ESM-friendly helpers for interacting with [OpenZeppelin AccessControl](https://docs.openzeppelin.com/contracts/5.x/access-control) contracts using viem.

All the methods are named after the Solidity functions. The ABIs target [OpenZeppelin Contracts v5.x](https://docs.openzeppelin.com/contracts/5.x/access-control), and every entry matches the compiled output of `AccessControl` and `AccessControlDefaultAdminRules`.

`AccessControlDefaultAdminRules` extends `AccessControl`, so this package covers both.

### `acceptDefaultAdminTransfer`

Completes a default admin transfer. Only the pending admin can call it, and only after the schedule passes. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
acceptDefaultAdminTransfer(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { acceptDefaultAdminTransfer } from "viem-oz-access-control/actions";
const hash = await acceptDefaultAdminTransfer(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `beginDefaultAdminTransfer`

Starts a default admin transfer to `newAdmin`. Only the current default admin can call it. The new admin must accept it after the delay passes. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
beginDefaultAdminTransfer(client, { address, newAdmin });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)
- **newAdmin**: `Address` — Address that will become the new default admin (required)

**Example:**

```ts
import { beginDefaultAdminTransfer } from "viem-oz-access-control/actions";
const hash = await beginDefaultAdminTransfer(client, {
  address: "0x1234567891234567891234567891234567891234",
  newAdmin: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
});
```

### `cancelDefaultAdminTransfer`

Cancels a scheduled default admin transfer. Only the current default admin can call it. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
cancelDefaultAdminTransfer(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { cancelDefaultAdminTransfer } from "viem-oz-access-control/actions";
const hash = await cancelDefaultAdminTransfer(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `changeDefaultAdminDelay`

Schedules a new delay for default admin transfers. Only the current default admin can call it. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
changeDefaultAdminDelay(client, { address, newDelay });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)
- **newDelay**: `number` — New delay in seconds. The contract type is `uint48`, so viem uses a number (required)

**Example:**

```ts
import { changeDefaultAdminDelay } from "viem-oz-access-control/actions";
const hash = await changeDefaultAdminDelay(client, {
  address: "0x1234567891234567891234567891234567891234",
  newDelay: 86400, // 1 day
});
```

### `defaultAdmin`

Returns the address that holds `DEFAULT_ADMIN_ROLE`. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
defaultAdmin(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { defaultAdmin } from "viem-oz-access-control/actions";
const admin = await defaultAdmin(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `defaultAdminDelay`

Returns the delay, in seconds, between the start and the acceptance of a default admin transfer. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
defaultAdminDelay(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { defaultAdminDelay } from "viem-oz-access-control/actions";
const delay = await defaultAdminDelay(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `defaultAdminDelayIncreaseWait`

Returns the maximum wait, in seconds, applied when the delay increases. It defaults to 5 days. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
defaultAdminDelayIncreaseWait(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { defaultAdminDelayIncreaseWait } from "viem-oz-access-control/actions";
const wait = await defaultAdminDelayIncreaseWait(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `getRoleAdmin`

Returns the role that administers the given role. Holders of the admin role can grant and revoke it. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl)

```ts
getRoleAdmin(client, { address, role });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)
- **role**: `Hash` — Role identifier, 32 bytes. Use `roleId` to build it (required)

**Example:**

```ts
import { roleId } from "viem-oz-access-control";
import { getRoleAdmin } from "viem-oz-access-control/actions";
const adminRole = await getRoleAdmin(client, {
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});
```

### `grantRole`

Grants a role to an account. The caller must hold the admin role of that role. On a DefaultAdminRules contract this reverts for `DEFAULT_ADMIN_ROLE`; use `beginDefaultAdminTransfer` instead. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl)

```ts
grantRole(client, { account, address, role });
```

- **client**: `Client` — from viem — (required)
- **account**: `Address` — Address that receives the role (required)
- **address**: `Address` — AccessControl contract address (required)
- **role**: `Hash` — Role identifier, 32 bytes (required)

**Example:**

```ts
import { roleId } from "viem-oz-access-control";
import { grantRole } from "viem-oz-access-control/actions";
const hash = await grantRole(client, {
  account: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});
```

### `hasRole`

Returns `true` if the account holds the role. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl)

```ts
hasRole(client, { account, address, role });
```

- **client**: `Client` — from viem — (required)
- **account**: `Address` — Address to check (required)
- **address**: `Address` — AccessControl contract address (required)
- **role**: `Hash` — Role identifier, 32 bytes (required)

**Example:**

```ts
import { roleId } from "viem-oz-access-control";
import { hasRole } from "viem-oz-access-control/actions";
const isKeeper = await hasRole(client, {
  account: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});
```

### `pendingDefaultAdmin`

Returns the pending default admin and the timestamp at which it can accept the transfer. A zero `acceptSchedule` means that no transfer is pending. A zero `newAdmin` means that the default admin is being renounced. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
pendingDefaultAdmin(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { pendingDefaultAdmin } from "viem-oz-access-control/actions";
const [newAdmin, acceptSchedule] = await pendingDefaultAdmin(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `pendingDefaultAdminDelay`

Returns the pending delay and the timestamp at which it takes effect. A zero `effectSchedule` means that no delay change is pending. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
pendingDefaultAdminDelay(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { pendingDefaultAdminDelay } from "viem-oz-access-control/actions";
const [newDelay, effectSchedule] = await pendingDefaultAdminDelay(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

### `renounceRole`

Gives up a role. `callerConfirmation` must be the caller's own address, otherwise the contract reverts. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl)

```ts
renounceRole(client, { address, callerConfirmation, role });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)
- **callerConfirmation**: `Address` — The caller's own address (required)
- **role**: `Hash` — Role identifier, 32 bytes (required)

**Example:**

```ts
import { roleId } from "viem-oz-access-control";
import { renounceRole } from "viem-oz-access-control/actions";
const hash = await renounceRole(client, {
  address: "0x1234567891234567891234567891234567891234",
  callerConfirmation: client.account.address,
  role: roleId("KEEPER_ROLE"),
});
```

### `revokeRole`

Takes a role away from an account. The caller must hold the admin role of that role. On a DefaultAdminRules contract this reverts for `DEFAULT_ADMIN_ROLE`. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl)

```ts
revokeRole(client, { account, address, role });
```

- **client**: `Client` — from viem — (required)
- **account**: `Address` — Address that loses the role (required)
- **address**: `Address` — AccessControl contract address (required)
- **role**: `Hash` — Role identifier, 32 bytes (required)

**Example:**

```ts
import { roleId } from "viem-oz-access-control";
import { revokeRole } from "viem-oz-access-control/actions";
const hash = await revokeRole(client, {
  account: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});
```

### `rollbackDefaultAdminDelay`

Cancels a scheduled delay change. Only the current default admin can call it. **DefaultAdminRules only**. [View docs](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules)

```ts
rollbackDefaultAdminDelay(client, { address });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — AccessControl contract address (required)

**Example:**

```ts
import { rollbackDefaultAdminDelay } from "viem-oz-access-control/actions";
const hash = await rollbackDefaultAdminDelay(client, {
  address: "0x1234567891234567891234567891234567891234",
});
```

## Helpers

The package root exports the values needed to build role identifiers, plus the ABIs.

### `roleId`

Returns the 32-byte identifier of a role name. It matches `keccak256("ROLE_NAME")` in Solidity.

```ts
import { roleId } from "viem-oz-access-control";
const keeperRole = roleId("KEEPER_ROLE");
```

### `defaultAdminRole`

The identifier of the contract's `DEFAULT_ADMIN_ROLE`. It is 32 zero bytes for every AccessControl contract, so no contract call is needed.

```ts
import { defaultAdminRole } from "viem-oz-access-control";
```

### ABIs

`accessControlAbi` holds the base functions, events, and errors of [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl). `accessControlDefaultAdminRulesAbi` holds the same entries plus the ones of [`AccessControlDefaultAdminRules`](https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControlDefaultAdminRules). Use them to decode logs, or to decode a revert such as `AccessControlUnauthorizedAccount`.

```ts
import { accessControlAbi } from "viem-oz-access-control";
```

## Usage with `.extend()`

You can extend your viem client with AccessControl actions using `.extend()` and the provided helpers:

```ts
import { createPublicClient, createWalletClient, http } from "viem";
import {
  accessControlPublicActions,
  accessControlWalletActions,
  roleId,
} from "viem-oz-access-control";

// Example: extending a public client
const publicClient = createPublicClient({
  chain, // your chain config
  transport: http(),
}).extend(accessControlPublicActions());

// Now you can call:
const isKeeper = await publicClient.hasRole({
  account: "0xYourWalletAddress",
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});

// Example: extending a wallet client
const walletClient = createWalletClient({
  account, // your account config
  chain, // your chain config
  transport: http(),
}).extend(accessControlWalletActions());

// Now you can call:
const tx = await walletClient.grantRole({
  account: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  address: "0x1234567891234567891234567891234567891234",
  role: roleId("KEEPER_ROLE"),
});
```

## Notes

`AccessControlDefaultAdminRules` also exposes `owner()`, from [ERC-5313](https://eips.ethereum.org/EIPS/eip-5313). It returns the same value as `defaultAdmin()`. This package does not wrap it.

## Local Setup

This repository uses [pnpm](https://pnpm.io) as the package manager. Enable [Corepack](https://nodejs.org/api/corepack.html) to use the pinned version automatically:

```sh
corepack enable
```

To install the dependencies, run:

```sh
pnpm install
```

To run the tests, run:

```sh
pnpm test
```

To run the tests with a coverage report, run:

```sh
pnpm test:coverage
```
