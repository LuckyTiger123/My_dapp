pragma solidity >=0.4.22 <0.6.0;

contract dapp {

    // uint maxFishNumber = 10;
    uint commodityNumber = 0;
    uint commodityIDGive = 0;

    address payable owner;
    constructor() public{
        owner = msg.sender;
    }

    struct fish{
        uint fish_color;
        uint fish_size;
        uint fish_state;
    }
    struct fisher{
        uint fish_count;
        fish own_fish;
    }

    struct marketCommodity{
        uint commodityID;
        uint fish_color;
        uint fish_size;
        address payable fish_owner;
        uint price;
    }

    mapping(address => fisher) fishers;
    mapping(uint => marketCommodity) commodities;

    function getFisherFish() public view returns (uint fish_color, uint fish_size, uint fish_state){
        fish_color = fishers[msg.sender].own_fish.fish_color;
        fish_size = fishers[msg.sender].own_fish.fish_size;
        fish_state = fishers[msg.sender].own_fish.fish_state;
    }

    function goFishing(uint random_num) public payable returns (uint fish_color, uint fish_size) {
        if(msg.value != 10 ether){
            msg.sender.transfer(msg.value);
        }else{
            fisher storage fisherman = fishers[msg.sender];
            fish memory new_fish;
            if(fisherman.fish_count>=1){
                fish_color = 0;
                fish_size = 0;
            }
            else{
                uint256 random_color = uint256(keccak256(abi.encodePacked(random_num, now)))%3+1;
                new_fish.fish_color = random_color;
                uint256 random_size = uint256(keccak256(abi.encodePacked(random_num, now)))%4+1;
                new_fish.fish_size = random_size;
                fishers[msg.sender].own_fish.fish_color = new_fish.fish_color;
                fishers[msg.sender].own_fish.fish_size = new_fish.fish_size;
                fishers[msg.sender].own_fish.fish_state = 1;
                fishers[msg.sender].fish_count++;
                fish_color = new_fish.fish_color;
                fish_size = new_fish.fish_size;
            }
            owner.transfer(msg.value);
        }
    }

    function releaseFish() public {
        fishers[msg.sender].fish_count = 0;
        fishers[msg.sender].own_fish.fish_color = 0;
        fishers[msg.sender].own_fish.fish_size = 0;
        fishers[msg.sender].own_fish.fish_state = 0;
    }

    function getFisherFishState() public view returns (uint state) {
        state = fishers[msg.sender].own_fish.fish_state;
    }

    function sellFish(uint price) public {
        fishers[msg.sender].own_fish.fish_state = 2;
        commodities[commodityNumber].commodityID = commodityIDGive;
        commodities[commodityNumber].fish_color = fishers[msg.sender].own_fish.fish_color;
        commodities[commodityNumber].fish_size = fishers[msg.sender].own_fish.fish_size;
        commodities[commodityNumber].fish_owner = msg.sender;
        commodities[commodityNumber].price = price;
        commodityNumber++;
        commodityIDGive++;
    }

    function getCommodity() public view returns (uint count, uint[] memory fish_color, uint[] memory fish_size, uint[] memory fish_price, uint[] memory cmID) {
        uint i;
        fish_color = new uint[] (commodityNumber);
        fish_size = new uint[] (commodityNumber);
        fish_price = new uint[] (commodityNumber);
        cmID = new uint[] (commodityNumber);
        for(i=0;i<commodityNumber;i++) {
            fish_color[i] = commodities[i].fish_color;
            fish_size[i] = commodities[i].fish_size;
            fish_price[i] = commodities[i].price;
            cmID[i] = commodities[i].commodityID;
        }
        count = commodityNumber;
    }

    function buyFish(uint fish_id) public payable{
        uint i;
        uint flag = 0;
        for(i=0;i<commodityNumber;i++){
            if(commodities[i].commodityID==fish_id){
                if(commodities[i].price*1000000000000000000 == msg.value){
                    flag = 1;
                }
                break;
            }
        }
        if(flag==1){
            address payable item = commodities[i].fish_owner;
            fishers[item].fish_count = 0;
            fishers[item].own_fish.fish_color = 0;
            fishers[item].own_fish.fish_size = 0;
            fishers[item].own_fish.fish_state = 0;
            fishers[msg.sender].fish_count++;
            fishers[msg.sender].own_fish.fish_color = commodities[i].fish_color;
            fishers[msg.sender].own_fish.fish_size = commodities[i].fish_size;
            fishers[msg.sender].own_fish.fish_state = 1;
            commodityNumber--;
            commodities[i] = commodities[commodityNumber];
            delete commodities[commodityNumber];
            item.transfer(msg.value);
        }
        else{
            msg.sender.transfer(msg.value);
        }
    }
}