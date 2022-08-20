
const { expect } = require("chai"); // an assertions library. come from Waffle
const { ethers } = require("hardhat");
  
const {
    deployContract,
    solidity
  } = waffle;
  
//use(solidity);
  
  
const Weth9ABI = `[ {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [{
              "name": "",
              "type": "string"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [{
                  "name": "guy",
                  "type": "address"
              },
              {
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [{
              "name": "",
              "type": "bool"
          }],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      }, {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [{
              "name": "",
              "type": "uint256"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }, {
          "constant": false,
          "inputs": [{
                  "name": "src",
                  "type": "address"
              },
              {
                  "name": "dst",
                  "type": "address"
              },
              {
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [{
              "name": "",
              "type": "bool"
          }],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      }, {
          "constant": false,
          "inputs": [{
              "name": "wad",
              "type": "uint256"
          }],
          "name": "withdraw",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      }, {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [{
              "name": "",
              "type": "uint8"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }, {
          "constant": true,
          "inputs": [{
              "name": "",
              "type": "address"
          }],
          "name": "balanceOf",
          "outputs": [{
              "name": "",
              "type": "uint256"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }, {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [{
              "name": "",
              "type": "string"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }, {
          "constant": false,
          "inputs": [{
                  "name": "dst",
                  "type": "address"
              },
              {
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "transfer",
          "outputs": [{
              "name": "",
              "type": "bool"
          }],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      }, {
          "constant": false,
          "inputs": [],
          "name": "deposit",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
      }, {
          "constant": true,
          "inputs": [{
                  "name": "",
                  "type": "address"
              },
              {
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [{
              "name": "",
              "type": "uint256"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }, {
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback"
      }, {
          "anonymous": false,
          "inputs": [{
                  "indexed": true,
                  "name": "src",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "guy",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      }, {
          "anonymous": false,
          "inputs": [{
                  "indexed": true,
                  "name": "src",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "dst",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      }, {
          "anonymous": false,
          "inputs": [{
                  "indexed": true,
                  "name": "dst",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "Deposit",
          "type": "event"
      }, {
          "anonymous": false,
          "inputs": [{
                  "indexed": true,
                  "name": "src",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "wad",
                  "type": "uint256"
              }
          ],
          "name": "Withdrawal",
          "type": "event"
      }]`;
const USDTABI = `[
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "_upgradedAddress", "type": "address" }],
        "name": "deprecate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          { "name": "_spender", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "deprecated",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "_evilUser", "type": "address" }],
        "name": "addBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          { "name": "_from", "type": "address" },
          { "name": "_to", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "upgradedAddress",
        "outputs": [{ "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{ "name": "", "type": "address" }],
        "name": "balances",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "maximumFee",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "_totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{ "name": "_maker", "type": "address" }],
        "name": "getBlackListStatus",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          { "name": "", "type": "address" },
          { "name": "", "type": "address" }
        ],
        "name": "allowed",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{ "name": "who", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [{ "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{ "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          { "name": "_to", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          { "name": "newBasisPoints", "type": "uint256" },
          { "name": "newMaxFee", "type": "uint256" }
        ],
        "name": "setParams",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "amount", "type": "uint256" }],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "amount", "type": "uint256" }],
        "name": "redeem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          { "name": "_owner", "type": "address" },
          { "name": "_spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "name": "remaining", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "basisPointsRate",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{ "name": "", "type": "address" }],
        "name": "isBlackListed",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "_clearedUser", "type": "address" }],
        "name": "removeBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "MAX_UINT",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "newOwner", "type": "address" }],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{ "name": "_blackListedUser", "type": "address" }],
        "name": "destroyBlackFunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          { "name": "_initialSupply", "type": "uint256" },
          { "name": "_name", "type": "string" },
          { "name": "_symbol", "type": "string" },
          { "name": "_decimals", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }],
        "name": "Issue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }],
        "name": "Redeem",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [{ "indexed": false, "name": "newAddress", "type": "address" }],
        "name": "Deprecate",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": false, "name": "feeBasisPoints", "type": "uint256" },
          { "indexed": false, "name": "maxFee", "type": "uint256" }
        ],
        "name": "Params",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": false, "name": "_blackListedUser", "type": "address" },
          { "indexed": false, "name": "_balance", "type": "uint256" }
        ],
        "name": "DestroyedBlackFunds",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [{ "indexed": false, "name": "_user", "type": "address" }],
        "name": "AddedBlackList",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [{ "indexed": false, "name": "_user", "type": "address" }],
        "name": "RemovedBlackList",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "name": "owner", "type": "address" },
          { "indexed": true, "name": "spender", "type": "address" },
          { "indexed": false, "name": "value", "type": "uint256" }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "name": "from", "type": "address" },
          { "indexed": true, "name": "to", "type": "address" },
          { "indexed": false, "name": "value", "type": "uint256" }
        ],
        "name": "Transfer",
        "type": "event"
      },
      { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" },
      { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }
    ]`;
  
const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const WETH9Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

describe("Swap contract", function () {
  let Swap;
  let addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Swap = await ethers.getContractFactory("Swap");
    const signers = await ethers.getSigners();
    const signer = signers[0];
    swapper = await Swap.deploy();
 
    await swapper.deployed();
  });

  // describe("Deployment", function () {
  //   it("Should set the right owner", async function () {
  //     expect(await hardhatToken.owner()).to.equal(owner.address);
  //   });

  //   it("Should assign the total supply of tokens to the owner", async function () {
  //     const ownerBalance = await hardhatToken.balanceOf(owner.address);
  //     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  //   });
  // });

  // describe("Transactions", function () {
  //   it("Should transfer tokens between accounts", async function () {
  //     // Transfer 50 tokens from owner to addr1
  //     await hardhatToken.transfer(addr1.address, 50);
  //     const addr1Balance = await hardhatToken.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(50);

  //     // Transfer 50 tokens from addr1 to addr2
  //     // We use .connect(signer) to send a transaction from another account
  //     await hardhatToken.connect(addr1).transfer(addr2.address, 50);
  //     const addr2Balance = await hardhatToken.balanceOf(addr2.address);
  //     expect(addr2Balance).to.equal(50);
  //   });

  //   it("Should fail if sender doesn’t have enough tokens", async function () {
  //     const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

  //     // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
  //     // `require` will evaluate false and revert the transaction.
  //     await expect(
  //       hardhatToken.connect(addr1).transfer(owner.address, 1)
  //     ).to.be.revertedWith("Not enough tokens");

  //     // Owner balance shouldn't have changed.
  //     expect(await hardhatToken.balanceOf(owner.address)).to.equal(
  //       initialOwnerBalance
  //     );
  //   });

      it("Should update balances after transfers", async function () {
      // const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // // Transfer 100 tokens from owner to addr1.
      // await hardhatToken.transfer(addr1.address, 100);

      // // Transfer another 50 tokens from owner to addr2.
      // await hardhatToken.transfer(addr2.address, 50);

      // // Check balances.
      // const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      // expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      // const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      // expect(addr1Balance).to.equal(100);

      // const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      // expect(addr2Balance).to.equal(50);
      // Weth9 contract 
      const signers = await ethers.getSigners();
      const signer = signers[0];
      const weth_contract = new ethers.Contract(WETH9Address, Weth9ABI, signer)
      // USDT contract 
      const usdt_contract = new ethers.Contract(USDTAddress, USDTABI, signer)
    
      const amount = '' + 1
      tx = await usdt_contract.approve(swapper.address, ethers.utils.parseEther(amount))
      await tx.wait()
      // 1 WETH -> USDT 
      tx = await swapper.swapTetherToEthV3(ethers.utils.parseEther(amount))
      await tx.wait()
    
      // confirm USDT token balance 
      num_weth = ethers.utils.formatEther((await weth_contract.balanceOf(signer.address)))
      let num_usdt = ethers.utils.formatEther((await usdt_contract.balanceOf(signer.address)))
      expect(num_weth).to.equal(amount)
    
      console.log('WETH Balance: ', num_weth)
      console.log('USDT Balance: ', num_usdt)
    });
  //});
});
  






