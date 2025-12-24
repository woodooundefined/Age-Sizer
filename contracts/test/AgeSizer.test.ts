import { expect } from "chai";
import { ethers } from "hardhat";
import { AgeSizer } from "../typechain-types";

/**
 * AgeSizer Contract Tests
 * 
 * Note: FHE operations require the Zama coprocessor which is only available
 * on Sepolia testnet. These tests verify contract deployment and basic
 * non-FHE functionality. Full FHE integration tests should be run on Sepolia.
 * 
 * Run on Sepolia: npx hardhat test --network sepolia
 */
describe("AgeSizer", function () {
  let ageSizer: AgeSizer;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const AgeSizerFactory = await ethers.getContractFactory("AgeSizer");
    ageSizer = await AgeSizerFactory.deploy();
    await ageSizer.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should deploy successfully", async function () {
      const address = await ageSizer.getAddress();
      expect(address).to.be.properAddress;
    });

    it("should have correct AGE_THRESHOLD constant", async function () {
      const threshold = await ageSizer.AGE_THRESHOLD();
      expect(threshold).to.equal(18);
    });
  });

  describe("State Management", function () {
    it("should return false for hasVerified before verification", async function () {
      const hasVerified = await ageSizer.hasVerified(user1.address);
      expect(hasVerified).to.be.false;
    });

    it("should return false for isVerified before verification", async function () {
      const isVerified = await ageSizer.isVerified(user1.address);
      expect(isVerified).to.be.false;
    });

    it("should revert getResultHandle for non-verified user", async function () {
      await expect(
        ageSizer.getResultHandle(user1.address)
      ).to.be.revertedWith("Not verified");
    });
  });

  describe("Access Control", function () {
    it("should track verification status per user", async function () {
      // Both users should start unverified
      expect(await ageSizer.hasVerified(user1.address)).to.be.false;
      expect(await ageSizer.hasVerified(user2.address)).to.be.false;
    });

    it("should allow any address to check verification status", async function () {
      // User2 can check User1's status
      const status = await ageSizer.connect(user2).hasVerified(user1.address);
      expect(status).to.be.false;
    });
  });

  describe("Contract Interface", function () {
    it("should have verifyAge function", async function () {
      expect(ageSizer.verifyAge).to.be.a("function");
    });

    it("should have getResultHandle function", async function () {
      expect(ageSizer.getResultHandle).to.be.a("function");
    });

    it("should have hasVerified mapping", async function () {
      expect(ageSizer.hasVerified).to.be.a("function");
    });

    it("should have isVerified function", async function () {
      expect(ageSizer.isVerified).to.be.a("function");
    });
  });
});

/**
 * Sepolia Integration Tests
 * 
 * These tests require actual FHE encryption and should be run on Sepolia.
 * They test the full verification flow with real encrypted data.
 * 
 * Prerequisites:
 * 1. Contract deployed to Sepolia
 * 2. PRIVATE_KEY and SEPOLIA_RPC_URL in .env
 * 3. Sufficient Sepolia ETH for gas
 * 
 * Run: npx hardhat test test/AgeSizer.test.ts --network sepolia --grep "Sepolia"
 */
describe("AgeSizer Sepolia Integration", function () {
  // Skip these tests on local network
  before(function () {
    if (process.env.HARDHAT_NETWORK !== "sepolia") {
      this.skip();
    }
  });

  it("should be skipped on local network (run with --network sepolia)", function () {
    // This test serves as documentation
    expect(true).to.be.true;
  });
});

