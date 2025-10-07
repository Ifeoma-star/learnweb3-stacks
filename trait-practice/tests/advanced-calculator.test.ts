import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

describe("Advanced Calculator - Multi-Trait Implementation Tests", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  describe("Multiplier Trait Implementation", () => {
    it("should multiply two numbers correctly", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "multiply",
        [Cl.uint(5), Cl.uint(10)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(50));
    });

    it("should handle zero multiplication", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "multiply",
        [Cl.uint(100), Cl.uint(0)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(0));
    });
  });

  describe("Divider Trait Implementation", () => {
    it("should divide two numbers correctly", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "divide",
        [Cl.uint(100), Cl.uint(5)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(20));
    });

    it("should handle integer division", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "divide",
        [Cl.uint(10), Cl.uint(3)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(3)); // Integer division
    });
  });

  describe("Additional Functions (Beyond Traits)", () => {
    it("should subtract two numbers correctly", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "subtract",
        [Cl.uint(100), Cl.uint(30)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(70));
    });

    it("should add two numbers correctly", () => {
      const { result } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "add",
        [Cl.uint(25), Cl.uint(75)],
        deployer
      );
      expect(result).toBeOk(Cl.uint(100));
    });
  });

  describe("Complex Operations", () => {
    it("should handle multiple operations in sequence", () => {
      // (10 * 5) / 2 + 15 - 10 = 50 / 2 + 15 - 10 = 25 + 15 - 10 = 30
      const { result: mult } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "multiply",
        [Cl.uint(10), Cl.uint(5)],
        deployer
      );
      expect(mult).toBeOk(Cl.uint(50));

      const { result: div } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "divide",
        [Cl.uint(50), Cl.uint(2)],
        deployer
      );
      expect(div).toBeOk(Cl.uint(25));

      const { result: add } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "add",
        [Cl.uint(25), Cl.uint(15)],
        deployer
      );
      expect(add).toBeOk(Cl.uint(40));

      const { result: sub } = simnet.callReadOnlyFn(
        "advanced-calculator",
        "subtract",
        [Cl.uint(40), Cl.uint(10)],
        deployer
      );
      expect(sub).toBeOk(Cl.uint(30));
    });
  });
});
