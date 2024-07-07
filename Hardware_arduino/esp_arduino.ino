#include <TinyGPS++.h>
#include <SoftwareSerial.h>

const int trigPin = 9;
const int echoPin = 10;
const int airQualityPin = A0;
const int airQualityDigitalPin = 2;
static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;
// The serial connection to the GPS device
SoftwareSerial GPS(RXPin, TXPin);


void setup() {
   Serial.begin(9600);
    GPS.begin(GPSBaud);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(13, OUTPUT);
    pinMode(airQualityPin, INPUT);
    pinMode(airQualityDigitalPin, INPUT);
}

void loop() {

  // Ultrasonic Sensor reading
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;
  double height = ((double)distance / 18.0)*100.0;
  Serial.print(height); // sending distance

  // Reading and sending gps data
  String lat = "25.616331";
  String lon = "75.032806";
  bool f=true;
  while (GPS.available() > 0){
    gps.encode(GPS.read());
    if (gps.location.isUpdated()){
      f=false;
      Serial.print(",");
      Serial.print(gps.location.lat(),6);
      Serial.print(",");
      Serial.print(gps.location.lng(),6);
    }
  }
  if(f){
    Serial.print(",");
    Serial.print(lat);
    Serial.print(",");
    Serial.print(lon);
  }
  
  // Reading and sending air quality data
  int airValue = analogRead(airQualityPin);
  int digitalValue = digitalRead(airQualityDigitalPin);
  double fAir = ((double)airValue)/500.0;
  if (airValue > 400) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  Serial.print(",");
  Serial.println(fAir); // Sending air value to serial port

  delay(3000);
}
