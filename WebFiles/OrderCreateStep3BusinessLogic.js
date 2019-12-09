function OrderCreateStep3BusinessLogic() {

    //Hide Float Field If Other Payment Method Is Selected
    if ($("#cent_float").val() === "") {
        $("#cent_float").closest("tr").hide();
    }
    else {
        $("#cent_float").closest("tr").show();
    }

    //Calculate Total Amount Using Product and Recipient Count
    var prodname = $("#cent_productid_name").val();
    var cardvalue = 0;    
    
    cardvalue = $("#edge_cardvalue option:selected").text();

    //cardvalue = $("#edge_cardvalue select.opts:visible option:selected ").val();
    var totalamount = 0;

    if (cardvalue != 0) {
        //alert("Card Value selected = " + cardvalue);
    }
    else {
        alert("Card Value Not Selected On Order!!");
    }

    // Get saved data from sessionStorage
    var recpcount = sessionStorage.getItem('rcount');
    var rcountNum = parseInt(recpcount);

    if (rcountNum > 0) {
        //alert("No Of Recipients Uploaded = " + rcountNum);
        totalamount = (rcountNum * cardvalue);
        //alert("Total Order Amount = " + totalamount);
        $("#WebFormPanel > div.actions").before('<div id="totalRecipients"><label>Total Recipients: ' + rcountNum + '</label></br></br></div>');
        $("#WebFormPanel > div.actions").before('<div id="totalAmount"><label>Total Order Amount: $' + totalamount + '</label></br></br></div>');

        showConfirmationLabel();
        insertExitOrder();
    }
    else {
        alert("Recipient count not found from session..unable to calculate Total Order Amount!!");
    }
}

function showConfirmationLabel() {
    var content = '<b>Please Review your Order before Clicking "Submit Order" button.</b></br><b>After submission the details on the Order cannot be changed.</b>';
    var html = '<div id="confirmationMessage" >' + content + '</div>';


    $("#totalAmount").after(html);
    $('#confirmationMessage').show();
}

function insertExitOrder() {
    $("#PreviousButton").parent("div").after("<div role='group' class='btn-group entity-action-button'><button type='button' class='btn btn-primary button next submit-btn' onclick='exitOrder();'>Save &amp; Exit Order</button></div>");

}

function exitOrder() {
    alert('This Order Will Be Saved For 7 days and Deleted Automatically');
    window.location.href = "~/orders-list";

}
