(function(window){var svgSprite='<svg><symbol id="star-mima" viewBox="0 0 1024 1024"><path d="M774.7 406.9h-53.4v-71.2c0-117.7-95.8-213.4-213.5-213.4S294.3 218 294.3 335.7v71.2H241c-29.5 0-53.4 23.9-53.4 53.3v391.2c0 29.5 23.9 53.3 53.4 53.3h533.7c29.5 0 53.4-23.9 53.4-53.3V460.3c0-29.5-23.9-53.4-53.4-53.4zM338 331.4c0-93.6 76.2-169.7 169.8-169.7 93.6 0 169.8 76.1 169.8 169.7v75.5H338v-75.5zM785.1 860H236.6V458h548.5v402z"  ></path><path d="M507.8 746.5c11.9 0 21.5-11.9 21.5-26.7V577.6c0-14.7-9.7-26.7-21.5-26.7-11.9 0-21.5 11.9-21.5 26.7v142.3c0 14.7 9.6 26.6 21.5 26.6z m0 0"  ></path></symbol><symbol id="star-zhanghao" viewBox="0 0 1024 1024"><path d="M626.5 551c68.6-39.7 114.9-113.7 114.9-198.5 0-126.5-102.9-229.4-229.4-229.4S282.6 226 282.6 352.5c0 84.8 46.3 158.8 114.9 198.5C262.9 598.4 166 726.5 166 877.1c0 14.1 11.4 25.4 25.4 25.4 14 0 25.4-11.3 25.4-25.4 0-162.8 132.5-295.2 295.2-295.2 162.8 0 295.2 132.4 295.2 295.2 0 14.1 11.3 25.4 25.4 25.4 14.1 0 25.4-11.3 25.4-25.4 0-150.6-96.9-278.7-231.5-326.1zM333.3 352.5c0-98.5 80.1-178.6 178.6-178.6S690.5 254 690.5 352.5s-80.1 178.6-178.6 178.6c-98.4 0-178.6-80.1-178.6-178.6z m0 0"  ></path></symbol><symbol id="star-shuruyanzhengma" viewBox="0 0 1024 1024"><path d="M510.9 880c-9.2 0-17.9-2.8-25.2-8.2L326.2 754.5C238.4 690 186 586.4 186 477.3V280.9c0-18.5 11.8-34.8 29.4-40.4L492 151c6.1-1.9 12.5-3 18.9-3 6.4 0 12.8 1 19 3l276.5 89.5c17.6 5.6 29.5 21.9 29.5 40.4l0.1 196.4c0 109-52.4 212.7-140.2 277.2L536.1 871.9c-7.2 5.2-16.2 8.1-25.2 8.1zM233 284.2v193.1c0 94.2 45.3 183.7 121.1 239.4L511 832.1l157-115.4c75.8-55.8 121.1-145.2 121.1-239.4l-0.1-193.1-273.5-88.5c-1.5-0.5-3-0.7-4.5-0.7s-2.9 0.2-4.4 0.7L233 284.2z m452.9 72.4H336c-13 0-23.5 10.5-23.5 23.5 0 12.9 10.5 23.5 23.5 23.5h151.5v283.1c0 12.9 10.5 23.5 23.5 23.5s23.5-10.5 23.5-23.5V403.6H686c13 0 23.5-10.5 23.5-23.5-0.1-12.9-10.6-23.5-23.6-23.5z m0 0"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)