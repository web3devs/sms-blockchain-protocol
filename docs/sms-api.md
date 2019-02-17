# SMS API

Text messages are sent to the phone number for the server. The format is CSV.

### Tweet (MVP - Impact Track)

`tweet, message`

command, message

### Coincap (Shapeshift bounty)

command, [assets, rates, exchanges], <currency>

ex: `coincap, rates, bitcoin`

ex: `coincap, assets, ethereum`

### Shapeshift

shapeshift, shift, <address>, pair

ex: `shapeshift, shift, <address>, BTC_LTC`

shapeshift, sendamount, <address>, pair, depositAmount

ex: `shapeshift, sendamount, <address>, BTC_LTC, .1`

### Balance (Poa xDai bounty)

command, [xdai, buffidai, null]

`balance, buffidai`

### xDai

`xdai, getBalance, <address>`

### Rhombus

command, oracle

`rhombus, lighthouse, peekdata`

---

--- Future ---

### Ethereum

command, contract, function, arg

`eth, tweet, tweet, message`
