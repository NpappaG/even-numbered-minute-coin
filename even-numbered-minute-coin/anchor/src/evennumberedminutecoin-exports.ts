// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import EvennumberedminutecoinIDL from '../target/idl/evennumberedminutecoin.json'
import type { Evennumberedminutecoin } from '../target/types/evennumberedminutecoin'

// Re-export the generated IDL and type
export { Evennumberedminutecoin, EvennumberedminutecoinIDL }

// The programId is imported from the program IDL.
export const EVENNUMBEREDMINUTECOIN_PROGRAM_ID = new PublicKey(EvennumberedminutecoinIDL.address)

// This is a helper function to get the Evennumberedminutecoin Anchor program.
export function getEvennumberedminutecoinProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...EvennumberedminutecoinIDL, address: address ? address.toBase58() : EvennumberedminutecoinIDL.address } as Evennumberedminutecoin, provider)
}

// This is a helper function to get the program ID for the Evennumberedminutecoin program depending on the cluster.
export function getEvennumberedminutecoinProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Evennumberedminutecoin program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return EVENNUMBEREDMINUTECOIN_PROGRAM_ID
  }
}
