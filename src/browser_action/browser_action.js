chrome.runtime.sendMessage({request: true}, function() {
    console.log(arguments);
})