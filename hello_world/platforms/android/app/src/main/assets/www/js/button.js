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

$(document).ready(this.onDeviceReady);  
                
function onDeviceReady() {    
    //$("#my_button").click(app.onButtonClick);       
    $("#add_button").click(onAddClick);
    $("#add_item_button").click(onItemAdd);
    //$("#barcode_icon").click(onScanStart);

    console.log("onDevice ready");
}

function onScanStart() {
    console.log("onScanStart");

    var option = {
        torchOn: true,
    };
    cordova.plugins.barcodeScanner.scan(onScanSuccess, onScanError, option);   
}


function onScanSuccess(result) {
        console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);

        $("#number").val(result.text);
   }

function onScanError(error) {
        console.log("error" + error);
}

function onItemClick(event) {
    var button = event.target;
    console.log(button.innerHTML);
    $("#display_vendor").html(button.innerHTML);
    $("#display_code").html(button.dataset.code);
    

    console.log($("#display_vendor").html() + " " + $("#display_code").html());

    $("#displayModal").modal();
}

function onItemAdd() {
    console.log("onItemAdd");      
    console.log("Scan Number:" + $("#vendor").val());                
    var button = $("<button/>", {
        class: "btn btn-success",
        text: $("#vendor").val(),                    
        css: "color: green",
        id: "new_button",
        click: onItemClick,
    });

    button.attr("data-code", $("#number").val());

    $("#button_group").append(button);
    $("#myModal").modal("hide");
    console.log("onItem Add exit");
}           

function onAddClick() {
    console.log("onAdd click");               
    $("#myModal").modal();                
    console.log("exiting onAdd click");
}

    // onButtonClick: function() {
    //     var option = {
    //         torchOn: true,
    //     };

    //     cordova.plugins.barcodeScanner.scan(app.onScanSuccess, app.onScanError, option);            

    //     $("#my_button").hide();
    //     $('#my_button_div').hide();

    //     console.log("clicked!"); 
    // },

    // onScanSuccess(result) {
    //     console.log("We got a barcode\n" +
    //             "Result: " + result.text + "\n" +
    //             "Format: " + result.format + "\n" +
    //             "Cancelled: " + result.cancelled);

    //             cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "1101000055441998", function(success) {
    //                 console.log("encode success: " + success);
    //               }, function(fail) {
    //                 console.log("encoding failed: " + fail);
    //               }
    //             );
    // },

    // onScanError(error) {
    //     console.log("error" + error);
    // },

    // extractText: function(imgPath) {
    //     Tesseract.recognize(imgPath)
    //     .progress(app.updateProgress)
    //     .then(app.onResult);
    // },

    // updateProgress: function(value) {   
    //     if (value.status === "recognizing text") {            
    //         $("#my_progress_bar").css("width", value.progress * 100 + "%");            
    //         $("#my_progress_bar").text(value.progress.toFixed(2) * 100 + "%");            
    //         $("#my_progress").css("display", "flex");

    //         console.log(value.progress);            
    //     }
    // },

    // onResult: function(result) {
    //     $("#my_progress").css("display", "none");

    //     $("#my_card_body").text(result.text);
    //     $("#my_card").css("display", "flex")       

    //     console.log(result.text);
    //     console.log("Tesseract finished!");
    // },

    // onSuccess: function(imgURI) {        
    //     $("#my_photo").attr("src", imgURI);
    //     $("#my_photo").css("display", "block");

    //     console.log("onPhoto Success!");

    //     app.extractText(imgURI);
    // },

    // onFailure: function(msg) {
    //     console.log("Camera getpicture failed with the error ${msg}");
    // }

