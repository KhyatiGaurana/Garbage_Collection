#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "FK14_2.4G";
const char* pass = "1223334444";
String serverName = "https://api.thingspeak.com/update?api_key=XHDFD5B1G778IG3W&field1=0";

unsigned long lastTime=0;
unsigned timeDelay = 1000;
void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid,pass);
  while(WiFi.status() != WL_CONNECTED){
    Serial.println("Connecting...");
    delay(1000);
  }
  Serial.println("Wifi connected!");
}
void sendData(String url) { 
  HTTPClient http;
  http.begin(url);
  int httpResponse = http.GET();
  Serial.print("Sending URL:");
  Serial.println(url);
  Serial.print("Response:");
  Serial.println(httpResponse);
  http.end();
}
void loop() {

  if(millis()-lastTime>timeDelay){
    if(!Serial.available()){
      Serial.println("no data");
    }
    else if(WiFi.status()==WL_CONNECTED && Serial.available()){
        String data = Serial.readStringUntil('\n');
        Serial.print("Received: ");
        Serial.println(data); 

        // indexes of positions of comma
        int pos1 = data.indexOf(',');
        int pos2 = data.indexOf(',', pos1 + 1);
        int pos3 = data.indexOf(',', pos2 + 1);

        // dividing the data into different parameters
        String distance = data.substring(0,pos1);
        String latitude = data.substring(pos1+1,pos2);
        String longitude = data.substring(pos2+1,pos3);
        String airValue = data.substring(pos3+1);

        // trim to avoid errors;
        distance.trim();
        latitude.trim();
        longitude.trim();
        airValue.trim();
        String url = serverName + "&field1=" + distance + "&field2=" + airValue + "&field3=" + latitude + "&field4=" + longitude;
        sendData(url);
        Serial.println("Complete Data uploaded to ThinkSpeak!");
    }
    else{
      Serial.println("not connected");
    }
    lastTime=millis();
  }
}





