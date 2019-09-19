/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {        
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).ready(this.onDeviceReady)
        console.log("initliaze");
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {    
        $("#my_button").click(app.onButtonClick);       

        console.log("onDevice ready");
    },

    onButtonClick: function() {    
        let camera_options = {
            quality: 100,            
        };

        navigator.camera.getPicture(app.onSuccess, app.onFailure, camera_options);

        $("#my_button").hide();

        console.log("clicked!"); 
    },

    extractText: function(imgPath) {
        Tesseract.recognize(imgPath)
        .progress(app.updateProgress)
        .then(app.onResult);
    },

    updateProgress: function(value) {   
        if (value.status === "recognizing text") {            
            $("#my_progress_bar").css("width", value.progress * 100 + "%");            
            $("#my_progress_bar").text(value.progress.toFixed(2) * 100 + "%");            
            $("#my_progress").css("display", "flex");

            console.log(value.progress);            
        }
    },

    onResult: function(result) {
        $("#my_progress").css("display", "none");

        $("#my_card_body").text(result.text);
        $("#my_card").css("display", "flex")       

        console.log(result.text);
        console.log("Tesseract finished!");
    },

    onSuccess: function(imgURI) {        
        $("#my_photo").attr("src", imgURI);
        $("#my_photo").css("display", "block");

        console.log("onPhoto Success!");

        app.extractText("img/img_text.png");
    },

    onFailure: function(msg) {
        console.log("Camera getpicture failed with the error ${msg}");
    }
};

