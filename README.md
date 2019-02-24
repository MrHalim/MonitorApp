# MonitorApp
Temperature monitor using Raspberry Pi, nodejs, express, Mysql to store data and Passport for authentication.

Here is my experiment on reading the temperature and humidity from Raspberry pi and push it on WebServer using express.
<div>
<h1>To start you need following </h1>
<ul>
  <li>Raspberry Pi 3 Model B</li>
  <li>Class 10 16/32 GB memory card & adaptor</li>
  <li>DHT11/22 temperature and humidity sensor</li>
  <li>male-female jumper wires and a breadboard</li>
<ul>
</div>
<div>
<h3> Install node and library in Pi</h3>
  
<p>You should know the ARM version of your pi, to know the type</p>
<ul>
<li>uname -a </li>
<li>mine is armv71 </li>
<ul>
</div>
<div>
<p>Get the respective arm version of nodejs url. Download the same an install in your Pi using following command.<p>

<blockquote >wget <a href="https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-armv7l.tar.xz" data-href="https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-armv7l.tar.xz" rel="nofollow noopener" target="_blank">https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-armv7l.tar.xz</a><br>tar -xzf node-v10.15.1-linux-armv7l.tar.xz<br>cd node-v10.15.1-linux-armv7l&nbsp;<br>sudo cp -R * /usr/local/</blockquote>
</div>
<p name="bd46" id="bd46" class="graf graf--p graf-after--blockquote">Now verify the node and npm version using following command</p>
<div>
<blockquote>node -v<br>npm --version</blockquote>
</div>
<div>
<blockquote>wget <a href="http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz" data-href="http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz" class="markup--anchor markup--blockquote-anchor" rel="nofollow noopener" target="_blank">http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz</a><br>tar zxvf bcm2835–1.46.tar.gz<br>cd bcm2835–1.46<br>./configure<br>make<br>sudo make check<br>sudo make install<br>sudo npm i node-dht-sensor</blockquote>
</div>
<div>
  <p> After setting up everything, it comes the moment to start</p>
  <p>Clone and download code from https://github.com/MrHalim/MonitorApp</p>
</div>
<div>
<h3> Setting up the database </h3>
  <p> In this app i use Mysql to store data from DHT11 Sensor </p>
  <p> There is a file on model directory that contain requirement to create database and other tables "createdbandtable.txt"</p>
 </div>
<div>
  <p> Finnaly Restart your web app and access url, you will see the result </p>
 </div>
