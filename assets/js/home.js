$(document).ready(function() { 
    let count=document.querySelectorAll('input[type="checkbox"]:checked').length;

    //if originally checkbox was checked
    if($('input[type=checkbox]').is(":checked")){
        $('input[type=checkbox]').closest("li").find(".d-calender")
        .css({"text-decoration": "line-through"});
    }

    //if checkbox is clicked
    $(".check").click(function() { 
          
        if($(this).is(":checked")){
            
            count++;
            
            //line through to date
            $(this).closest("li").find(".d-calender")
            .css({"text-decoration": "line-through"});


            let message= $(this).closest("label").find("span").text()+" - checked!!";
            toastSuccess(message);


        }
        else if($(this).is(":not(:checked)")){

            count--;
         
            //remove line through from date
            $(this).closest("li").find(".d-calender")
         .css({"text-decoration": "none"});

        
             
        let message= $(this).closest("label").find("span").text()+" - unchecked!!";
        toastError(message);
        


        }

                    
        
    }); 

    $(".d-delete").click(function(){

        let message = "Task Deleted!!";
        toastSuccess(message);

       

    }); 

    $("#btn2").click(function(){

        if(count>0)
        {
            
            let message = "Tasks Deleted!!";
             toastSuccess(message);
    
            $('#toast').text("Tasks Deleted!!");
    
           
        }
        else{
  
            let message = "Mark task as checked to delete!!";
            toastError(message);
           
        }

      


    });

    $("#btn1").click(function(){
       
        var str1 = $("#description").val();
        var str2 = $("#category option:selected").val();

        if(str1=="" || str2=="")
        {
           
            let message = "Task cannot be added";
            toastError(message);
                       
        }
        else
        {          
            let message = "Task Added!!";
              toastSuccess(message);
               
        }
                  
        
    });

    //successfull toast message
    function toastSuccess(msg){
        $('#toast').removeClass('toast-error');
        $('#toast').addClass('toast-success');

        $('#toast').css({"display":"block"});
        $('#toast').text(msg);

        setTimeout(() => {
                $('#toast').css({"display":"none"});
              }, 2000)
    }

    //unsuccessful toast message
    function toastError(msg)
    {
        $('#toast').removeClass('toast-success');
            $('#toast').addClass('toast-error');
            
            $('#toast').css({"display":"block"});
       
            $('#toast').text(msg);

            setTimeout(() => {
                $('#toast').css({"display":"none"});
              }, 2000)

    }

   
    

}); 
