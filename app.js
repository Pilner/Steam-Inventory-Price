import { fetch } from "undici";
import express from "express";

console.clear();

const	app		= express(),
		port	= process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const steamId = "76561198113138706";

const timer = ms => new Promise(res => setTimeout(res, ms))

async function getSteamJSON() {
	try {

		let response = await fetch(`http://steamcommunity.com/profiles/${steamId}/inventory/json/730/2`);
		
		if (!response.ok) {
			throw new Error(`Error! Status: ${response.status}`);
		}
		let data = await response.json();
		return data;

	} catch(err) {
		console.log(err)
	}
}

const	steamData	= await getSteamJSON(),
		itemList	= [],
		classIds	= [];

for (const [key, value] of Object.entries(steamData.rgInventory)) {
	classIds.push(value.classid);
}

for (const [key, value] of Object.entries(steamData.rgDescriptions)) {
	let nameCheck = value.market_hash_name;
	nameCheck = nameCheck.replace(/\s/g,"%20");
	nameCheck = nameCheck.replaceAll("(","%28");
	nameCheck = nameCheck.replaceAll(")","%29");
	nameCheck = nameCheck.replaceAll("|", "%7C");
	itemList.push({
		name: value.name,
		nameMarket: nameCheck,
		classId: value.classid,
		quantity: 0
	});
}

for (const id of classIds) {
	for (const item of itemList) {
		if (item.classId == id) {
			item.quantity++;
		}
	}
}

const chunkSize = 10;
const itemListChunks = [];

for (let i = 0; i < itemList.length; i += chunkSize) {
	const chunk = itemList.slice(i, i + chunkSize);
	itemListChunks.push(chunk);
}

async function getItemPrice(item) {
	const itemPriceLink = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=12&market_hash_name="
	let response = await fetch(itemPriceLink + item);
	let data = await response.json();

	return data;
}

// console.log(itemListChunks)

for (const item of itemListChunks) {
	for (let i = 0; i < itemList.length; i++) {
			let marketPriceData = await getItemPrice(itemList[i].nameMarket);
			console.log(itemList[i].nameMarket);
			console.log(marketPriceData);

			itemList[i].price = marketPriceData.lowest_price;

	}
	timer(12000);
}

// for (let i = 0; i < itemList.length; i++) {
// 	let marketPriceData = await getItemPrice(itemList[i].nameMarket);
// 	console.log(itemList[i].nameMarket);
// 	console.log(marketPriceData);
// 	if (i % 30 == 0) {
// 		setTimeout(()=>{}, 10000);
// 	}
// }



// for (const item of itemList) {
// 	let marketPriceData = await getItemPrice(item.nameMarket);
// 	console.log(item.nameMarket);
// 	console.log(marketPriceData);

// 	// if (!("lowest_price" in marketPriceData)) {
// 	// 	marketPriceData.lowest_price = "Not Sellable";
// 	// }

// 	// item.price = marketPriceData.lowest_price;
	
// }

// console.log("-------------------");
// for (const item of itemList) {
// 	console.log(`Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`);
// }


// ROUTE
// app.get("/", (req, res) => {
// 	res.render("home"),
// 	{
// 		itemList: itemList
// 	}
// });

// app.get("*", (req, res) => {
// 	res.render("errorpage");
// })

// // LISTEN
// app.listen(port, () => {
// 	console.log(`Server starting on port ${port}`);
// })