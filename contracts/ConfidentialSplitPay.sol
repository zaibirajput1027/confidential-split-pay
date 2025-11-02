// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Mock-FHE: same API, works on any EVM.
// Stores plain uint32 and returns ABI-encoded bytes to mimic ciphertext blobs.
contract ConfidentialSplitPay {
    uint32 private a;
    uint32 private b;
    uint8  public pctA = 60; // 60/40

    function setInputsPlain(uint32 _a, uint32 _b) external {
        a = _a;
        b = _b;
    }

    function setInputs(bytes calldata, bytes calldata) external {
        // kept for API compatibility; no-op in mock
        revert("Mock: use setInputsPlain");
    }

    // Return "encrypted-looking" bytes (ABI-encoded)
    function splitForA() public view returns (bytes memory) {
        uint32 sum = a + b;
        uint32 part = (sum * uint32(pctA)) / 100;
        return abi.encode(part);
    }

    function splitForB() external view returns (bytes memory) {
        uint32 sum = a + b;
        uint32 aPart = abi.decode(splitForA(), (uint32));
        uint32 bPart = sum - aPart;
        return abi.encode(bPart);
    }
}
