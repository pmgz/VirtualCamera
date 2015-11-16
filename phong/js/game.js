var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });

var filter;
var sprite;

function preload() {

    game.load.shader('phong', 'assets/phong.frag');

}

function create() {

    filter = new Phaser.Filter(game, null, game.cache.getShader('phong'));
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];
    filter.uniforms.N = { type: '1f', value: 100.0 };
    filter.uniforms.Ka = { type: '1f', value: 0.2 };
    filter.uniforms.Kd = { type: '1f', value: 1 };
    filter.uniforms.Ks = { type: '1f', value: 1 };
    filter.uniforms.ambientColor = { type: '4f', value: { x: 0, y: 0, z: 0, w: 0 } };
    filter.uniforms.diffuseColor = { type: '4f', value: { x: 0, y: 0, z: 0, w: 0 } };
    filter.uniforms.specularColor = { type: '4f', value: { x: 0, y: 0, z: 0, w: 0 } };

}

function update() {

    var nValue = parseFloat(document.getElementById("nSlider").value);
    var kaValue = parseFloat(document.getElementById("kaSlider").value);
    var kdValue = parseFloat(document.getElementById("kdSlider").value);
    var ksValue = parseFloat(document.getElementById("ksSlider").value);
    var aColor = hexToRgb(document.getElementById("aColor").value);
    var dColor = hexToRgb(document.getElementById("dColor").value);
    var sColor = hexToRgb(document.getElementById("sColor").value);
    filter.uniforms.N.value = nValue;
    filter.uniforms.Ka.value = kaValue;
    filter.uniforms.Kd.value = kdValue;
    filter.uniforms.Ks.value = ksValue;
    filter.uniforms.ambientColor.value = { x: aColor.r/255, y: aColor.g/255, z: aColor.b/255, w: 1.0 };
    filter.uniforms.diffuseColor.value = { x: dColor.r/255, y: dColor.g/255, z: dColor.b/255, w: 1.0 };
    filter.uniforms.specularColor.value = { x: sColor.r/255, y: sColor.g/255, z: sColor.b/255, w: 1.0 };
    if (game.input.activePointer.isDown)
        filter.uniforms.mouse.value = { x: game.input.activePointer.position.x, y: game.height - game.input.activePointer.position.y };

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}