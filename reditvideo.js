// To do list
// 1- create the scriopt to fetech the source sourceCode
// 2- clean the sourceCode
// 3 -create wbe interface for isMainThread
// 4- optimize the interface
// this is a script to extract reddit video url and share theme

//https://www.reddit.com/r/WTF/comments/i8wrhj/ratatouille_cosplay/

const PROXY = 'https://arcane-stream-72469.herokuapp.com/'; //temporary source URL
const removePart = /HLSPlaylist.m3u8\S*/g; 
const Olink = document.getElementById('Olink');
const Obutton = document.getElementById('Obutton');
let redLink;
let fetchSource;
let redLinkTitle;
let redLinkThumb;
var finalVid;


//Script to remotely fetesh the source code using fetsh() and DOMparser()
let finalcut = function getTheLink() {
    fetch(fetchSource).then(function (response) {

            // The API call was successful!
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.text();
            }

        }).then(function (html) {
            // Getting the source Code and parse it into HTML 
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html')
            console.log(doc);
            let oheader;
            // check for Normal links
            oheader = doc.querySelector('script[type="application/ld+json"]').innerText;
            let sheader = JSON.parse(oheader);
            let slink = sheader.contentUrl;
            finalVid = slink.replace(removePart, 'DASH_720.mp4');
            redLinkTitle = sheader.name;
            redLinkThumb = sheader.thumbnailUrl;

            console.log(redLinkTitle);
            console.log(redLinkThumb);
            console.log(finalVid);
            isitLive(finalVid);

        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
    } 

// check Link status
let stat;
function isitLive(hmm){
    fetch(PROXY+hmm).then(function (Response) {
    if (Response.status === 200){
        listLinks();
    } else {
    finalVid = slink.replace('DASH_720.mp4', 'DASH_480.mp4');
    isitLive(finalVid);
    }    
    })
}


//merge the proxy Links with reddit links for fetch
function mergeLinks() {
    redLink =  Olink.value;
    fetchSource = PROXY + redLink;
    Olink.value = '';
    return finalcut();
}    

    // this is to check the button event
function halfLink() {
    if (Olink.value.length > 0) {
        mergeLinks()
    }
}

// this is to grab the link from users using keypress button
function halfPress(e) {
    console.log(e);
    if (Olink.value.length > 0 && e.keyCode === 13){
        mergeLinks()
        } 
};

//event listner for Button
Obutton.addEventListener('click', halfLink);
Olink.addEventListener('keydown', halfPress);


//List the Link under submit field
function listLinks() {
    let listI = document.getElementById('thumb');
    let listT = document.getElementById('rtitle');
    let listR = document.getElementById('rlinks');
    let rvideo = document.getElementById('Rvideo');
    let rfield = document.getElementById('rfield');
    let newfield = document.createTextNode(finalVid);

    rvideo.classList.toggle("hidden");
    listI.setAttribute('src', redLinkThumb);
    listR.setAttribute('href', finalVid);
    listR.setAttribute('title', redLinkTitle);
    listR.innerHTML = redLinkTitle;
    listT.innerHTML = redLinkTitle;
    rfield.appendChild(newfield);
}
