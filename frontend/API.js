
class API {

	publish(data) {
		return fetch("https://www.airlearn.me/publish",
			{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    method: 'POST',
			    body: JSON.stringify(data)
			})
			.then(function(res){ return res.json() })
			.catch(function(res){ return res.json() })
	}
}


export default API