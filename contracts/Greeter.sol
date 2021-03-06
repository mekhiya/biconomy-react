// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Greeter is BaseRelayRecipient {
    string data;
    address public owner;

    modifier onlyOwner() {
        require(owner == msg.sender, "");
        _;
    }

    /**
     * Set the trustedForwarder address either in constructor or
     * in other init function in your contract
     */
    constructor(address _trustedForwarder) {
        _setTrustedForwarder(_trustedForwarder);
        data = "Hello Metatransaction";
        owner = msg.sender;
    }

    /**
     * OPTIONAL
     * You should add one setTrustedForwarder(address _trustedForwarder)
     * method with onlyOwner modifier so you can change the trusted
     * forwarder address to switch to some other meta transaction protocol
     * if any better protocol comes tomorrow or current one is upgraded.
     */
    function setTrustForwarder(address _trustedForwarder) public onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }

    /**
     * Override this function.
     * This version is to keep track of BaseRelayRecipient you are using
     * in your contract.
     */
    function versionRecipient() external pure override returns (string memory) {
        return "1";
    }

    function getStorage()
        public
        view
        returns (string memory currentQuote, address currentOwner)
    {
        return (data, owner);
    }

    function setStorage(string memory _newData) public {
        data = _newData;
    }
}
