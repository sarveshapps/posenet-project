scoreLeftwrist=0;
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('poseNet is initialized');
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftwrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
}
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist="+scoreLeftwrist);
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        console.log('leftWristX='+leftWristX+'leftwristY='+leftWristY);
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log('rightWristX='+rightWristX+'rightwristY='+rightWristY);

    }
}
