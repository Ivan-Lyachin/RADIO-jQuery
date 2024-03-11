async function getCountryTimezone(countryCode) {
  try {
    const response = await $.getJSON(
      `http://api.timezonedb.com/v2.1/list-time-zone?key=X87VM5VMQLAN&format=json&country=${countryCode}`
    );
    return response.zones[0].zoneName;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching timezone data.");
  }
}

$(document).ready(function () {
  $.ajax({
    url: "https://restcountries.com/v3.1/all?fields=name",
    type: "GET",
    success: function (data) {
      var dataList = $("#countryList"); // найдем элемент datalist по id

      data.forEach(function (country) {
        var countryName = country.name.common;
        dataList.append("<option value='" + countryName + "'>");
      });
    },
  });
});
async function krData() {
  try {
    const strana_str = $("#strana_str").val();
    const response = await $.getJSON(
      `http://de1.api.radio-browser.info/json/stations/bycountry/${strana_str}`
    );
    const json = response;

    const maxClickCount = Math.max(...json.map((item) => item.clickcount));
    const station = json.find((item) => item.clickcount === maxClickCount);
    console.log(station);
    console.log(station.name);
    console.log(maxClickCount);

    if (station) {
      const win = window.open(station.homepage);
      const timezone = await getCountryTimezone(station.countrycode);
      $("#timezone").text(`Временной пояс выбранной страны: ${timezone}`);
    }
  } catch (err) {
    alert("Ошибка!");
    console.log(err);
  }
}
