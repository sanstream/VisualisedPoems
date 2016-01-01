# VisualisedPoems
A collection of visualised poems including a webapp to do it your self.

# Notes to copyrights
This project contains poetry by several other authors and I do not claim ownership or make any kind of money from their work (this is a free of charge web-app). If however you represent the author in any legal way and wish for me to remove their work from this app please let me know via sanstream@gmail.com and I will remove their work as soon as possible.

#Notes for installation
Install all the dependencies for the web-app *inside* the web-app with the command
```
npm install
```
After that build bundle.js by executing:
```
browserify coloured-prose.js -o bundle.js
```
This makes all the node.js code for `ColouredProse` available client-side.

Install all the dependencies for the node-app *inside* the web-app with the command
```
npm install
```
Put the source files in the `sources` folder and just run the program
```
node main.js
```
The output is returned in JSON format in the `output` folder.
