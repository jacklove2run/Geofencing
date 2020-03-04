<?php
$servername = "localhost";
$user = "root";
$pwd = "hhpPfkuF3ApfdD7z";
$db = "my_project";
 
// Create connection
$conn = new mysqli($host, $user, $pwd, $db);
// Check connection
if ($conn->connect_error) {
    die("connection failed: " . $conn->connect_error);
} 
$today = strtotime('today');
$sql = "SELECT count(*) as total, count(distinct(deviceId)) as dint FROM t_geofencing_report where create_time > {$today}";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    $ret = $result->fetch_assoc();
    $total = isset($ret['total']) ? $ret['total'] : 0;
    $dint = isset($ret['dint']) ? $ret['dint'] : 0;
 } else {
    $total = $dint = 0;
    echo "Query Failed!";
 }
$conn->close();
?>

<h2>GeoFencing Device Report Statistics</h2>
<h3>Total Report Count: <?= $total ?><h3>
<h3>Total Device Count: <?= $dint ?><h3>