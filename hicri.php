<?php
header('Content-Type: text/plain; charset=UTF-8');

$url = 'https://gadget.turktakvim.com/gadget.php?pg=1&sid=5753&cityID=5753&_=' . time();
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$content = curl_exec($ch);
curl_close($ch);

preg_match('/<div[^>]*id=["\']hicritarih["\'][^>]*>(.*?)<\/div>/si', $content, $matches);
echo isset($matches[1]) ? trim($matches[1]) : '';
