var specialChars = 
{
    start : 0xFF,
    end : 0x3F
}

var states =
{
    waitStart : false,
    waitMessageNum : false,
    waitAddress : false,
    waitDataLen : false,
    waitData : false,
    waitForEnd : false
}

var messagesNums = null
var dataNum = null
var address = null
var data = []

function clearStates()
{
    for (var state in states)
        states[state] = false  
}

function clear()
{
    clearStates()
    messagesNums = null
    dataNum = null
    address = null
    data = []
    dataIndex = 0
}



//num messages, address, data len, data

exports.read = (byteIn) =>
{
    //console.log("byteIn=", byteIn)
    if (!states.waitStart)
    {
        if (byteIn != specialChars.start)
            return console.error("Error: The first byte should always be the start byte.")
        
        states.waitStart = true
    }

    else if (!states.waitMessageNum)
    {
        states.waitMessageNum = true
        messagesNums = byteIn
    }

    else if (!states.waitAddress)
    {
        states.waitAddress = true
        address = byteIn
        console.log("address=", address)
    }

    else if (!states.waitDataLen)
    {
        states.waitDataLen = true
        dataNum = byteIn
        console.log("dataNum=", dataNum)
    }

    else if (!states.waitData)
    {
        data.push(byteIn)
        dataNum--
        
        if (dataNum <= 0)
        {
            console.log("data=", data)
            data = []

            messagesNums--
            if (messagesNums > 0)
            {
                states.waitAddress = false
                states.waitDataLen = false
            }

            else
            {
                states.waitData = true
            }
        }
    }
    else
    {
        if (byteIn != specialChars.end)
        {
            console.error("Error: Expected an end byte.")
            console.log(byteIn)
            console.log(states)
        }

        clear()
    }
}
