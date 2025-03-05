// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    address public buyer;
    address public seller;
    address public courier;
    uint public amount;
    bool public isPaid;
    bool public isShipped;
    bool public isDelivered;

    enum State { Created, Paid, Shipped, Delivered, Completed }
    State public state;

    constructor(address _buyer, address _seller, address _courier, uint _amount) {
        buyer = _buyer;
        seller = _seller;
        courier = _courier;
        amount = _amount;
        state = State.Created;
        isPaid = false;
        isShipped = false;
        isDelivered = false;
    }

    modifier inState(State _state) {
        require(state == _state, "Invalid state");
        _;
    }

    function deposit() public payable inState(State.Created) {
        require(msg.value == amount, "Incorrect amount");
        isPaid = true;
        state = State.Paid;
    }

    function ship() public inState(State.Paid) {

        require(isPaid, "Payment not received yet");
        isShipped = true;
        state = State.Shipped;
    }

    function confirmDelivery() public inState(State.Shipped) {
        require(isShipped, "Order not shipped yet");
        isDelivered = true;
        state = State.Delivered;
    }

    function acceptOrder() public inState(State.Delivered) {
        require(isDelivered, "Order not delivered yet");
        payable(seller).transfer(amount);
        state = State.Completed;
    }

    function orderStatus() public view returns (string memory) {
        if (state == State.Created) {
            return "Awaiting payment";
        } else if (state == State.Paid) {
            return "Awaiting shipment";
        } else if (state == State.Shipped) {
            return "In transit";
        } else if (state == State.Delivered) {
            return "Delivered";
        } else {
            return "Completed";
        }
    }
}
