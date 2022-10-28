// const 	itemList = [],
// 		classIds = [];

// const steamId = "76561198113138706";

// async function getSteamData() {
// 	try {

// 		let response = await fetch(`https://steamcommunity.com/profiles/${steamId}/inventory/json/730/2`, {
// 			method: 'GET',
// 			headers: {
// 				accept: 'application/json',
// 			},
// 		});
		
// 		if (!response.ok) {
// 			throw new Error(`Error! Status: ${response.status}`);
// 		}
// 		let data = await response.json();
// 		console.log(data);
// 	} catch(err) {
// 		console.log(err);
// 	}
// }

// getSteamData();



// axios.get(`http://steamcommunity.com/profiles/${steamId}/inventory/json/730/2`).then((response) => {

// 	for (const [key, value] of Object.entries(response.data.rgInventory)) {
// 		classIds.push(value.classid);
// 	}

// 	for (const [key, value] of Object.entries(response.data.rgDescriptions)) {
// 		let nameCheck = value.name;
// 		nameCheck = nameCheck.replace(/\s/g,"%20");
// 		nameCheck = nameCheck.replace("(","%28");
// 		nameCheck = nameCheck.replace(")","%29");
// 		itemList.push({name: nameCheck, classId: value.classid, quantity: 0});
// 	}

// 	for (const id of classIds) {
// 		for (const item of itemList) {
// 			if (item.classId == id) {
// 				item.quantity++;
// 			}
// 		}
// 	}
// 	// for (const item of itemList) {
// 	// 	console.log(`Name: ${item.name}, Quantity: ${item.quantity}`);
// 	// }
	
// }).then(() => {
// 	console.log(itemList);
	
// 	for (const item of itemList) {
// 		console.log(`Name: ${item.name}, Quantity: ${item.quantity}`);
// 	}
// })
