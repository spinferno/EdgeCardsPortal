function OrderCreateStep4BusinessLogic() {
	
    var orderNumber = $("#ordernumber").val();
    
    var content = '<b>Edge Order Number:    ' + orderNumber + '</b></br>Thank you for submitting your Order to Edge. Please note down the above order number for your own records.</br>An Invoice will be generated for this Order and sent to you, Once the Invoice is Paid the Order will be actioned by our team</br>In case of any queries regarding this Order, please contact Edge Pty Ltd Support on (03) 8391 3226 or email <a href = "mailto: production@edgepri.com">production@edgepri.com</a>.';
    
    var html = '<div id="ordernumber_notification" >' + content + '</div>';
    
        $("#ordernumber").closest(".control").after(html);
    
        $('#ordernumber_notification').show();
    
        $("#NextButton").hide();
    
        $("#ordernumber").hide();
    
        $("#ordernumber_label").hide();
    
    
    
    }
    