$(document).ready(function () {

	var zonee=Zone()
	var coo=Cookie()
	HousesRequest(coo,zonee)
	if(zonee==undefined){window.location.href="./"}
})

	
function Cookie (){
	var Cookiess= $.cookie('e');
	return Cookiess;
}	

function Zone(){
	$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + `=([^&#]'*)`).exec(window.location.href)
		if(results !=null){
		return results[1] || 0
		}
	}
	var Zone = $.urlParam('zone')
	return Zone
}

function HousesRequest(Cookiess,Zone){
	var housestable=$('#HousesTable')
	var rows=''

	if(Cookiess!=null){

		$.ajax({
			url:"http://127.0.0.1:3030/housesfind",
			type:"get",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookiess+""
			},
			data:{
				"zone":Zone
			},
			success:function(data){
				housestable.html('')
				$.each(data,(k,v)=>{
					rows+=`<button type="button" class="btn btn-secondary btn-house" onclick="HouseInfo('${v._id}')">${v.HouseName}</button>`
				})
				housestable.html(rows)
			}
		})

	}
}

function addhouse(){
	var addhousebtn=$('#addhousebtn'),
	HouseName=$('#inputhousename').val(),
	address=$('#inputaddress').val(),
	coordinates=$('#inputCoordinates').val(),
	road=$('#inputroad').val(),
	zone=Zone(),
	cookie=Cookie(),
	rows=''

	if (cookie!=null) {

		$.ajax({
			url:"http://127.0.0.1:3030/houseadd",
			type:"POST",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+cookie
			},
			data:{
				'HouseName':HouseName,
				'HouseZone':zone,
				'address':address,
				'coordinates':coordinates,
				'road':road
			},
			success:function(data){
				location.reload()
			}
		})
	}
}
function deletehouse(){
	window.location='./housedelete.html?zone='+Zone()
}
function HouseInfo(e){
	window.location='../houseinfo.html?id='+e
}
$('#r-houses').click(()=>{
	var zone = Zone();
	$.ajax({
		url:'http://127.0.0.1:3030/reportzone',
		type:'get',
		headers:{
			'Content-Type':'application/x-www-form-urencoded',
			'Authorization':'Bearer '+Cookie()
		},data:{'zone':zone},
		xhrFields: {
		   responseType: 'blob'
		},
		success:function(data){
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(data);
			a.href = url;
			a.download = 'pdf.pdf';
			a.click();
			window.URL.revokeObjectURL(url);
		}
	})
});
$('#r-priority').click(function(){
	let sex = $('#r-sex option:selected').val(),
	priority = $('#r-option-priority option:selected').val();

	$.ajax({
		url:'http://127.0.0.1:3030/reportpriority',
		type:'get',
		headers:{
			'Content-Type':'application/x-www-form-urencoded',
			'Authorization':'Bearer '+Cookie()
		},data:{zone:Zone(),sex:sex,priority:priority},
		xhrFields: {
		   responseType: 'blob'
		},
		success:function(data){
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(data);
			a.href = url;
			a.download = 'pdf.pdf';
			a.click();
			window.URL.revokeObjectURL(url);
		}
	});
});