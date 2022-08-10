Prediction_1="";
Prediction_2="";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality:90
    
});

camera=document.getElementById("camera");
Webcam.attach("#camera")

function photo(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="picture" src="'+data_uri+'"/>';

    }); 
}
console.log("ml5 version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NUkBjKtNa/model.json", ModelLoaded);

function ModelLoaded(){
    console.log("Model Loaded!")
}
function speak(){
    var synth= window.speechSynthesis;
    speak_1="First Prediction is " + Prediction_1;
    speak_2="Second Prediction is " + Prediction_2;

    var utterthis=new SpeechSynthesisUtterance(speak_1 + speak_2)
    synth.speak(utterthis);


}

function result(){
    img= document.getElementById("picture");
    classifier.classify(img, gotresult);

}
function gotresult(error, result){
if (error){
    console.error(error);
}
else{
    console.log(result);
    document.getElementById("emotion1").innerHTML=result[0].label;
    document.getElementById("emotion2").innerHTML=result[1].label;
    Prediction_1=result[0].label;
    Prediction_2=result[1].label;
    speak();
    if(result[0].label=="Laugh"){
        document.getElementById("emoji1").innerHTML="&#128512;";
    }
    if(result[0].label=="Smiling"){
        document.getElementById("emoji1").innerHTML="&#128522;";
    }
    if(result[0].label=="Sad"){
        document.getElementById("emoji1").innerHTML="&#128542;";
    }
    if(result[0].label=="Crying"){
        document.getElementById("emoji1").innerHTML="&#x1F622;";
    }
    if(result[0].label=="Angry"){
        document.getElementById("emoji1").innerHTML="&#128548;";

    }
    if(result[1].label=="Laugh"){
        document.getElementById("emoji2").innerHTML="&#128512;";
    }
    if(result[1].label=="Smiling"){
        document.getElementById("emoji2").innerHTML="&#128522;";
    }
    if(result[1].label=="Sad"){
        document.getElementById("emoji2").innerHTML="&#128542;";
    }
    if(result[1].label=="Crying"){
        document.getElementById("emoji2").innerHTML="&#x1F622;";
    }
    if(result[1].label=="Angry"){
        document.getElementById("emoji2").innerHTML="&#128548;";
    }
    
}

}