#!/usr/bin/env node
const fs = require('fs');
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const processGltf = gltfPipeline.processGltf;
const options = {
    dracoOptions: {
        compressionLevel: 10
    }
}

var gltfArray = new Array();

if (process.argv.length <= 2) {
    console.log("Usage:\n\n \t user@local$: compressThisGltf <.path/to/gltfFiles.>\n\n Note:It will automatically create a folder /compressedFiles for output files.\n");
    process.exit(-1);
}

var path = process.argv[2];
//var path = "./gltf/";

var outputFolder = './compressedFiles/';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}
fs.readdirSync(path).forEach(file => {
    gltfArray.push(file)
});

gltfArray.forEach(x => {
    let gltf = fsExtra.readJsonSync(path + x);
    processGltf(gltf, options)
        .then(function (results) {
            console.log(x + " Dosyası sıkıştırılıyor...")
            fsExtra.writeJsonSync(outputFolder + x.split(".")[0] + '-compressed.gltf', results.gltf);
        });
})