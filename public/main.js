var imgArray = ['img-1.jpg', 'img-2.jpg', 'img-3.jpg', 'img-4.jpg', 'img-5.jpg'];
var num = Math.floor((Math.random() * 5))
var imageSelected = imgArray[num];
document.body.style.backgroundImage =  'url('+imageSelected+')' ;
document.body.style.backgroundPosition = "center center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "no-fixed";
document.body.style.backgroundSize = "cover";





