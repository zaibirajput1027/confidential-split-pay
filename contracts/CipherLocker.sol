// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CipherLocker {
    bytes public payloadA;
    bytes public payloadB;
    event Stored(bytes a, bytes b);
    function set(bytes calldata a, bytes calldata b) external {
        payloadA = a; payloadB = b; emit Stored(a,b);
    }
    function getA() external view returns (bytes memory) { return payloadA; }
    function getB() external view returns (bytes memory) { return payloadB; }
}
