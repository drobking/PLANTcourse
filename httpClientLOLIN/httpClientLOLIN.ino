/**
   PostHTTPClient.ino

    Created on: 21.11.2016

*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

// Uncomment one of the lines below for whatever DHT sensor type you're using!
#define DHTTYPE DHT11 
uint8_t DHTPin = D8; 
uint8_t waterSensor=A0;
DHT dht(DHTPin, DHTTYPE);      
/* this can be run with an emulated server on host:
        cd esp8266-core-root-dir
        cd tests/host
        make ../../libraries/ESP8266WebServer/examples/PostServer/PostServer
        bin/PostServer/PostServer
   then put your PC's IP address in SERVER_IP below, port 9080 (instead of default 80):
*/
#define SERVER_IP "localhost" // PC address with emulation on host
//#define SERVER_IP "192.168.1.42"

#ifndef STASSID
#define STASSID "UKrtelecom_FF9797"
#define STAPSK  "Znk21_6L"
#endif

void setup() {

  Serial.begin(115200);
  
  pinMode(DHTPin, INPUT);

  dht.begin();
  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() {
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
   http.begin(client, "http://e21625e92728.ngrok.io/api/Plant/"); //HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    int Temperature = dht.readTemperature(); // Gets the values of the temperature
    int Humidity = dht.readHumidity(); // Gets the values of the humidity 
    int water=analogRead(waterSensor);
    String str="{ \"name\": \"qqqq\",\"humidity\": "+((String)Humidity)+",\"temperature\": "+((String)Temperature)+",\"humidityGras\": 99999,\"water\": "+((String)water)+"}";
    //String str1=",\"temperature\": "+Temperature;
    //String str2=",\"humidityGras\": 99999,\"water\": 9999}";
    //String res=str+str1+str2;
    Serial.print(str);
    //Serial.print(str1);
    //Serial.print(str2);
    //Serial.print(res);
    int httpCode = http.POST(str);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }

  delay(10000);
}
