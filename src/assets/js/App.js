var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 720){
  deviceWidth = 720;
}
var fs=(deviceWidth*100)/720;
document.documentElement.style.fontSize=fs+ 'px';
