/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Input = (function () {
        function Input(game) {
            this.cursors = game.input.keyboard.createCursorKeys();
            this.keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.keyFullscreen = game.input.keyboard.addKey(Phaser.Keyboard.F);
            game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.F]);
        }
        return Input;
    })();
    VirtualCamera.Input = Input;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Input.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VirtualCamera;
(function (VirtualCamera) {
    VirtualCamera.input;
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.time.advancedTiming = true;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            VirtualCamera.input = new VirtualCamera.Input(this.game);
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start('GameState', true, false);
        };
        return Boot;
    })(Phaser.State);
    VirtualCamera.Boot = Boot;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            _super.apply(this, arguments);
        }
        /*constructor(game: Phaser.Game, x: number, y: number)
        {
        }*/
        Camera.prototype.update = function () {
        };
        return Camera;
    })(Phaser.Sprite);
    VirtualCamera.Camera = Camera;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.create = function () {
            this.stage.backgroundColor = 0xFFFFFF;
            var graphics = this.game.add.graphics(300, 200);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.moveTo(0, 0);
            graphics.lineTo(100, 0);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.moveTo(100, 0);
            graphics.lineTo(100, 100);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.moveTo(100, 100);
            graphics.lineTo(0, 100);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.moveTo(0, 100);
            graphics.lineTo(0, 0);
        };
        GameState.prototype.update = function () {
        };
        GameState.prototype.render = function () {
            this.game.debug.text('FPS: ' + this.game.time.fps.toString(), 5, 20, '#ffffff');
        };
        return GameState;
    })(Phaser.State);
    VirtualCamera.GameState = GameState;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="GameState.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.CANVAS, 'content', null);
            this.state.add('Boot', VirtualCamera.Boot, false);
            this.state.add('GameState', VirtualCamera.GameState, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    VirtualCamera.Game = Game;
})(VirtualCamera || (VirtualCamera = {}));
window.onload = function () {
    var game = new VirtualCamera.Game();
};
