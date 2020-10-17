// Code by Craig Mod under MIT License
// https://gist.github.com/cmod/5410eae147e4318164258742dd053993
var fuse, searchVisible = !1,
    firstRun = !0,
    list = document.getElementById("searchResults"),
    first = list.firstChild,
    last = list.lastChild,
    maininput = document.getElementById("searchInput"),
    resultsAvailable = !1,
    baseURL = window.location.pathname.split("/")[1]

if (baseURL.length === 0 || baseURL.includes("html")) {
    baseURL = window.location.origin
} else {
    baseURL = "/" + baseURL
}
function fetchJSONFile(e, t) {
    var n = new XMLHttpRequest;
    n.onreadystatechange = function () {
        if (4 === n.readyState && 200 === n.status) {
            var e = JSON.parse(n.responseText);
            t && t(e)
        }
    }, n.open("GET", e), n.send()
}

function loadSearch() {
    fetchJSONFile(baseURL + "/data/search.json", function (e) {
        fuse = new Fuse(e, {
            shouldSort: !0,
            location: 0,
            distance: 100,
            threshold: .4,
            minMatchCharLength: 2,
            keys: ["title", "tags"]
        })
    })
}

function executeSearch(e) {
    let t = fuse.search(e),
        n = "";
    if (0 === t.length) resultsAvailable = !1, n = "";
    else {
        for (let e in t.slice(0, 5)) n = n + '<li><a href="' + baseURL + '/' + t[e].permalink + '" tabindex="0"><span class="title">' + t[e].title + "</span> — " + t[e].tags + "</a></li>";
        resultsAvailable = !0
    }
    document.getElementById("searchResults").innerHTML = n, t.length > 0 && (first = list.firstChild.firstElementChild, last = list.lastChild.firstElementChild)
}
firstRun && (loadSearch(), firstRun = !1), searchVisible || (document.getElementById("searchInput").focus(), searchVisible = !0), document.addEventListener("keydown", function (e) {
    27 == e.keyCode && document.activeElement.blur(), 40 == e.keyCode && searchVisible && resultsAvailable && (e.preventDefault(), document.activeElement == maininput ? first.focus() : document.activeElement == last ? last.focus() : document.activeElement.parentElement.nextSibling.firstElementChild.focus()), 38 == e.keyCode && searchVisible && resultsAvailable && (e.preventDefault(), document.activeElement == maininput ? maininput.focus() : document.activeElement == first ? maininput.focus() : document.activeElement.parentElement.previousSibling.firstElementChild.focus())
}), document.getElementById("searchInput").onkeyup = function (e) {
    executeSearch(this.value)
};