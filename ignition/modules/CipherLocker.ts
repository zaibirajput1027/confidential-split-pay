import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CipherLockerModule", (m) => {
  const locker = m.contract("CipherLocker"); // matches contracts/CipherLocker.sol
  return { locker };
});
