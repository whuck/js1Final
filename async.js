
$(document).ready(function() {
    // this is an async timeout util
    const timeout = async ms => new Promise(res => setTimeout(res, ms));

    var userClicked = false; // this is to be changed on user input

    async function waitUserInput() {
        while (userClicked === false) await timeout(100); // pause script but avoid browser to freeze ;)
        const userInputVal = userClicked;
        userClicked = false; // reset var
        return userInputVal;
    }

    async function myFunc() {
        //$('#text').append(`* waiting user input...<br>`)
        console.log("wait");
        const userResponse = await waitUserInput();
        //$('#text').append(`* user choice is ${userResponse}<br>`)
        console.log("click");
        //myFunc()
    }

    $('#user-input').click(function() { userClicked = $('#text-input').val() })


    myFunc();
});
