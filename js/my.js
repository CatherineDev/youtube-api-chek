var yUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBoPX3J0F_VGyr4SgTx-RKBMY6lOXvF37M&q=w123&type=video"

function getAjaxJson(q){
  var req = new XMLHttpRequest();
  req.onload = function(){
    var resp = JSON.parse(req.responseText);
    displaySearchResult(resp.items);
  }
  
  req.open("GET","https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBoPX3J0F_VGyr4SgTx-RKBMY6lOXvF37M&q="+ q +"&type=video", true);
  req.send();
}


function onSubmit(e){
  e.preventDefault();
  var qInput = document.querySelector('#yousearch input[name="q"]');
  if(qInput && qInput.value!=""){
    getAjaxJson(qInput.value);
  }
  return false;
}

function displaySearchResult(items){
  searchResult.innerHTML = "";
  if(items.length>0){
    var workspace = document.querySelector("#workspace");
    workspace.classList.remove("justify-content-center"); 
    workspace.classList.add("justify-content-start");
    for(i=0; i<items.length; i++){
      var item = items[i]
      createDiv(item);
    }
  }

}

function createDiv(item){
  var shadowItem = document.querySelector("#searchItemTpl");
  var clone = document.importNode(shadowItem.content, true); 
  var description = clone.querySelector(".description");
  description.innerText = item.snippet.description;
  var title = clone.querySelector(".title");
  title.innerText = item.snippet.title;
  var image = clone.querySelector(".img");
  image.setAttribute("alt", item.snippet.title);
  image.setAttribute("src", item.snippet.thumbnails.default.url);
  clone.querySelector(".searchItem").onclick = function(){
    createPlayer(item.id.videoId);
  }
  searchResult.appendChild(clone);
}


function createPlayer(videoId){
  yplayer.innerHTML = "";
  var player = document.createElement("iFrame");
  yplayer.classList.remove("d-none"); 
  yplayer.classList.add("d-flex");
  player.setAttribute("width", 560);
  player.setAttribute("height",315);
  player.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
  player.setAttribute("frameborder", 0);
  player.setAttribute("allow", "autoplay; encrypted-media");
  player.setAttribute("allowfullscreen", true);
  yplayer.appendChild(player);
}

function hidePlayer(e){
  if(e.target.id=="yplayer"){
    yplayer.classList.remove("d-flex"); 
    yplayer.classList.add("d-none");
  }
}


yousearch.addEventListener('submit', onSubmit)
yplayer.addEventListener('click', hidePlayer)

