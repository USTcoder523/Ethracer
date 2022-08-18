\clean:
	rm HB/*.pyc HB/*.out fuzzer/*.pyc fuzzer/._*  HB/*.txt fuzzer/*.txt

runTests:
	main.py --checkone ../tests/0xfbe0e9846bd736b84a0a973322ad2a1fc8d7e5ca.sol 0xfbe0e9846bd736b84a0a973322ad2a1fc8d7e5ca --blockchain --atblock 4999801 --owner 0x7dbd71b247a000b8db0bf9dc57467c3a06ec0a47
    main.py --checkone ../tests/0x325476448021c96c4bf54af304ed502bb7ad0675.sol 0x325476448021c96c4bf54af304ed502bb7ad0675 --blockchain --owner 0x056682f1cf0dc48266c1e47057297a64b58bb6fa
	
	main.py --checkone ../dataset/contracts/Adapter01-0x3A0430bF7cd2633af111ce3204DB4b0990857a6F/deployedBytecode.bin 0x3A0430bF7cd2633af111ce3204DB4b0990857a6F --blockchain --owner 0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57 --bin
	main.py --checkone ../dataset/contracts/UniswapV2Pair-0x26aAd2da94C59524ac0D93F6D6Cbf9071d7086f2/deployedBytecode.bin 0x26aAd2da94C59524ac0D93F6D6Cbf9071d7086f2 --blockchain --owner 0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57 --bin
