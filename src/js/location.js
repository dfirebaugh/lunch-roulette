//getLocation();

// $("#launch-button").click(function())
// $.ajax({})

//("#launch-button").onclick = getLocation;

document.getElementById('launch-button').addEventListener('click', getLocation)

function getLocation() {
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  }
  console.log('Attempting to get your Location...')

  getPosition()
    .then((position) => {
      let location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      const formData = new FormData();
      formData.append('lat', location.lat);
      formData.append('lon', location.lon);

      fetch('/getPlaces.php', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
          const dollar = "$";
          const place = data.results[
            Math.floor(Math.random() * data.results.length)]

          console.log('data: ', data.results)
          console.log('location: ', location)
          console.log("place: ", place)

          document.getElementById('lunchbox').innerHTML = `
          <div>
            <div>
              <h2>
                ${place.name}
              </h2>
              <p>${place.vicinity}</p>
              ${place.rating !== undefined && `<p> rating: ${place.rating} </p>`}
              ${place.user_ratings_total !== undefined && `<p>total ratings: ${place.user_ratings_total}</p>`}
              ${place.price_level && `<p>price level: ${dollar.repeat(place.price_level)}</p>`}
          </div>`;
        })
    })
    .catch((err) => {
      console.error(err.message);
      alert(err.message);
    });
}
