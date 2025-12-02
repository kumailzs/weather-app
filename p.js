async function weather(v1,v2){
  let resp = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${v1}&longitude=${v2}&localityLanguage=en`);
  let data = await resp.json()
  let {latitude:lat,longitude:log,city,countryName:country}=data
  console.log(lat,city);
}
weather(67,28)


