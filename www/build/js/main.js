!function(){"use strict";var t=document.querySelector("#trailer-dialog iframe").getAttribute("src"),e=function(t,e){var a,o=window.pageYOffset,n=t.offsetTop+40,r=(n-o)/(e/16);a=r>=0?function(){var t=window.pageYOffset;(t>=n-r||window.innerHeight+t>=document.body.offsetHeight)&&clearInterval(i)}:function(){window.pageYOffset<=(n||0)&&clearInterval(i)};var i=setInterval(function(){window.scrollBy(0,r),a()},16)},a=document.querySelectorAll("nav a");[].forEach.call(a,function(t){t.addEventListener("click",function(a){a.preventDefault();var o=t.getAttribute("href"),n=document.querySelector(o),r=t.getAttribute("data-speed")||500;n&&e(n,r)},!1)});var o=document.getElementById("trailer-dialog"),n=document.querySelector("header"),r=new A11yDialog(o,n);r.on("show",function(e,a){e.querySelector("iframe").setAttribute("src",t)}),r.on("hide",function(e,a){var o=e.querySelector("iframe").getAttribute("src");t=o,e.querySelector("iframe").setAttribute("src","")});var i=document.querySelector("[data-status]"),c=document.querySelector("[data-volume]"),d=document.querySelector("video");d.setAttribute("src","https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761"),i.addEventListener("click",function(){var t=this.dataset.status;console.log(t),"play"===t?(this.dataset.status="pause",this.textContent="Play video",d.pause()):(this.dataset.status="play",this.textContent="Stop video",d.play())}),c.addEventListener("click",function(){"on"===this.dataset.volume?(this.dataset.volume="off",this.textContent="Volume off",d.muted=!1):(this.dataset.volume="on",this.textContent="Volume on",d.muted=!0)});document.querySelector("[data-active]");var u=document.querySelectorAll("[data-plotline-show]"),l=document.querySelectorAll("path[data-active]");if([].forEach.call(u,function(t){t.addEventListener("click",function(){var t=this.dataset.plotlineShow,e=this.dataset.city,a=document.querySelector('[data-plotline="'+t+'"]'),o=document.querySelector('[data-city-path="'+e+'"]'),n=document.querySelector('[data-city-point="'+e+'"]'),r=document.querySelector('[data-city-plane="'+e+'"]');(l=document.querySelectorAll("[data-active]"))&&[].forEach.call(l,function(t){t.removeAttribute("data-active")}),o.setAttribute("data-active",!0),n.setAttribute("data-active",!0),r.setAttribute("data-active",!0),a.setAttribute("data-active",!0)})}),window.addEventListener("load",function(){var t=document.querySelector("[data-svg-object]");t.parentElement.replaceChild(t.contentDocument.documentElement.cloneNode(!0),t),0===l.length&&(document.querySelector('[data-city-path="berlin"]').setAttribute("data-active",!0),document.querySelector('[data-city-point="berlin"]').setAttribute("data-active",!0),document.querySelector('[data-city-plane="berlin"]').setAttribute("data-active",!0))}),window.innerWidth<960){var s=document.querySelector(['[data-trigger="menu"]']);s.removeAttribute("hidden"),document.body.classList.add("size-small"),s.addEventListener("click",function(){document.body.classList.toggle("menu-open")})}console.log("JavaScript file with version v0.1 loaded with no errors!1")}();