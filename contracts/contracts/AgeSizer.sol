// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint8, ebool, externalEuint8, externalEbool } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title AgeSizer
 * @notice Privacy-preserving age verification using FHE
 * @dev User encrypts age locally, contract verifies age >= 18 without seeing actual value
 */
contract AgeSizer is ZamaEthereumConfig {
    // Mapping from user address to their encrypted verification result
    mapping(address => ebool) private verificationResults;
    
    // Mapping to track if user has verified
    mapping(address => bool) public hasVerified;
    
    // Age threshold for verification (18 years)
    uint8 public constant AGE_THRESHOLD = 18;
    
    // Events
    event AgeVerified(address indexed user);
    
    /**
     * @notice Verify user's encrypted age against threshold
     * @param encryptedAge The encrypted age value (euint8)
     * @param inputProof The input proof for the encrypted value
     */
    function verifyAge(
        externalEuint8 encryptedAge,
        bytes calldata inputProof
    ) external {
        // 1. Convert external encrypted input to internal type
        euint8 age = FHE.fromExternal(encryptedAge, inputProof);
        
        // 2. Compare age >= 18 (result is encrypted boolean)
        ebool isAdult = FHE.ge(age, FHE.asEuint8(AGE_THRESHOLD));
        
        // 3. Allow this contract to access the result
        FHE.allowThis(isAdult);
        
        // 4. Allow the user to decrypt the result (private decryption)
        FHE.allow(isAdult, msg.sender);
        
        // 5. Store the result
        verificationResults[msg.sender] = isAdult;
        hasVerified[msg.sender] = true;
        
        emit AgeVerified(msg.sender);
    }
    
    /**
     * @notice Get the encrypted result handle for user decryption
     * @param user The user address to get result for
     * @return The bytes32 handle of the encrypted result
     */
    function getResultHandle(address user) external view returns (bytes32) {
        require(hasVerified[user], "Not verified");
        return FHE.toBytes32(verificationResults[user]);
    }
    
    /**
     * @notice Check if a user has completed verification
     * @param user The user address to check
     * @return Whether the user has verified
     */
    function isVerified(address user) external view returns (bool) {
        return hasVerified[user];
    }
}

