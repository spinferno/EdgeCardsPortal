function OrderCreateStep2BusinessLogic() {

    insertCustomNextButton();
    $("#AttachFile").before("<a href='~/recipient-template'>Download Recipient File template</a>");

    showNextToAttach();

    insertExitOrder();

    //Set Owner
    $("#ownerid").val("F89560B1-ECBE-E911-A97B-000D3AD1C904"); 
    $("#ownerid_name").val("Onkar Yadav");
    $("#ownerid_entityname").val("contact");


    $("#cent_recipientmap").val("A311BC0F-20EB-E911-A812-000D3AD1C0C9");
    $("#cent_recipientmap_name").val("Portal Order Recipients Map");
    $("#cent_recipientmap_entityname").val("cent_deliveryrecipientfilemapping");

    $("#cent_recipientmap").closest("tr").hide();

    document.getElementById('AttachFile').addEventListener('change', upload, false);
}
//
// Method that checks that the browser supports the HTML5 File API
function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
    }
    return isCompatible;
}

// Method that checks if .CSV file has been uploaded
function CSVFilecheck() {
    var isCSV = true;
    var fileInput = document.getElementById('AttachFile');
    var filename = fileInput.files[0].name;

    // Use a regular expression to trim everything before final dot
    var extension = filename.replace(/^.*\./, '');

    // Iff there is no dot anywhere in filename, we would have extension == filename,
    // so we account for this possibility now
    if (extension == filename) {
        extension = '';
    } else {
        // if there is an extension, we convert to lower case
        // (N.B. this conversion will not effect the value of the extension
        // on the file upload.)
        extension = extension.toLowerCase();
    }

    if (extension != 'csv') {
        isCSV = false;
    }
    return isCSV;
}

// Method that reads and processes the selected file
function upload(evt) {
    var preexistingfile = false;
    //var tableBody = "<table id='ErrorTbl'>";
    var tableContent = "";
    var tableBody = "<table id='ErrorTbl' class='table'>";
    var messageDisplayedOnce = false;

    if ($("#notescontrol > div > div.notes > div").length >= 1) {
        alert('A Recipient file has already been uploaded, please delete the previous file before uploading another file');
        document.getElementById('AttachFile').value = null;
        preexistingfile = true;
    }

    if (preexistingfile == false) {

        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
            document.getElementById('AttachFile').value = null;
        }
        //Call isCSV method to validate if the file uploaded is a .CSV file.
        if (!CSVFilecheck()) {
            alert("Please upload file with .csv extension");
            document.getElementById('AttachFile').value = null;
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                var errorMessage = "";
                if ((data && data.length > 0) && (data != "")) {
                    //Iterate through File Rows
                    for (i = 0; i < data.length; i++) {
                        if (i == 0) {
                            //Validate if the file headers map to the Recipient file format

                            if (data[i][0] == "") {
                                //alert('File Column 1 is missing Header information. "email" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 1 is missing Header information. "email" (in small letters) is expected in this cell';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "</td> <td>" + "  " + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;                               
                                //break;
                            }

                            if (data[i][0] != "email") {
                                //alert('File Column 1 Header is incorrect. "email" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 1 Header is incorrect. "email" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][1] == "") {
                                //alert('File Column 2 is missing Header information. "firstname" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 2 is missing Header information, "firstname" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][1] != "firstname") {
                                //alert('File Column 2 Header is incorrect. "firstname" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 2 Header is incorrect. "firstname" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][2] == "") {
                                //alert('File Column 3 is missing Header information. "lastname" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 3 is missing Header information. "lastname" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][2] != "lastname") {
                                //alert('File Column 3 Header is incorrect. "lastname" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 3 Header is incorrect. "lastname" (in small letters) is expected in this cell, Please correct and upload the file again';   
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][3] == "") {
                                //alert('File Column 4 is missing Header information. "message" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 4 is missing Header information. "message" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }

                            if (data[i][3] != "message") {
                                //alert('File Column 4 Header is incorrect. "message" (in small letters) is expected in this cell ');
                                errorMessage = 'File Column 4 is missing Header information. "message" (in small letters) is expected in this cell, Please correct and upload the file again';
                                rowNUmber = 1;
                                tableContent = tableContent + "<tr><td>" + "Error In Header Row : " + "  " + "</td> <td>" + errorMessage + "</td></tr>";
                                document.getElementById('AttachFile').value = null;
                                //break;
                            }
                        }
                        else {
                            for (j = 0; j < 4; j++) {

                                //validate the email address value for this row
                                if (j == 0) {
                                    if ((data[i][j] == "") || (data[i][j] == " ")) {
                                        //alert("Email Address Not Present In Row# " + (i + 1) + ", please include email address and upload the file again");
                                        rowNUmber = (i+1+" ");
                                        //errorMessage = "Email Address Not Present In Row# " + (i + 1) + " ,Please include email address and upload the file again";
                                        errorMessage = "Email Address Not Present, Please include email address and upload the file again";
                                        tableContent = tableContent + "<tr><td>" + "Error In Row No: " + rowNUmber + "</td> <td>" + errorMessage + "</td></tr>";
                                        //break;
                                    }
                                    else {
                                        var recemail = data[i][j];
                                        var emailRegex = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
                                        var validemail = emailRegex.test(recemail);
                                         
                                        var emailRegex2 = new RegExp((/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/));
                                        var validemail2 = emailRegex2.test(recemail);

                                        if (!validemail || !validemail2) {
                                            rowNUmber = (i+1+" ");
                                            //errorMessage = "Invalid e-mail address In Row# " + (i + 1) + " ,Please correct this email address and upload the file again"
                                            errorMessage = "Invalid e-mail address, Please correct this email address and upload the file again";
                                            //alert("Invalid e-mail address In Row# " + (i + 1) + "please correct this email address and upload the file again");
                                            tableContent = tableContent + "<tr><td>" + "Error In Row No: " + rowNUmber + "  " + "</td> <td>" + errorMessage + "</td></tr>";                                            
                                            document.getElementById('AttachFile').value = null;
                                            //break;
                                        }
                                    }
                                }

                                //validate the firstname value for this row
                                if (j == 1) {
                                    if ((data[i][j] == "") || (data[i][j] == " ")) {
                                        rowNUmber = (i+1+" ");
                                        //errorMessage = "First Name Not Present In Row# " + (i + 1) + " ,Please correct the file to include First Name and upload the file again";
                                        errorMessage = "First Name Not Present, Please correct the file to include First Name and upload the file again";
                                        document.getElementById('AttachFile').value = null;
                                        tableContent = tableContent + "<tr><td>" + "Error In Row No: " + rowNUmber + "</td> <td>" + errorMessage + "</td></tr>";
                                        //alert("First Name Not Present In Row# " + (i + 1) + ", please correct the file to include First Name and upload the file again");
                                        //break;
                                    }
                                }

                                //validate the lastname value for this row
                                if (j == 2) {
                                    if ((data[i][j] == "") || (data[i][j] == " ")) {
                                        rowNUmber = (i+1+" ");
                                        //errorMessage = "Last Name Not Present In Row# " + (i + 1) + " ,Please correct the file to include Last Name and upload the file again";
                                        errorMessage = "Last Name Not Present, Please correct the file to include Last Name and upload the file again";
                                        document.getElementById('AttachFile').value = null;
                                        //alert("Last Name Not Present In Row# " + (i + 1) + ", please correct the file to include Last Name and upload the file again");
                                        tableContent = tableContent + "<tr><td>" + "Error In Row No: " + rowNUmber + "</td> <td>" + errorMessage + "</td></tr>";
                                        //break;
                                    }
                                }
                            }

                        }
                    }
                    //If File Has Errors Display The Error Message and Clear The File attachment
                    if (errorMessage.length > 0) {
                        document.getElementById('AttachFile').value = null;
                        $("#ErrorTbl").remove();
                        $("#fileErrorMessage").remove();
                        showErrorTable(tableContent, tableBody);                        
                    }
                    else {
                        $("#ErrorTbl").remove();
                        $("#fileErrorMessage").remove();
                        var recpcount = i - 1;
                        //alert("recipient count = " + recpcount);

                        if (recpcount == 0) {
                            alert("No Recipients Present In The File please upload a correct file");
                            document.getElementById('AttachFile').value = null;
                        } else {
                            //alert("setting recipient count to " + (i - 1));
                            // Save data to sessionStorage
                            sessionStorage.setItem('rcount', (i - 1));
                            //Ask user to Click Next To Attach File                            
                        }
                    }
                }
                else {
                    alert("Empty File - No Recipients In The File!");
                    document.getElementById('AttachFile').value = null;
                }
            };
            reader.onerror = function () {
                alert('Unable to read file: ' + file.fileName);
            };
        }
    }
}

function insertCustomNextButton() {
    $("#NextButton").after("<button type='button' id='btnNext' class='btn btn-primary button next submit-btn' onclick='onNext();'>Next</button>");
    $("#NextButton").hide();
}

function onNext() {
    //Check to see if the User has uploaded a recipient file
    var clicknext = true;
    var Isfilepresent = $('#AttachFile').val();
    //var notes = $("#notescontrol > div > div.notes > div").length();

    if ($("#notescontrol > div > div.notes > div").length < 1) {
        if (Isfilepresent == "") {
            alert('Please Upload a Recipient File before clicking Next');
            clicknext = false;
        }
    }

    if ($("#notescontrol > div > div.notes > div").length >= 1) {
        if (Isfilepresent != "") {
            alert('A Recipient file has already been uploaded, please delete the previous file before uploading another file');
            document.getElementById('AttachFile').value = null;
            clicknext = false;
        }
    }

    if (clicknext == true) {
        $("#NextButton").click();
    }
}

function insertExitOrder() {
    $("#PreviousButton").parent("div").after("<div role='group' class='btn-group entity-action-button'><button type='button' class='btn btn-primary button next submit-btn' onclick='exitOrder();'>Save &amp; Exit Order</button></div>");

}

function exitOrder() {
    alert('This Order Will Be Saved For 7 days and Deleted Automatically');
    window.location.href = "~/orders-list";

}

function showNextToAttach() {
    var content = '<b>After Choosing The Recipient File, Click Next To Attach The File To This Order.</b>';
    var html = '<div id="attachFileMessage" >' + content + '</div>';


    $("#AttachFile").after(html);
    $('#attachFileMessage').show();
}

function showErrorTable(tableContent, tableBody) {   
    //var tableBody = "<table id='ErrorTbl'>";
    if (tableContent.length > 0) {
    var errorMessage = "<div id='fileErrorMessage'>File is invalid.</div>"
        tableBody = tableBody + tableContent + "</table >";
        $("#AttachFile").before(tableBody);
        $("#ErrorTbl").before(errorMessage);

        //$("#ValidationSummaryEntityFormView").after(tableBody);
        //$("#notescontrol").after(tableBody);
    }
    //errorOccured = true;
}