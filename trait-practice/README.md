# Traits & SIP-010 Tokens Practice

A comprehensive learning project demonstrating **Clarity traits** and **SIP-010 fungible token** implementation on the Stacks blockchain.

## 📚 What You'll Learn

- How traits work in Clarity (similar to interfaces in Solidity or traits in Rust)
- How to define and implement custom traits
- How contracts can implement multiple traits
- What SIP-010 tokens are and how to create them
- How sBTC fits into the Stacks ecosystem
- Best practices for fungible token development

## 🏗️ Project Structure

```
trait-practice/
├── contracts/
│   ├── multiplier-trait.clar        # Simple trait with multiply function
│   ├── simple-calculator.clar       # Implements multiplier trait
│   ├── divider-trait.clar          # Trait for division operations
│   ├── advanced-calculator.clar    # Implements multiple traits + extra functions
│   ├── sip010-trait.clar           # SIP-010 fungible token standard
│   └── clarity-coin.clar           # Full SIP-010 token implementation
├── tests/
│   └── *.test.ts                   # Comprehensive test suites
└── README.md
```

## 🔍 Understanding Traits

### What are Traits?

Traits in Clarity are like **templates** or **interfaces** for smart contracts. They define a set of functions that a contract must implement to be compliant with that trait.

Think of traits as:
- **Interfaces** in Solidity
- **Traits** in Rust  
- **Protocols** in Swift

### Why Use Traits?

Traits ensure **compatibility** and **standardization** across contracts. For example:
- A DEX can work with any SIP-010 token
- A wallet can display any token that implements the standard
- Developers know what functions are available

### Key Concepts

✅ **Minimum Requirements**: Traits enforce "at least these functions must exist"
✅ **Multiple Traits**: A contract can implement multiple traits
✅ **Extra Functions**: Contracts can have additional functions beyond trait requirements
✅ **No Logic Enforcement**: Traits only define function signatures, not implementations

## 📝 Contract Examples

### 1. Simple Trait Example

**Define a trait** (`multiplier-trait.clar`):
```clarity
(define-trait multiplier
    (
        (multiply (uint uint) (response uint uint))
    )
)
```

**Implement the trait** (`simple-calculator.clar`):
```clarity
(define-read-only (multiply (a uint) (b uint))
    (ok (* a b))
)

(impl-trait .multiplier-trait.multiplier)
```

### 2. Multiple Traits Example

A contract can implement multiple traits and have extra functions:

```clarity
;; Implements both multiplier and divider traits
(define-read-only (multiply (a uint) (b uint))
    (ok (* a b))
)

(define-read-only (divide (a uint) (b uint))
    (ok (/ a b))
)

;; Additional function - not required by any trait
(define-read-only (subtract (a uint) (b uint))
    (ok (- a b))
)

(impl-trait .multiplier-trait.multiplier)
(impl-trait .divider-trait.divider)
```

### 3. SIP-010 Fungible Token

**Clarity Coin** is a complete SIP-010 implementation with:
- ✅ Unlimited supply
- ✅ Owner-only minting
- ✅ Transferable tokens
- ✅ Balance tracking
- ✅ Full metadata support

Key features:
```clarity
;; Create a fungible token
(define-fungible-token clarity-coin)

;; Implement SIP-010 trait
(impl-trait .sip010-trait.sip010-ft-trait)

;; Required functions:
;; - transfer: Move tokens between addresses
;; - get-name: Returns "Clarity Coin"
;; - get-symbol: Returns "CC"
;; - get-decimals: Returns u0
;; - get-balance: Check any address balance
;; - get-total-supply: Get total minted supply
;; - get-token-uri: Optional metadata URI

;; Custom function:
;; - mint: Owner-only token creation
```

## 🚀 Running the Project

### Setup

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with coverage
npm run test:report

# Watch mode for development
npm run test:watch
```

### Test the Contracts

```bash
# Run specific test file
npm test -- clarity-coin.test.ts

# Run advanced calculator tests
npm test -- advanced-calculator.test.ts
```

## 🧪 Testing Highlights

### Clarity Coin Tests
- ✅ Token metadata (name, symbol, decimals)
- ✅ Minting (owner-only restrictions)
- ✅ Transfers (authorization checks)
- ✅ Balance queries
- ✅ Total supply tracking
- ✅ Memo attachments

### Calculator Tests
- ✅ Trait compliance verification
- ✅ Multiple trait implementation
- ✅ Arithmetic operations
- ✅ Edge cases (division by zero, etc.)

## 📖 SIP-010 Standard

### What is SIP-010?

SIP-010 is the **fungible token standard** on Stacks - similar to ERC-20 on Ethereum.

### Required Functions

| Function | Purpose |
|----------|---------|
| `transfer` | Move tokens between addresses |
| `get-name` | Token name (e.g., "Clarity Coin") |
| `get-symbol` | Token symbol (e.g., "CC") |
| `get-decimals` | Decimal precision |
| `get-balance` | Check address balance |
| `get-total-supply` | Get total circulating supply |
| `get-token-uri` | Optional metadata URI |

### Built-in Helpers

Clarity provides built-in functions for fungible tokens:

```clarity
;; Define a fungible token
(define-fungible-token token-name)

;; Mint tokens
(ft-mint? token-name amount recipient)

;; Transfer tokens
(ft-transfer? token-name amount sender recipient)

;; Get balance
(ft-get-balance token-name owner)

;; Get total supply
(ft-get-supply token-name)
```

## 💰 About sBTC

**sBTC** is a 1:1 BTC-pegged asset on Stacks that implements SIP-010!

### Why is this important?

- ✅ Build DeFi apps that work with BTC
- ✅ Use standard SIP-010 interface (no special handling)
- ✅ Leverage existing token infrastructure
- ✅ Interoperable with DEXs, lending protocols, etc.

### Development Tips

1. **Build for SIP-010** → Your app automatically works with sBTC
2. **Use Mock Tokens** → Test on testnet with any SIP-010 token
3. **Easy Migration** → Switch to real sBTC when it's live on mainnet

## 🎓 Learning Path

1. **Start Here**: Understand basic traits with calculator examples
2. **Move to Tokens**: Study SIP-010 trait definition
3. **Build Tokens**: Examine Clarity Coin implementation
4. **Test Everything**: Run the test suites to see it in action
5. **Extend**: Try adding features like burning, pausing, etc.

## 🔗 Key Concepts Recap

### Traits
- Define function signatures, not implementations
- Enforce minimum requirements
- Enable contract compatibility
- Similar to interfaces in other languages

### SIP-010 Tokens
- Standard for fungible tokens on Stacks
- Like ERC-20 on Ethereum
- Use `define-fungible-token` for easy implementation
- Built-in balance tracking and transfer functions

### sBTC
- Bitcoin on Stacks via SIP-010
- 1:1 peg with BTC
- Enables Bitcoin DeFi
- Coming soon to mainnet

## 📚 Additional Resources

- [Clarity Language Reference](https://docs.stacks.co/clarity/)
- [SIP-010 Specification](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
- [sBTC Documentation](https://sbtc.tech/)
- [Clarinet Documentation](https://docs.hiro.so/clarinet/)
- [Stacks Developer Degree](https://www.learnweb3.io/)

## 🤝 Contributing

This is a learning project from the Stacks Developer Degree curriculum. Feel free to:
- Add more trait examples
- Create additional token features
- Improve test coverage
- Add documentation

## 📄 License

MIT License - Feel free to use for learning and building!

---

*Part of the LearnWeb3 Stacks Developer Degree*
