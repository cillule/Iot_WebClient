# Iot_WebClient

### Installation

Installer la partie [web service][df1] sur un serveur Apache.

Remplacer l'adresse par défault par l'adresse de votre serveur sur les fichiers:
  - /js/messageGraph.js (ligne 34) 
    ```js
    function loadGraph() {
      var jqxhr = $.getJSON("http://(yourServerURL)/index.php/api/messages", function (data) {
    ```
    
  - /js/messageForm.js (ligne 22)
    ```js
        //make POST request 
        var jqxhr = $.post("http://(yourServerURL)/index.php/api/message", jsonDataToSend, function () {
        })
    ```
  
  

Ouvrer ensuite le fichier index.html dans un navigateur

[df1]: <https://github.com/cillule/Iot_WebServer>
