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
        function Camera(game) {
            _super.call(this, game, 0, 0);
            var a = 800 / 600;
            var fov = 60;
            var Znear = 0.1;
            var Zfar = 100;
            var zm = Zfar - Znear;
            var zp = Zfar + Znear;
            var y_scale = math.cot((fov * 0.5) * (Math.PI / 180));
            var x_scale = y_scale / a;
            this.projectionMatrix = math.matrix([
                [x_scale, 0, 0, 0],
                [0, y_scale, 0, 0],
                [0, 0, -zp / zm, -(2 * Zfar * Znear) / zm],
                [0, 0, -1, 0]
            ]);
            this.viewMatrix = math.matrix([
                [0, 0, 0, 10],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ]);
        }
        Camera.prototype.update = function () {
        };
        return Camera;
    })(Phaser.Sprite);
    VirtualCamera.Camera = Camera;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Edge = (function () {
        function Edge(vertex1, vertex2) {
            this.vertex1 = vertex1;
            this.vertex2 = vertex2;
        }
        return Edge;
    })();
    VirtualCamera.Edge = Edge;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    VirtualCamera.camera;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
            this.offset = 0;
        }
        GameState.prototype.create = function () {
            this.stage.backgroundColor = 0xFFFFFF;
            this.graphics = this.game.add.graphics(300, 200);
            VirtualCamera.camera = new VirtualCamera.Camera(this.game);
            this.add.existing(VirtualCamera.camera);
            var obj = new VirtualCamera.SceneObject(this.game, this.graphics);
            obj.addVertex('v1', 20, 0, 0);
            obj.addVertex('v2', 40, 20, 0);
            obj.addVertex('v3', 40, 20, 0);
            obj.addVertex('v4', 20, 20, 0);
            obj.addVertex('v5', 20, 0, 60);
            obj.addVertex('v6', 40, 20, 60);
            obj.addVertex('v7', 40, 20, 60);
            obj.addVertex('v8', 20, 20, 60);
            obj.addEdge('v1', 'v2');
            obj.addEdge('v2', 'v3');
            obj.addEdge('v3', 'v4');
            obj.addEdge('v4', 'v1');
            obj.addEdge('v5', 'v6');
            obj.addEdge('v6', 'v7');
            obj.addEdge('v7', 'v8');
            obj.addEdge('v8', 'v5');
            obj.addEdge('v1', 'v5');
            obj.addEdge('v2', 'v6');
            obj.addEdge('v3', 'v7');
            obj.addEdge('v4', 'v8');
            this.add.existing(obj);
        };
        GameState.prototype.update = function () {
            this.graphics.clear();
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(100 + this.offset, 0);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(100 + this.offset, 0);
            this.graphics.lineTo(100, 100);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(100, 100);
            this.graphics.lineTo(0, 100);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(0, 100);
            this.graphics.lineTo(0, 0);
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
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(game, graphics) {
            _super.call(this, game, 0, 0);
            this.graphics = graphics;
            this.vertices = new Array();
            this.edges = new Array();
            this.modelMatrix = math.eye(4);
        }
        SceneObject.prototype.create = function () {
        };
        SceneObject.prototype.update = function () {
            var g = this.graphics;
            var v1, v2;
            for (var i = 0; i < this.edges.length; i++) {
                v1 = this.vertices[this.edges[i].vertex1];
                v2 = this.vertices[this.edges[i].vertex2];
                g.lineStyle(1, 0x000000, 1);
                g.moveTo(0, 0);
                g.lineTo(100, 0);
            }
        };
        SceneObject.prototype.render = function () {
            //
        };
        SceneObject.prototype.addVertex = function (name, x, y, z) {
            this.vertices[name] = new VirtualCamera.Vertex(x, y, z);
        };
        SceneObject.prototype.addEdge = function (vertex1, vertex2) {
            this.edges.push(new VirtualCamera.Edge(vertex1, vertex2));
        };
        return SceneObject;
    })(Phaser.Sprite);
    VirtualCamera.SceneObject = SceneObject;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Vertex = (function () {
        function Vertex(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Vertex;
    })();
    VirtualCamera.Vertex = Vertex;
})(VirtualCamera || (VirtualCamera = {}));
