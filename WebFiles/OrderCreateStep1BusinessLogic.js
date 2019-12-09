function OrderCreateStep1BusinessLogic() {  
 
    var status = $("#statuscode_EntityStatus").val();
    if(status == "690360009") //If Order=submitted
    {
    location.href="/view-order/?id="+getURLParam("id");
    }
    else
    {
    $("#new_isportalorder_1").prop("checked", true); //Sets isPortal Order = Yes, to set to true use - $("#new_isportalorder_0").prop("checked", true);
    //$("#WebFormPanel").show();
     var ccampaign_id = 0;
     var cmap_id = 0;
     var cmap_name;
     //insertExitOrder();
    
     GetCampaign(function(result){
    ccampaign_id = result[0].cid;
    });
    
      if(ccampaign_id == 0){
            alert("No 'Portal Orders General' Campaign Found for this client");
        }else{
                //Set Campaign
                $("#cent_clientcampaign").val(ccampaign_id); 
                $("#cent_clientcampaign_name").val("Portal Orders General");
                $("#cent_clientcampaign_entityname").val("cent_clientcampaign");
    }
    
    //Set Default values
    $("#cent_isrecipientdelivery").val(690360001); //Is Recipient Delivery = Yes
    $("#name").val("Portal Order");
    $("#cent_iscatorder_0").prop("checked", true); //Sets isCAT Order = No, to set to true use - $("#cent_iscatorder_1").prop("checked", true);
    $("#cent_cardorderpaymenttype").val(690360001); //Payment Type = Pre-Paid
    
    //Set currency = AUD
    $("#transactioncurrencyid").val("A9F1320B-98EA-E511-80DB-C4346BC4BEF0");
    $("#transactioncurrencyid_name").val("Australian Dollar");
    $("#transactioncurrencyid_entityname").val("transactioncurrency");
    
    //Set Price List = Swap Cards
    //$("#pricelevelid").val("E7EDCEF2-B4EB-E911-A812-000D3AD199E2"); 7F22796F-0B0C-EA11-A811-000D3AD1C8FB
    //$("#pricelevelid_name").val("Swap Cards");
    //$("#pricelevelid_entityname").val("pricelevel");
    
    //Set Price List = SwitchIt Gift Cards
    $("#pricelevelid").val("7F22796F-0B0C-EA11-A811-000D3AD1C8FB"); 
    $("#pricelevelid_name").val("SwitchIt Gift Cards");
    $("#pricelevelid_entityname").val("pricelevel");
    
    //Set Owner
    $("#ownerid").val("F89560B1-ECBE-E911-A97B-000D3AD1C904"); 
    $("#ownerid_name").val("Onkar Yadav");
    $("#ownerid_entityname").val("contact");
    
    
    //Set Recipient Map = Portal Recipient Map
    GetRecipientMap(function(result){
    cmap_id = result[0].mapid;
    cmap_name = result[0].mapname;
    });
    
      if(cmap_id == 0){
            alert("No 'Portal Order Recipients' Map Found for this client");
        }else{
                //Set Recipient Map on the Order
                $("#cent_recipientmap").val(cmap_id); 
                $("#cent_recipientmap_name").val(cmap_name);
                $("#cent_recipientmap_entityname").val("cent_deliveryrecipientfilemapping");
    }
    
    
    $("#cent_ordertype").hide();
    $("#cent_ordertype_label").hide();
    
    $("#cent_jobid").closest("tr").hide();
    $("#cent_jobid_label").closest("tr").hide();
    
    $("#cent_ordersubmitteddate").hide();
    $("#cent_ordersubmitteddate_label").hide();
    
    $("#customerid").closest("tr").hide();
    $("#cent_contactlp").closest("tr").hide();
    
    $("#statuscode").hide();
    $("#statuscode_label").hide();
    
    $("#cent_clientcampaign").closest("tr").hide();
    $("#cent_clientcampaign_label").closest("tr").hide();
    
    $("#cent_recipientmap").closest("tr").hide();
    $("#cent_recipientmap_label").closest("tr").hide();
    
    $("#cent_cardorderpaymenttype").closest("tr").hide();
    $("#cent_cardorderpaymenttype_label").closest("tr").hide();
    
    //$("#cent_cardorderpaymenttype").hide();
    //$("#cent_cardorderpaymenttype_label").hide();
    
    //$("#customerid").hide();
    //$("#customerid_label").hide();
    
    //$("#cent_contactlp").hide();
    //$("#cent_contactlp_label").hide();
    
    $("#pricelevelid").closest("tr").hide();
    
    $("#transactioncurrencyid").closest("tr").hide();
    
    $("#ordernumber").hide();
    $("#ordernumber_label").hide();
     
    $("#name").hide();
    $("#name_label").hide();
    
    $("#new_isportalorder").hide();
    $("#new_isportalorder_label").hide();
    
    $("#cent_iscatorder").hide();
    $("#cent_iscatorder_label").hide();
    
    $("#cent_submitted").hide();
    $("#cent_submitted_label").hide();
    
    $("#cent_sendtoproduction").hide();
    $("#cent_sendtoproduction_label").hide();
    
    $("#cent_productionordersent").hide();
    $("#cent_productionordersent_label").hide();
    
    $("#cent_isrecipientdelivery").hide();
    $("#cent_isrecipientdelivery_label").hide();
    
    $("#cent_variablevaluesrdo").hide();
    $("#cent_variablevaluesrdo_label").hide();
    
    //$("#cent_float").closest("tr").hide();
    
    $("#description").hide();
    
    //Set Float field visibility OnLoad event, show if it doesn't have value, else hide it.
    if ($("#cent_float").val() === "" )
    {
       $("#cent_float").closest("tr").hide();
    }
    else
    {
        $("#cent_float").closest("tr").show();
    }
    
    
    ////Set Float field visibility OnChange event
    //$("#cent_cardorderpaymenttype").change(SetFloatVisibilityOnChange);
    //
    //function SetFloatVisibilityOnChange() {
    // if ($("#cent_cardorderpaymenttype").val() === "690360000" ) //If = FLOAT
    // {
    //    $("#cent_float").closest("tr").show();
    // }
    // else
    // {
    //   $("#cent_float").closest("tr").hide();
     //}
    //}
    }
    function insertExitOrder()
    {
    $("#NextButton").parent("div").before("<div role='group' class='btn-group entity-action-button'><button type='button' class='btn btn-primary button next submit-btn' onclick='exitOrder();'>Save &amp; Exit Order</button></div>");
    
    }
    
    function exitOrder()
    {
    alert('This Order Will Be Saved For 7 days and then Deleted Automatically. You can resume the order by going to Order List');
    window.location.href = "~/orders-list";
    }
    
    //Fetch Client Campaign
    function GetCampaign(callback){
        $.ajax({
          type: "GET",      
          datatype: 'json',
          url: "/getclientcampaign/",
          async: false,
          beforeSend: function (xhr) {
              request = xhr;
          },
           success: callback,
           error: function(){console.log("Error");},
          });
    }
    
    //Fetch Client Recipient Map
    function GetRecipientMap(callback){
        $.ajax({
          type: "GET",      
          datatype: 'json',
          url: "/getrecipientmap/",
          async: false,
          beforeSend: function (xhr) {
              request = xhr;
          },
           success: callback,
           error: function(){console.log("Error");},
          });
    }
    
    
    
    //Validate Dispatch Date(Way to trigger OnChange event for Date Fields is different, as below) 
    
    $("#requestdeliveryby").parent("div.control").on("dp.change",ValidateDispatchDate);
    
    }
    
    function ValidateDispatchDate()
    {
    var deliveryDate = $("[aria-labelledby=requestdeliveryby_label]").val();
    if(deliveryDate == null || deliveryDate == "")
    return;
    
     var today = new Date();
     var curr_day = today.getDate();
     var curr_month = today.getMonth() + 1;
     var curr_year = today.getFullYear();
    
     //var todayformatted = (curr_month + "/" + curr_day + "/" + curr_year);
    
     var ddate = $("#requestdeliveryby").val();
    var dDateLocal = new Date(ddate);
    
    //var ddateformatted = ddate.substring(5,7)+'/'+ddate.substring(8,10)+'/'+ddate.substring(0,4);
    
    if (dDateLocal <= today)
     {    
        alert("Dispatch Date should be greater than today's date");
        $("[aria-labelledby=requestdeliveryby_label]").val("");
     } 
    
    }