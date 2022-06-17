#include "DHT.h"

#define DHTPIN 53
#define DHTTYPE DHT11
#define heaterPin 30
#define humidifierPin 22
#define fanPin 23
String hour = "";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  //Serial.begin(115200);

  pinMode(heaterPin, OUTPUT);
  digitalWrite(heaterPin, LOW);
  pinMode(humidifierPin, OUTPUT);
  pinMode(fanPin, OUTPUT);
  dht.begin();
}

void loop() {
  int temp = dht.readTemperature();
  int humid = dht.readHumidity();
  delay(500); 
  Serial.print(temp);
  Serial.print(",");
  Serial.print(humid);
  Serial.println();

  if (temp < 10) {
    digitalWrite(heaterPin, HIGH);
  }
  else if (temp > 13) {
    digitalWrite(heaterPin, LOW);
  }
  else if (temp > 30) {
    digitalWrite(fanPin, HIGH); 
  }
  if (humid > 77) {
    digitalWrite(fanPin, HIGH);
  } else if (humid < 68) {
    digitalWrite(fanPin, LOW);
  }
  //delay(120000);
  delay(5000);
}
