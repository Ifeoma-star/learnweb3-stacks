import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("Clarity Coin SIP-010 Token Tests", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  describe("Token Metadata", () => {
    it("should return correct token name", () => {
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-name",
        [],
        deployer
      );
      expect(result).toBeOk(Cl.stringAscii("Clarity Coin"));
    });

    it("should return correct token symbol", () => {
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-symbol",
        [],
        deployer
      );
      expect(result).toBeOk(Cl.stringAscii("CC"));
    });

    it("should return correct decimals", () => {
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-decimals",
        [],
        deployer
      );
      expect(result).toBeOk(Cl.uint(0));
    });

    it("should return token URI as none", () => {
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-token-uri",
        [],
        deployer
      );
      expect(result).toBeOk(Cl.none());
    });
  });

  describe("Minting", () => {
    it("should allow owner to mint tokens", () => {
      const mintAmount = 1000;
      const { result } = simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(mintAmount), Cl.principal(wallet1)],
        deployer
      );
      expect(result).toBeOk(Cl.bool(true));

      // Check balance
      const { result: balance } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-balance",
        [Cl.principal(wallet1)],
        wallet1
      );
      expect(balance).toBeOk(Cl.uint(mintAmount));
    });

    it("should not allow non-owner to mint tokens", () => {
      const { result } = simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(1000), Cl.principal(wallet1)],
        wallet1
      );
      expect(result).toBeErr(Cl.uint(100)); // err-owner-only
    });

    it("should update total supply after minting", () => {
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(500), Cl.principal(wallet1)],
        deployer
      );

      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-total-supply",
        [],
        deployer
      );
      expect(result).toBeOk(Cl.uint(500));
    });
  });

  describe("Transfers", () => {
    it("should allow token owner to transfer tokens", () => {
      // First mint tokens to wallet1
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(1000), Cl.principal(wallet1)],
        deployer
      );

      // Transfer from wallet1 to wallet2
      const { result } = simnet.callPublicFn(
        "clarity-coin",
        "transfer",
        [
          Cl.uint(300),
          Cl.principal(wallet1),
          Cl.principal(wallet2),
          Cl.none(),
        ],
        wallet1
      );
      expect(result).toBeOk(Cl.bool(true));

      // Check balances
      const { result: balance1 } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-balance",
        [Cl.principal(wallet1)],
        wallet1
      );
      expect(balance1).toBeOk(Cl.uint(700));

      const { result: balance2 } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-balance",
        [Cl.principal(wallet2)],
        wallet2
      );
      expect(balance2).toBeOk(Cl.uint(300));
    });

    it("should not allow non-owner to transfer others' tokens", () => {
      // Mint tokens to wallet1
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(1000), Cl.principal(wallet1)],
        deployer
      );

      // Try to transfer wallet1's tokens from wallet2 (should fail)
      const { result } = simnet.callPublicFn(
        "clarity-coin",
        "transfer",
        [
          Cl.uint(100),
          Cl.principal(wallet1),
          Cl.principal(wallet2),
          Cl.none(),
        ],
        wallet2
      );
      expect(result).toBeErr(Cl.uint(101)); // err-not-token-owner
    });

    it("should handle transfer with memo", () => {
      // Mint tokens
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(1000), Cl.principal(wallet1)],
        deployer
      );

      // Transfer with memo
      const memo = Cl.some(Cl.bufferFromUtf8("Payment for services"));
      const { result } = simnet.callPublicFn(
        "clarity-coin",
        "transfer",
        [Cl.uint(100), Cl.principal(wallet1), Cl.principal(wallet2), memo],
        wallet1
      );
      expect(result).toBeOk(Cl.bool(true));
    });
  });

  describe("Balance Queries", () => {
    it("should return zero balance for addresses with no tokens", () => {
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-balance",
        [Cl.principal(wallet1)],
        wallet1
      );
      expect(result).toBeOk(Cl.uint(0));
    });

    it("should return correct balance after multiple operations", () => {
      // Mint
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(1000), Cl.principal(wallet1)],
        deployer
      );

      // Transfer some away
      simnet.callPublicFn(
        "clarity-coin",
        "transfer",
        [Cl.uint(300), Cl.principal(wallet1), Cl.principal(wallet2), Cl.none()],
        wallet1
      );

      // Mint more
      simnet.callPublicFn(
        "clarity-coin",
        "mint",
        [Cl.uint(500), Cl.principal(wallet1)],
        deployer
      );

      // Check final balance: 1000 - 300 + 500 = 1200
      const { result } = simnet.callReadOnlyFn(
        "clarity-coin",
        "get-balance",
        [Cl.principal(wallet1)],
        wallet1
      );
      expect(result).toBeOk(Cl.uint(1200));
    });
  });
});
