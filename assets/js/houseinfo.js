$(document).ready(function(){
	pagerequest()
})

function pagerequest(){
	var pTable = $('#priporitylist'),
	personsbtn = $('#personsbtn'),
	housename  = $('#housename'),
	houseaddress=$('#houseaddress'),
	pTabler='',
	personsbtnr='';

	$.ajax({

		url: "http://127.0.0.1:3030/personfind",
		type: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()
		},
		data: {
		    "houseid":houseid()
	  	},
	  	success:function(data){
			pTable.html(' ');
			personsbtn.html(' ');
			$.each(data,(k,v)=>{
				if(v.Priority=='1'){
					pTabler +=`	<tr>
	                            <td>${v.fullname}</td>
	                        	</tr>`
				}
			})
			$.each(data,(k,v)=>{
				personsbtnr +=`<button type="button" class="btn btn-secondary btn-block btn-house" data-toggle="modal" data-target="#infoperson" onclick="personsbutton('${v._id}')">${v.fullname}</button>`
			})
			personsbtnr +=`<button type="button" class="btn btn-success btn-block btn-house" data-toggle="modal" data-target="#addperson">add person</button>`;
			housename.append(data[0].houseid.HouseName)
			houseaddress.append(data[0].houseid.addresses.addressetxt)
			personsbtn.html(personsbtnr)
			if(pTabler==""||pTabler==undefined){
				pTabler =`	<tr>
								<td>empty</td>
							</tr>`
			}
			pTable.html(pTabler)

	  	},error:function(err){
			if(err){
				alert("Error");
				window.location.href="./";
			}
		}
	})
}

function personsbutton(buttonid){
	
	var view = $('#view-list-person'),
	btnvalue = $('#btn-value');
	view.html(' ');
	btnvalue.html(' ');
	var rows='',
	btnnn='';

	$.ajax({

		url: "http://127.0.0.1:3030/personrequest",
		type: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data: {
		    "personid":buttonid
	  	},
	  	success:function(data){
			if(Array.isArray(data) || Object.keys(data).length === 0){
				alert("Error");
				window.location.href="./";
			}else{
				rows += `<label class="control-label text-left" id="text_fullname">${data.fullname}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_nationality">${data.nationality}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_phonenummber">${data.phonenummber}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_deprtement">${data.departement}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_birthday">${data.birthday}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_tc">${data.tc}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_dateadd">${data.dateadd}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_sex">${data.sex}</label>`
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_Priority">${data.Priority}</label>`  			
				rows += `<br>`
				rows += `<label class="control-label text-left" id="text_note">${data.note}</label>`
				
				btnnn +=`<button type="button" class="btn btn-success btn-block" onclick="personupdate('${data._id}')">Add</button>`
				
				view.html(rows)
				btnvalue.html(btnnn)
			}
	  	}
	})
}

function changepersontext(){
	var 
	textfullname = $('#text_fullname').text(),
	textnationality = $('#text_nationality').text(),
	textphonenummber = $('#text_phonenummber').text(),
	textdeprtement = $('#text_deprtement').text(),
	textbirthday = $('#text_birthday').text(),
	texttc = $('#text_tc').text(),
	textsex = $('#text_sex').text(),
	textnote = $('#text_note').text(),
	textPriority = $('#text_Priority').text()

	$('#update_fullname').val(textfullname)	
	$('#update_nationality').val(textnationality)
	$('#update_phonenumber').val(textphonenummber)
	$('#update_department').val(textdeprtement)
	$('#update_birthday').val(textbirthday)
	$('#update_tc').val(texttc)
	$('#update_sex').val(textsex)
	$('#update_note').val(textnote)
	$('#update_priority').val(textPriority)	
}

function personupdate(id){
	
	var person = {
		_id:id,
		fullname:$('#update_fullname').val(),	
		nationality:$('#update_nationality').val(),
		phonenummber:$('#update_phonenumber').val(),
		departement:$('#update_department').val(),
		birthday:$('#update_birthday').val(),
		tc:$('#update_tc').val(),
		sex:$('#update_sex').val(),
		Priority:$('#update_priority').val(),	
		note:$('#update_note').val()
	}

	$.ajax({
		url:"http://127.0.0.1:3030/personupdate",
		method:"POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data:{"person":person},
		success:function(){
			location.reload();
		},error:function(err){
			alert("Error on update!");
		}
	})
}

function addperson(){

	var 
	fullname=$('#fullname-input').val(),
	nationality=$("#nationality-input").val(),
	phonenummber=$('#phonenummber-input').val(),
	birthday=$('#birthday-input').val(),
	tc=$('#tc-input').val(),
	sex=$('#sex-input option:selected').val(),
	note=$('#note-input').val(),
	_id=houseid(),
	departement=$('#deprtement-input').val()

$.ajax({
	url: "http://127.0.0.1:3030/personadd",
	type: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "fullname":fullname ,
	    "nationality":nationality ,
	    "phonenummber":phonenummber ,
	    "birthday":birthday,
	    "tc":tc ,
	    "sex":sex ,
	    "note":note ,
	    "_id":_id ,
	    "departement":departement 
  	},
  	success:function(data){
  		location.reload()
  	},error:function(e){
		alert("error!");
		window.location.href="./";
	}
})

}

function personsdeletetable(){
	var priority_table =$('#personsdeletetable')
	var rows=''

	$.ajax({
	url: "http://127.0.0.1:3030/personfind",
	method: "GET",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "houseid":houseid()
  	},
  	success:function(data){
		priority_table.html(' ')
		$.each(data,(k,v)=>{
				rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}">
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`

		})
		priority_table.html(rows)
  	}
	})

}

function persondelete(){
	event.preventDefault()

    var searchID = $("#personsdeletetable input:checkbox:checked").map(function(){
      	return $(this).val()
    }).get()

    $.ajax({
			url:"http://127.0.0.1:3030/delperson",
			type:"delete",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookie()+""
			},
			data:{
				"personid":searchID
			},
			success:function(data){
				location.reload()
			}
		})
}

function personspriority(){
	var priority_table =$('#personsprioritytable')
	var rows=''
	$.ajax({
	url: "http://127.0.0.1:3030/personfind",
	method: "GET",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "houseid":houseid()
  	},
  	success:function(data){
		priority_table.html(' ')
		$.each(data,(k,v)=>{
			console.log(v.Priority)
			if(v.Priority==1){
				rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}" checked>
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`
                }else{
                	rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}">
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`
                }
		})
		priority_table.html(rows)
  	}
})

}

function addpriority(){
	event.preventDefault()

    $("#personsprioritytable input:checkbox:checked").map(function(){
      	var z = $(this).val()
      	call(z,1)
    }).get()

    $("#personsprioritytable input:checkbox:not(:checked)").map(function(){
      	var y=$(this).val()
      	call (y,0)
    }).get()

function call(I,P){
	    $.ajax({
				url:"http://127.0.0.1:3030/addpersonpriority",
				type:"POST",
				headers:{
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": "Bearer "+Cookie()+""
				},
				data:{
					"personid":I,
					"priority":P
				},
				success:function(data){
					location.reload()
				}
		})
	}
}
$('#r-houseinfo').click(function(){
	$.ajax({
		url:'http://127.0.0.1:3030/reporthouse',
		type:'get',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'authorization':'Bearer '+Cookie()
		},data:{
			houseid:houseid()
		},xhrFields: {
		   responseType: 'blob'
		},success:function(data){
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(data);
			a.href = url;
			a.download = 'pdf.pdf';
			a.click();
			window.URL.revokeObjectURL(url);
		}
	});
});

function Cookie (){
	var Cookiess= $.cookie('e')
	return Cookiess
}	

function houseid(){

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	var houseid = urlParams.get('id')
	if(houseid==undefined){window.location.href="./"}
	return houseid.cleanup()
}

String.prototype.cleanup = function() {
   return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}