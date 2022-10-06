chrome.runtime.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            window.addEventListener('copy', event => {
                setTimeout(activate, 0);
            })

            chrome.runtime.onMessage.addListener(event => {
                console.log(event);
            });
        }
    }, 10);
});


function activate() {
    navigator.clipboard.readText().then(url => {
        try {
            if (url) {
                working = true;
                let obj = new URL(url)
                let params = obj.searchParams
                let destination = params.get('url');
                let decoded = decodeURI(destination);

                if (destination && url) {
                    navigator.clipboard.writeText(decoded);
                }
            } else {
               // ignore
            }
        } catch (err) {
            // ignore
        }
        setTimeout(activate, 1000 * (1 / 60));
    });
}

setTimeout(activate, 0);
