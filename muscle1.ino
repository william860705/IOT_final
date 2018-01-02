#include <LWiFi.h>
#include <WiFiClient.h>
#include "MCS.h"

// Assign AP ssid / password here
#define _SSID "Yoweiii"
#define _KEY  "12345678"

// Assign device id / key of your test device
MCSDevice mcs("D8O0iJcD", "btkorKYrVufOkfNb");

// Assign channel id 
// The test device should have 2 channel
// the first channel should be "Controller" - "On/Off"
// the secord channel should be "Display" - "On/Off"
//MCSControllerOnOff led("your_channel1_id");
MCSDisplayInteger   remote("muscle_data");

 //#define LED_PIN 7

void setup() {
  // setup Serial output at 9600
  Serial.begin(9600);

  // setup LED/Button pin
  // pinMode(LED_PIN, OUTPUT);

  // setup Wifi connection
  while(WL_CONNECTED != WiFi.status())
  {
    Serial.print("WiFi.begin(");
    Serial.print(_SSID);
    Serial.print(",");
    Serial.print(_KEY);
    Serial.println(")...");
    WiFi.begin(_SSID, _KEY);
  }
  Serial.println("WiFi connected !!");

  // setup MCS connection
  //mcs.addChannel(led);
  mcs.addChannel(remote);
  while(!mcs.connected())
  {
    Serial.println("MCS.connect()...");
    mcs.connect();
  }
  Serial.println("MCS connected !!");

  // read LED value from MCS server
  
  // digitalWrite(LED_PIN, led.value() ? HIGH : LOW);
}

void loop() {
  // call process() to allow background processing, add timeout to avoid high cpu usage
  Serial.print("process(");
  Serial.print(millis());
  Serial.println(")");
  mcs.process(100);
  int sensorValue = analogRead(A2);
  
  Serial.println(sensorValue);
  if(!remote.set(sensorValue))
    Serial.print("zz")
  // updated flag will be cleared in process(), user must check it after process() call.
 
  
  
  
  
  // check if need to re-connect
  while(!mcs.connected())
  {
    Serial.println("re-connect to MCS...");
    mcs.connect();
    if(mcs.connected())
      Serial.println("MCS connected !!");
  }
}
