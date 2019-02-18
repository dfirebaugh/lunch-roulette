<?php
  $lat = $_POST['lat'];
  $lon = $_POST['lon'];

  // building url to fetch
  $baseurl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=';
  $key = getenv('API_KEY');
  $location = "&location=" . $lat . "," . $lon;
  $radius = '&radius=3000&type=restaurant';
  $url = $baseurl . $key . $location . $radius;

  //Use file_get_contents to GET the URL in question.
  $contents = file_get_contents($url);
  
  //If $contents is not a boolean FALSE value.
  if($contents !== false){
      //Print out the contents.
      echo $contents;
  }
?>