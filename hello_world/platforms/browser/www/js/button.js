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
        document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log("initliaze");
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {       
        var button_element = document.getElementById("button");
        
        if (button_element != null)
            button_element.addEventListener('click', app.onButtonClick); 
        
        

        console.log("onDevice ready");
    },

    onButtonClick: function() {
        let options = {
            quality: 100,            
        };

        if (navigator.camera)
            console.log("camera is available");
        else
            console.log("camera is not available");

        navigator.camera.getPicture(app.onSuccess, app.onFailure, options);

        console.log("clicked!");
        
        //let photo_element = document.getElementById("photo");
        // photo_element.src = "img/img_text.png"
    },

    extractText: function(imgPath) {
        Tesseract.recognize(imgPath)
        .progress(app.updateProgress)
        .then(app.onResult);
    },

    updateProgress: function(value) {
        let progress = document.getElementById("progress");
        let progress_value = document.getElementById("progress_value");

        if (value.status === "recognizing text") {
            progress_value.textContent = value.progress * 100;

            progress.setAttribute("style", "display:block");
            progress_value.setAttribute("style", "display:block");

            console.log(value.progress);            
        }
    },

    onResult: function(result) {
        let text_element = document.getElementById("text");
        let text_value = document.getElementById("text_value");

        text_value.textContent = result.text;

        text_element.setAttribute("style", "display:block");
        text_value.setAttribute("style", "display:block");

        console.log(result.text);
        console.log("Tesseract finished!");
    },

    onSuccess: function(imgURI) {
        let photo_element = document.getElementById("photo");

        if (photo_element == null)
            console.log("photo element is null");

        photo_element.src = imgURI;
        photo_element.width = 200;
        
        app.extractText(imgURI);
    },

    onFailure: function(msg) {
        console.log("Camera getpicture failed with the error ${msg}");
    }

    // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

