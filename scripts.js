function isSupported(){
    console.log("NOTIFY","SERVICE CHECK")
    if (!('serviceWorker' in navigator)) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        console.log("NOTIFY","SERVICE WORKER ","Not available")
        return false;
    }

    if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        console.log("NOTIFY","PUSH MANAGER","Not available")
        return false;
    }
    console.log("NOTIFY","SERVICE CHECK","Available")
    return true;
}

async function enableNotification() {
    console.log("NOTIFY","Enabling Notification")
    const result = await Notification.requestPermission();
    console.log("NOTIFY","Notification Result",result)
    if (result == 'granted') {
        console.log("NOTIFY","Notification Enabled")
        await registerSW();
    }
}

async function registerSW() {
    console.log("NOTIFY","Registring Service worker")
    await navigator.serviceWorker.register('./service_worker.js').then(function(registration){
        console.log("NOTIFY","Registring Service worker success",registration)
    },function(error){
        console.log("NOTIFY","Registring Service worker failed",error)
    });
}

function getSW() {
    return navigator.serviceWorker.getRegistration('./service_worker.js');
}

function showSimpleNotification(){
    console.log("NOTIFY","Showing Simple Notification")
    const options = {
        body: 'Simple piece of body text.\nSecond line of body text 👍'
    };
    new Notification("Simple Notification",options)
}

async function showNotification() {
    const reg = await getSW();
    console.log("NOTIFY","Getting Service Worker",reg)
    /**** START RNotification ****/
    const title = 'Simple Notification';
    const options = {
        body: 'Simple piece of body text.\nSecond line of body text 👍',
        actions: [{
            title: 'Action 1',
            action: 'action-1'
        }, {
            title: 'Action 2',
            action: 'action-1'
        }]
    };
    console.log("NOTIFY","Showing Notification")
    reg.showNotification(title, options);
    /**** END dirLTRNotification ****/
}