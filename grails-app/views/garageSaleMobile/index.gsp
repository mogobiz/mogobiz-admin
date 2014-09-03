<%@ page contentType="text/html;charset=UTF-8"%>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>Garage Sale</title>
	<script type="text/javascript">
	<!--
	function getHTTPParameter(nomParam)
	{
		var chaineParam = document.location.search;
		if (chaineParam != null && chaineParam.length > 0)
		{
			chaineParam = chaineParam.substring(1);
			var tableauNomValeur = chaineParam.split("&");
			for (var i = 0; i < tableauNomValeur.length; i++)
			{
				var nomValeur = tableauNomValeur[i].split("=");
				if (nomValeur[0] == nomParam)
				{
					return decodeURI(nomValeur[1]);
				}
			}
		}
		return "";
	}

    function updateToken(){
        try{
          var error = getHTTPParameter('error');
          var accessToken = getHTTPParameter('accessToken');
          var dstWindow = opener?opener:window.parent;
          if(dstWindow){
	          dstWindow.postMessage({accessToken:accessToken, error:error}, '*');
			  if(opener){
				self.close();
			  }
          }
        }
        catch(e){
            alert(e);
        }
    }
	//-->
    </script>
  </head>
<body onload="updateToken();">
</body>
</html>
