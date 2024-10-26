const click = document.querySelector(".circle");
const btn = document.querySelector(".btn");
const body = document.querySelector(".main");


if (localStorage.getItem("darkMode") === "true") {
    click.classList.add("click");
    btn.style.background = "#212121";
    click.style.background = "#fff";
    body.style.background = "#202020";
    body.style.color = "#fff";
}

click.addEventListener("click", () => {
    darkMode();
});

async function darkMode() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    
    if (tab.url.includes("youtube.com") || tab.url.includes("twitch.tv")) {
        alert("Dark Mode can not run on this website");
        return; 
    }
   

    if (click.classList.contains("click")) {
        click.classList.remove("click");
        btn.style.background = "#e0e0e0";
        click.style.background = "#000000";
        body.style.background = "#fff";
        body.style.color = "#000000";
        localStorage.setItem("darkMode", "false"); 

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelector("html").style.filter = 'invert(0) hue-rotate(0deg)';
                let media = document.querySelectorAll("img, video");
                media.forEach(element => {
                    element.style.filter = 'invert(0) hue-rotate(0deg)';
                });
            }
        });
    } else {
        click.classList.add("click");
        btn.style.background = "#212121";
        click.style.background = "#fff";
        body.style.background = "#202020";
        body.style.color = "#fff";
        localStorage.setItem("darkMode", "true"); 

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelector("html").style.filter = 'invert(1) hue-rotate(180deg)';
                let media = document.querySelectorAll("img, video");
                media.forEach(element => {
                    element.style.filter = 'invert(1) hue-rotate(180deg)';
                });
            }
        });
    }
    
}
