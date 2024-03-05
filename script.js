async function getCountryTimezone(countryCode) {
  const response = await fetch(
    `http://api.timezonedb.com/v2.1/list-time-zone?key=X87VM5VMQLAN&format=json&country=${countryCode}`
  );
  const data = await response.json();
  return data.zones[0].zoneName;
}

async function krData() {
  try {
    strana_str = document.getElementById("strana_str").value;
    const response = await fetch(
      `http://de1.api.radio-browser.info/json/stations/bycountry/${strana_str}`
    );
    const json = await response.json();

    let maxClickCount = Math.max(...json.map((item) => item.clickcount));
    let station = json.find((item) => item.clickcount === maxClickCount);
    console.log(station);
    console.log(station.name);
    console.log(maxClickCount);

    if (station) {
      let win = window.open(station.homepage);
      const timezone = await getCountryTimezone(station.countrycode);
      document.getElementById(
        "timezone"
      ).innerText = `Временной пояс выбранной страны: ${timezone}`;
    }
  } catch (err) {
    alert("Ошибка!");
    console.log(err);
  }
}
