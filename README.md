# Time-Restricted Token2022 Transfer Example

This project demonstrates a custom Token2022 SPL token on Solana that can only be transferred during even-numbered minutes (UTC) of the day. It showcases the power of Token2022's transfer hook feature to implement custom transfer validation logic.

## Concept

The token implements a transfer hook that:
- Checks the current UTC timestamp when a transfer is initiated
- Only allows transfers to proceed if the current minute is even-numbered
- Rejects transfers during odd-numbered minutes

This serves as an educational example of how Token2022's transfer hooks can be used to create tokens with custom transfer restrictions based on time or other conditions.

## Implementation

The implementation is based on the [Token2022 Transfer Hook Example](https://github.com/solana-developers/program-examples/blob/main/tokens/token-2022/transfer-hook/whitelist/anchor/programs/transfer-hook/src/lib.rs) from the Solana Program Examples repository.

Key components:
- Uses Token2022 Program's transfer hook feature
- Implements custom validation logic in the transfer hook
- Leverages Solana's on-chain clock for timestamp verification

## Use Cases

While this specific time restriction may not have practical applications, it demonstrates patterns that could be used for:
- Trading windows for certain assets
- Time-locked transfers
- Market hours enforcement
- Scheduled transfer capabilities

## Getting Started

[Implementation and usage instructions to be added]
