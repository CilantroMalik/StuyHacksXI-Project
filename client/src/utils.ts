export function httpGetAsync(theUrl: string, callback: (response:string)=>void) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

export function httpSendJSON(theUrl: string,
                             data: any, callback: (response:any)=>void) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(theUrl, options).then((res: any) => callback(res));
}

export async function httpGet(url: string, callback: any) {
  fetch(url, { method: "GET" }).then((res: any) => callback(res));
}
