/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Input = (function () {
        function Input(game) {
            this.cursors = game.input.keyboard.createCursorKeys();
            this.keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.keyFullscreen = game.input.keyboard.addKey(Phaser.Keyboard.F);
            this.keyFlyUp = game.input.keyboard.addKey(Phaser.Keyboard.Q);
            this.keyFlyDown = game.input.keyboard.addKey(Phaser.Keyboard.E);
            this.keyZoomIn = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.keyZoomOut = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.keyRotateXLeft = game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.keyRotateXRight = game.input.keyboard.addKey(Phaser.Keyboard.O);
            this.keyRotateYLeft = game.input.keyboard.addKey(Phaser.Keyboard.J);
            this.keyRotateYRight = game.input.keyboard.addKey(Phaser.Keyboard.K);
            this.keyRotateZLeft = game.input.keyboard.addKey(Phaser.Keyboard.N);
            this.keyRotateZRight = game.input.keyboard.addKey(Phaser.Keyboard.M);
            game.input.keyboard.addKeyCapture([
                Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.F,
                Phaser.Keyboard.Q,
                Phaser.Keyboard.E,
                Phaser.Keyboard.A,
                Phaser.Keyboard.D,
                Phaser.Keyboard.I,
                Phaser.Keyboard.O,
                Phaser.Keyboard.J,
                Phaser.Keyboard.K,
                Phaser.Keyboard.N,
                Phaser.Keyboard.M,
            ]);
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
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(game, graphics, x, y, z) {
            _super.call(this, game, 0, 0);
            this.log = 12;
            this.graphics = graphics;
            this.vertices = new Array();
            this.edges = new Array();
            //this.modelMatrix = math.eye(4);
            this.modelMatrix = math.matrix([
                [1, 0, 0, x],
                [0, 1, 0, y],
                [0, 0, 1, z],
                [0, 0, 0, 1]
            ]);
        }
        SceneObject.prototype.create = function () {
        };
        SceneObject.prototype.update = function () {
            //var mvp = math.multiply(camera.projectionViewMatrix, this.modelMatrix);
            var mvp = math.multiply(math.multiply(VirtualCamera.camera.projectionMatrix, VirtualCamera.camera.viewMatrix), this.modelMatrix);
            /*if (this.log && camera.projectionViewMatrix != undefined)
            {
                    //console.log(camera.projectionViewMatrix);
                    console.log(this.modelMatrix);
                    this.log = false;
            }*/
            var g = this.graphics;
            var v1, v2;
            for (var i = 0; i < this.edges.length; i++) {
                v1 = this.vertices[this.edges[i].vertex1];
                v2 = this.vertices[this.edges[i].vertex2];
                var v1n = math.multiply(mvp, [v1.x, v1.y, v1.z, 1]);
                var v2n = math.multiply(mvp, [v2.x, v2.y, v2.z, 1]);
                if (this.log) {
                    console.log(v1n);
                    console.log(v2n);
                    console.log(i);
                    //console.log(mvp);
                    this.log--;
                }
                g.lineStyle(1, 0x000000, 1);
                if (v1n._data[3] != 1) {
                    v1n._data[0] /= v1n._data[3];
                    v1n._data[1] /= v1n._data[3];
                }
                if (v2n._data[3] != 1) {
                    v2n._data[0] /= v2n._data[3];
                    v2n._data[1] /= v2n._data[3];
                }
                g.moveTo(v1n._data[0], v1n._data[1]);
                g.lineTo(v2n._data[0], v2n._data[1]);
            }
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
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var BuildingSmall = (function (_super) {
        __extends(BuildingSmall, _super);
        function BuildingSmall(game, graphics, x, y, z) {
            _super.call(this, game, graphics, x, y, z);
            this.addVertex('v1', 20, 0, 0);
            this.addVertex('v2', 40, 0, 0);
            this.addVertex('v3', 40, 20, 0);
            this.addVertex('v4', 20, 20, 0);
            this.addVertex('v5', 20, 0, 20);
            this.addVertex('v6', 40, 0, 20);
            this.addVertex('v7', 40, 20, 20);
            this.addVertex('v8', 20, 20, 20);
            this.addEdge('v1', 'v2');
            this.addEdge('v2', 'v3');
            this.addEdge('v3', 'v4');
            this.addEdge('v4', 'v1');
            this.addEdge('v5', 'v6');
            this.addEdge('v6', 'v7');
            this.addEdge('v7', 'v8');
            this.addEdge('v8', 'v5');
            this.addEdge('v1', 'v5');
            this.addEdge('v2', 'v6');
            this.addEdge('v3', 'v7');
            this.addEdge('v4', 'v8');
        }
        return BuildingSmall;
    })(VirtualCamera.SceneObject);
    VirtualCamera.BuildingSmall = BuildingSmall;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(game) {
            _super.call(this, game, 0, 0);
            this.fov = 60;
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.translationMatrix = math.matrix([
                [1, 0, 0, 20],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ]);
            this.updateProjectionMatrix();
            this.updateRotationMatrices();
            this.updateViewMatrix();
        }
        Camera.prototype.updateProjectionMatrix = function () {
            var a = 800 / 600;
            var fov = this.fov;
            /*var Znear = 0.1;
            var Zfar = 100;
            var zm = Zfar - Znear;
            var zp = Zfar + Znear;
            var y_scale = math.cot((fov * 0.5) * (Math.PI/180));
            var x_scale = y_scale / a;
            this.projectionMatrix = math.matrix([
                [x_scale , 0	   , 0	   	, 0					 	 ],
                [0		 , y_scale , 0	   	, 0					 	 ],
                [0		 , 0	   , -zp/zm , -(2 * Zfar * Znear)/zm ],
                [0		 , 0	   , -1	   	, 0					 	 ]
            ]);*/
            var n = 0.1;
            var f = 100;
            var scale = Math.tan(fov * 0.5 * Math.PI / 180) * n;
            var r = a * scale;
            var l = -r;
            var t = scale;
            var b = -t;
            this.projectionMatrix = math.matrix([
                [(2 * n) / (r - l), 0, (r + l) / (r - l), 0],
                [0, (2 * n) / (t - b), (t + b) / (t - b), 0],
                [0, 0, -(f + n) / (f - n), -(2 * f * n) / (f - n)],
                [0, 0, -1, 0]
            ]);
            //this.projectionMatrix = math.transpose(this.projectionMatrix);
        };
        Camera.prototype.updateRotationMatrices = function () {
            var angleX = this.rotationX * Math.PI / 180;
            this.rotationXMatrix = math.matrix([
                [1, 0, 0, 0],
                [0, Math.cos(angleX), -Math.sin(angleX), 0],
                [0, Math.sin(angleX), Math.cos(angleX), 0],
                [0, 0, 0, 1]
            ]);
            var angleY = this.rotationY * Math.PI / 180;
            this.rotationYMatrix = math.matrix([
                [Math.cos(angleY), 0, Math.sin(angleY), 0],
                [0, 1, 0, 0],
                [-Math.sin(angleY), 0, Math.cos(angleY), 0],
                [0, 0, 0, 1]
            ]);
            var angleZ = this.rotationZ * Math.PI / 180;
            this.rotationZMatrix = math.matrix([
                [Math.cos(angleZ), -Math.sin(angleZ), 0, 0],
                [Math.sin(angleZ), Math.cos(angleZ), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]);
        };
        Camera.prototype.updateViewMatrix = function () {
            this.viewMatrix = math.multiply(math.multiply(math.multiply(this.rotationXMatrix, this.rotationYMatrix), this.rotationZMatrix), this.translationMatrix);
        };
        Camera.prototype.update = function () {
            var movementSpeed = 1;
            var rotationSpeed = 1;
            var zoomSpeed = 1;
            if (VirtualCamera.input.cursors.up.isDown) {
                this.translationMatrix._data[0][3] -= movementSpeed;
            }
            if (VirtualCamera.input.cursors.down.isDown) {
                this.translationMatrix._data[0][3] += movementSpeed;
            }
            if (VirtualCamera.input.cursors.left.isDown) {
                this.translationMatrix._data[1][3] -= movementSpeed;
            }
            if (VirtualCamera.input.cursors.right.isDown) {
                this.translationMatrix._data[1][3] += movementSpeed;
            }
            if (VirtualCamera.input.keyFlyUp.isDown) {
                this.translationMatrix._data[2][3] -= movementSpeed;
            }
            if (VirtualCamera.input.keyFlyDown.isDown) {
                this.translationMatrix._data[2][3] += movementSpeed;
            }
            if (VirtualCamera.input.keyZoomIn.isDown) {
                this.fov -= zoomSpeed;
            }
            if (VirtualCamera.input.keyZoomOut.isDown) {
                this.fov += zoomSpeed;
            }
            if (VirtualCamera.input.keyRotateXLeft.isDown) {
                this.rotationX -= rotationSpeed;
            }
            if (VirtualCamera.input.keyRotateXRight.isDown) {
                this.rotationX += rotationSpeed;
            }
            if (VirtualCamera.input.keyRotateYLeft.isDown) {
                this.rotationY -= rotationSpeed;
            }
            if (VirtualCamera.input.keyRotateYRight.isDown) {
                this.rotationY += rotationSpeed;
            }
            if (VirtualCamera.input.keyRotateZLeft.isDown) {
                this.rotationZ -= rotationSpeed;
            }
            if (VirtualCamera.input.keyRotateZRight.isDown) {
                this.rotationZ += rotationSpeed;
            }
            this.updateProjectionMatrix();
            this.updateRotationMatrices();
            this.updateViewMatrix();
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
            console.log(VirtualCamera.camera);
            this.add.existing(VirtualCamera.camera);
            this.add.existing(new VirtualCamera.BuildingSmall(this.game, this.graphics, 0, 0, 0));
            this.add.existing(new VirtualCamera.BuildingSmall(this.game, this.graphics, 10, 10, 10));
        };
        GameState.prototype.update = function () {
            this.graphics.clear();
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
