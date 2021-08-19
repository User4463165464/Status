function ajax_parseRecords(xml,uiddiv) {
	var opttypes = document.getElementById(uiddiv);
	record = xml.getElementsByTagName("record");
		
	ID = new Array();
	nazwa = new Array();
		
	for (i = 0; i < record.length; i++) {
		nazwa[i] = record[i].childNodes[1].childNodes[0].nodeValue;
		ID[i] = record[i].childNodes[0].childNodes[0].nodeValue;
	}
	
	for (i = opttypes.options.length-1; i >= 0; i--) {
		opttypes.remove(i);
	}

	for(i = 0; i < nazwa.length; i++) {		
		opttypes.options[i] = new Option(nazwa[i],ID[i]);
	}
}

function ajax_selectbox_load(url,uiddiv) {
	advAJAX.get({
	    url : url,
	    onSuccess : function(obj) {	   
	    	ajax_parseRecords(obj.responseXML,uiddiv);	    
	    }
	});
}
 
function ajax_selectbox_id(pole,url,uiddiv) {
	if (pole) {
		ajax_selectbox_load(url+pole,uiddiv);	
	}
}

function ajax_register_check_field(serwis,funkcja,id,sprawdz,pole) {	

	advAJAX.post({
	    url : "/"+serwis+"/"+funkcja+"/"+id+",check.html",
	    mimeType: 'text/plain',
	    parameters : {
	      "sprawdz" : sprawdz
	    },	    
	    onSuccess : function(obj) {	    
	    	document.getElementById(pole).innerHTML = obj.responseText;
	    }
	});
}	

function ajax_go_to(url,div,pastcontent,load,initf) {

	if (!url) {
		return true;
	}

	if (!document.getElementById(div)) {
		return true;
	}

	pastcontent = (pastcontent) ? document.getElementById(div).innerHTML : '';
	load = (load) ? load : 1;
	initf = (initf) ? 0 : 1;

	advAJAX.get({
		url : url,
		timeout : 6000,
		retry: 2,
		retryDelay: 2000,
		mimeType: 'text/plain',
		onTimeout : function() { 
			document.getElementById(div).innerHTML = '<div class="ajaxloading"><img src="/img/ajax/loading' + load + '.gif" style="vertical-align:middle;"> brak połączenia </div>'+pastcontent;
		},
		onRetry : function() { 
			document.getElementById(div).innerHTML = '<div class="ajaxloading"><img src="/img/ajax/loading' + load + '.gif" style="vertical-align:middle;"> ponawiam połączenie ...</div>'+pastcontent;
		},
		onRetryDelay : function() { 
			document.getElementById(div).innerHTML = '<div class="ajaxloading"><img src="/img/ajax/loading' + load + '.gif" style="vertical-align:middle;"> oczekuje na ponowienie połączenia ...</div>'+pastcontent; 
		},		
		onLoading : function(obj) {
			document.getElementById(div).innerHTML = '<div class="ajaxloading"><img src="/img/ajax/loading' + load + '.gif" style="vertical-align:middle;"> pobieranie danych ...</div>'+pastcontent;
		},
		onSuccess : function(obj) { 
			document.getElementById(div).innerHTML = obj.responseText;
			if (initf) {
			
        			ajax_init();
     			}
		},
		onError : function(obj) {
			alert("Error: " + obj.status);
		}
	});
	return false;
}


// KURSY
function przenies_do(uiddiv) {
	var link = document.getElementById(uiddiv);
	if (link.value) {
		location.href=link.value;
	}
	return false;
}

