/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Input = (function () {
        function Input(game) {
            this.cursors = game.input.keyboard.createCursorKeys();
            this.keyResetRotation = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
            this.keyChangeRenderMode = game.input.keyboard.addKey(Phaser.Keyboard.R);
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
                Phaser.Keyboard.R
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
    var Polygon = (function () {
        function Polygon(vertices) {
            this.vertices = vertices;
            this.center = new VirtualCamera.Vertex(0, 0, 0);
            this.normal = new VirtualCamera.Vertex(0, 0, 0);
            this.D = 0;
        }
        return Polygon;
    })();
    VirtualCamera.Polygon = Polygon;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Polygon.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(game, graphics, x, y, z, x_rot, y_rot, z_rot) {
            if (x_rot === void 0) { x_rot = 0; }
            if (y_rot === void 0) { y_rot = 0; }
            if (z_rot === void 0) { z_rot = 0; }
            _super.call(this, game, 0, 0);
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.graphics = graphics;
            this.vertices = new Array();
            this.verticesWorld = new Array();
            this.verticesProjected = new Array();
            this.edges = new Array();
            this.polygons = new Array();
            this.translationMatrix = math.matrix([
                [1, 0, 0, x],
                [0, 1, 0, y],
                [0, 0, 1, z],
                [0, 0, 0, 1]
            ]);
            this.rotationX = x_rot;
            this.rotationY = y_rot;
            this.rotationZ = z_rot;
            this.updateRotationMatrices();
            this.updateModelMatrix();
        }
        SceneObject.prototype.update = function () {
            this.updateModelMatrix();
            var mvp = math.multiply(math.multiply(VirtualCamera.camera.projectionMatrix, VirtualCamera.camera.modelMatrix), this.modelMatrix);
            for (var key in this.vertices) {
                var v = this.vertices[key];
                var vProjected = math.multiply(mvp, [v.x, v.y, v.z, 1]);
                this.verticesProjected[key].x = vProjected._data[0];
                this.verticesProjected[key].y = vProjected._data[1];
                if (vProjected._data[3] != 1) {
                    this.verticesProjected[key].x /= vProjected._data[3];
                    this.verticesProjected[key].y /= vProjected._data[3];
                }
            }
        };
        SceneObject.prototype.addVertex = function (name, x, y, z) {
            this.vertices[name] = new VirtualCamera.Vertex(x, y, z);
            this.verticesWorld[name] = new VirtualCamera.Vertex(x, y, z);
            this.verticesProjected[name] = new VirtualCamera.Vertex(x, y, z);
        };
        SceneObject.prototype.addEdge = function (vertex1, vertex2) {
            this.edges.push(new VirtualCamera.Edge(vertex1, vertex2));
        };
        SceneObject.prototype.addPolygon = function (vertices) {
            this.polygons.push(new VirtualCamera.Polygon(vertices));
        };
        SceneObject.prototype.updateRotationMatrices = function () {
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
        SceneObject.prototype.updateModelMatrix = function () {
            this.modelMatrix = math.multiply(this.translationMatrix, math.multiply(math.multiply(this.rotationXMatrix, this.rotationYMatrix), this.rotationZMatrix));
            for (var key in this.vertices) {
                var v = this.vertices[key];
                var vWorld = math.multiply(this.modelMatrix, [v.x, v.y, v.z, 1]);
                this.verticesWorld[key].x = vWorld._data[0];
                this.verticesWorld[key].y = vWorld._data[1];
                this.verticesWorld[key].z = vWorld._data[2];
            }
            for (var j = 0; j < this.polygons.length; j++) {
                var sx = 0, sy = 0, sz = 0;
                var p = this.polygons[j];
                var vnum = p.vertices.length;
                for (var i = 0; i < vnum; i++) {
                    var ver = this.verticesWorld[p.vertices[i]];
                    sx += ver.x;
                    sy += ver.y;
                    sz += ver.z;
                }
                p.center.x = sx / vnum;
                p.center.y = sy / vnum;
                p.center.z = sz / vnum;
                var v1 = this.verticesWorld[p.vertices[0]];
                var v2 = this.verticesWorld[p.vertices[1]];
                var v3 = this.verticesWorld[p.vertices[2]];
                var vec1 = new VirtualCamera.Vertex(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
                var vec2 = new VirtualCamera.Vertex(v3.x - v2.x, v3.y - v2.y, v3.z - v2.z);
                p.normal = VirtualCamera.Vertex.crossProduct(vec1, vec2);
                p.D = -VirtualCamera.Vertex.dotProduct(v1, p.normal);
            }
        };
        return SceneObject;
    })(Phaser.Sprite);
    VirtualCamera.SceneObject = SceneObject;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(game, x, y, z, x_rot, y_rot, z_rot) {
            _super.call(this, game, null, x, y, z, x_rot, y_rot, z_rot);
            this.fov = 60;
            this.updateProjectionMatrix();
        }
        Camera.prototype.updateProjectionMatrix = function () {
            var a = VirtualCamera.Game.WIDTH / VirtualCamera.Game.HEIGHT;
            var fov = this.fov;
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
        };
        Camera.prototype.updateModelMatrix = function () {
            this.modelMatrix = math.multiply(math.multiply(math.multiply(this.rotationXMatrix, this.rotationYMatrix), this.rotationZMatrix), this.translationMatrix);
        };
        Camera.prototype.update = function () {
            var movementSpeed = 1;
            var rotationSpeed = 1;
            var zoomSpeed = 1;
            if (VirtualCamera.input.cursors.up.isDown) {
                var angle = (this.rotationY - 90) * Math.PI / 180;
                this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
                this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
            }
            if (VirtualCamera.input.cursors.down.isDown) {
                var angle = (this.rotationY - 270) * Math.PI / 180;
                this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
                this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
            }
            if (VirtualCamera.input.cursors.left.isDown) {
                var angle = (this.rotationY - 180) * Math.PI / 180;
                this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
                this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
            }
            if (VirtualCamera.input.cursors.right.isDown) {
                var angle = this.rotationY * Math.PI / 180;
                this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
                this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
            }
            if (VirtualCamera.input.keyFlyUp.isDown) {
                this.translationMatrix._data[1][3] -= movementSpeed;
            }
            if (VirtualCamera.input.keyFlyDown.isDown) {
                this.translationMatrix._data[1][3] += movementSpeed;
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
            if (VirtualCamera.input.keyResetRotation.justDown) {
                this.rotationX = 0;
                this.rotationZ = 0;
            }
            this.updateProjectionMatrix();
            this.updateRotationMatrices();
            this.updateModelMatrix();
        };
        Camera.prototype.getPosition = function () {
            return new VirtualCamera.Vertex(this.translationMatrix._data[0][3], this.translationMatrix._data[1][3], this.translationMatrix._data[2][3]);
        };
        return Camera;
    })(VirtualCamera.SceneObject);
    VirtualCamera.Camera = Camera;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Cuboid = (function (_super) {
        __extends(Cuboid, _super);
        function Cuboid(game, graphics, x, y, z, x_size, y_size, z_size, x_rot, y_rot, z_rot) {
            if (x_rot === void 0) { x_rot = 0; }
            if (y_rot === void 0) { y_rot = 0; }
            if (z_rot === void 0) { z_rot = 0; }
            _super.call(this, game, graphics, x, y, z, x_rot, y_rot, z_rot);
            this.addVertex('v1', 0, 0, 0);
            this.addVertex('v2', x_size, 0, 0);
            this.addVertex('v3', x_size, y_size, 0);
            this.addVertex('v4', 0, y_size, 0);
            this.addVertex('v5', 0, 0, z_size);
            this.addVertex('v6', x_size, 0, z_size);
            this.addVertex('v7', x_size, y_size, z_size);
            this.addVertex('v8', 0, y_size, z_size);
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
            this.addPolygon(['v1', 'v2', 'v3', 'v4']);
            this.addPolygon(['v1', 'v2', 'v6', 'v5']);
            this.addPolygon(['v2', 'v3', 'v7', 'v6']);
            this.addPolygon(['v3', 'v4', 'v8', 'v7']);
            this.addPolygon(['v4', 'v1', 'v5', 'v8']);
            this.addPolygon(['v5', 'v6', 'v7', 'v8']);
        }
        return Cuboid;
    })(VirtualCamera.SceneObject);
    VirtualCamera.Cuboid = Cuboid;
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
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    VirtualCamera.camera;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
            this.log = 100;
            this.renderMode = 2;
            this.renderModeName = ['wireframe', 'polygons 1', 'polygons 2'];
        }
        GameState.prototype.create = function () {
            var _this = this;
            this.game.input.onDown.add(function () { _this.game.scale.startFullScreen(false); }, this);
            this.stage.backgroundColor = 0xFFFFFF;
            this.graphics = this.game.add.graphics(VirtualCamera.Game.WIDTH / 2, VirtualCamera.Game.HEIGHT / 2);
            VirtualCamera.camera = new VirtualCamera.Camera(this.game, -66, -67, 98, -22, 19, 0);
            this.add.existing(VirtualCamera.camera);
            this.objects = [];
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, -2, 0, 0, 10, 20, 10, 0, 10));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, -2, 0, 17, 10, 15, 10, 0, 16));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, -2, 0, 34, 10, 30, 10, 0, 30));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 40, 0, 0, 10, 13, 10, 0, 45));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 40, 0, 17, 10, 17, 10, 0, 30));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 40, 0, 34, 10, 8, 10, 0, 22));
            this.objects.push(new VirtualCamera.Plane(this.game, this.graphics, 13, 0, -10, 10, 60));
            this.objects.push(new VirtualCamera.Plane(this.game, this.graphics, 27, 0, -10, 10, 60));
            this.objects.push(new VirtualCamera.Pyramid(this.game, this.graphics, 24.5, 0, 70, 20, 40, 20));
            var tree_z = 0;
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z - 2, 5, 5, 5));
            tree_z = 10;
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z - 2, 5, 5, 5));
            tree_z = 20;
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z - 2, 5, 5, 5));
            tree_z = 30;
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z - 2, 5, 5, 5));
            tree_z = 40;
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
            this.objects.push(new VirtualCamera.Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z - 2, 5, 5, 5));
            this.debugEntries = new Array();
            for (var i = 0; i < this.objects.length; i++)
                this.add.existing(this.objects[i]);
        };
        GameState.prototype.update = function () {
            if (VirtualCamera.input.keyChangeRenderMode.justDown) {
                this.renderMode++;
                if (this.renderMode == 3)
                    this.renderMode = 0;
            }
            this.graphics.clear();
            var polygonsObjects = Array();
            for (var j = 0; j < this.objects.length; j++) {
                var obj = this.objects[j];
                for (var i = 0; i < obj.polygons.length; i++) {
                    polygonsObjects.push(new VirtualCamera.PolygonSceneObject(obj.polygons[i], obj));
                }
            }
            if (this.renderMode == 1) {
                polygonsObjects.sort(function (a, b) {
                    var campos = VirtualCamera.camera.getPosition();
                    return VirtualCamera.Vertex.distance(a.polygon.center, campos) - VirtualCamera.Vertex.distance(b.polygon.center, campos);
                });
            }
            else if (this.renderMode == 2) {
                polygonsObjects.sort(function (a, b) {
                    var campos = VirtualCamera.camera.getPosition();
                    var dot1 = VirtualCamera.Vertex.dotProduct(a.polygon.normal, b.polygon.center) + a.polygon.D;
                    var dot2 = VirtualCamera.Vertex.dotProduct(a.polygon.normal, campos) + a.polygon.D;
                    if ((dot1 < 0 && dot2 < 0) || (dot1 >= 0 && dot2 >= 0))
                        return 1;
                    else
                        return -1;
                });
            }
            var g = this.graphics;
            for (var j = 0; j < polygonsObjects.length; j++) {
                var obj = polygonsObjects[j].sceneObject;
                var vertices = polygonsObjects[j].polygon.vertices;
                var v, v0;
                g.lineStyle(1, 0x000000, 1);
                if (this.renderMode == 1)
                    g.beginFill(0xFF3333);
                else if (this.renderMode == 2)
                    g.beginFill(0x66A3FF);
                v0 = obj.verticesProjected[vertices[0]];
                g.moveTo(v0.x * VirtualCamera.Game.WIDTH, v0.y * VirtualCamera.Game.HEIGHT);
                for (var i = 1; i < polygonsObjects[j].polygon.vertices.length; i++) {
                    v = obj.verticesProjected[vertices[i]];
                    g.lineTo(v.x * VirtualCamera.Game.WIDTH, v.y * VirtualCamera.Game.HEIGHT);
                }
                g.lineTo(v0.x * VirtualCamera.Game.WIDTH, v0.y * VirtualCamera.Game.HEIGHT);
                if (this.renderMode == 1 || this.renderMode == 2)
                    g.endFill();
                if (this.log) {
                    console.log(polygonsObjects[j].polygon);
                    this.log--;
                }
            }
        };
        GameState.prototype.render = function () {
            this.debugEntries = [
                'FPS: ' + this.game.time.fps,
                'Fov: ' + VirtualCamera.camera.fov,
                'X: ' + VirtualCamera.camera.translationMatrix._data[0][3],
                'Y: ' + VirtualCamera.camera.translationMatrix._data[1][3],
                'Z: ' + VirtualCamera.camera.translationMatrix._data[2][3],
                'rotX: ' + VirtualCamera.camera.rotationX,
                'rotY: ' + VirtualCamera.camera.rotationY,
                'rotZ: ' + VirtualCamera.camera.rotationZ,
                'Render mode: ' + this.renderModeName[this.renderMode],
                '_____________',
                'Instructions:',
                'Arrows, Q, E - moving',
                'I, O, J, K, N, M - rotating',
                'A, D - zoom',
                'Left mouse button - fullscreen'
            ];
            for (var i = 0; i < this.debugEntries.length; i++) {
                this.game.debug.text(this.debugEntries[i], 5, (i + 1) * 20, i >= 9 ? '#CCFF99' : '#FFFFFF');
            }
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
            _super.call(this, Game.WIDTH, Game.HEIGHT, Phaser.CANVAS, 'content', null);
            this.state.add('Boot', VirtualCamera.Boot, false);
            this.state.add('GameState', VirtualCamera.GameState, false);
            this.state.start('Boot');
        }
        Game.WIDTH = window.screen.width;
        Game.HEIGHT = window.screen.height;
        return Game;
    })(Phaser.Game);
    VirtualCamera.Game = Game;
})(VirtualCamera || (VirtualCamera = {}));
window.onload = function () {
    var game = new VirtualCamera.Game();
};
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(game, graphics, x, y, z, x_size, z_size, x_rot, y_rot, z_rot) {
            if (x_rot === void 0) { x_rot = 0; }
            if (y_rot === void 0) { y_rot = 0; }
            if (z_rot === void 0) { z_rot = 0; }
            _super.call(this, game, graphics, x, y, z, x_rot, y_rot, z_rot);
            this.addVertex('v1', 0, 0, 0);
            this.addVertex('v2', x_size, 0, 0);
            this.addVertex('v3', x_size, 0, z_size);
            this.addVertex('v4', 0, 0, z_size);
            this.addEdge('v1', 'v2');
            this.addEdge('v2', 'v3');
            this.addEdge('v3', 'v4');
            this.addEdge('v4', 'v1');
            this.addPolygon(['v1', 'v2', 'v3', 'v4']);
        }
        return Plane;
    })(VirtualCamera.SceneObject);
    VirtualCamera.Plane = Plane;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var PolygonSceneObject = (function () {
        function PolygonSceneObject(polygon, sceneObject) {
            this.polygon = polygon;
            this.sceneObject = sceneObject;
        }
        return PolygonSceneObject;
    })();
    VirtualCamera.PolygonSceneObject = PolygonSceneObject;
})(VirtualCamera || (VirtualCamera = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />
var VirtualCamera;
(function (VirtualCamera) {
    var Pyramid = (function (_super) {
        __extends(Pyramid, _super);
        function Pyramid(game, graphics, x, y, z, x_size, y_size, z_size, x_rot, y_rot, z_rot) {
            if (x_rot === void 0) { x_rot = 0; }
            if (y_rot === void 0) { y_rot = 0; }
            if (z_rot === void 0) { z_rot = 0; }
            _super.call(this, game, graphics, x, y, z, x_rot, y_rot, z_rot);
            this.addVertex('v1', -x_size / 2, 0, -z_size / 2);
            this.addVertex('v2', x_size / 2, 0, -z_size / 2);
            this.addVertex('v3', x_size / 2, 0, z_size / 2);
            this.addVertex('v4', -x_size / 2, 0, z_size / 2);
            this.addVertex('v5', 0, y_size, 0);
            this.addEdge('v1', 'v2');
            this.addEdge('v2', 'v3');
            this.addEdge('v3', 'v4');
            this.addEdge('v4', 'v1');
            this.addEdge('v1', 'v5');
            this.addEdge('v2', 'v5');
            this.addEdge('v3', 'v5');
            this.addEdge('v4', 'v5');
            this.addPolygon(['v1', 'v2', 'v3', 'v4']);
            this.addPolygon(['v1', 'v2', 'v5']);
            this.addPolygon(['v2', 'v3', 'v5']);
            this.addPolygon(['v3', 'v4', 'v5']);
            this.addPolygon(['v4', 'v1', 'v5']);
        }
        Pyramid.prototype.update = function () {
            this.rotationY += 1;
            this.updateRotationMatrices();
            _super.prototype.update.call(this);
        };
        return Pyramid;
    })(VirtualCamera.SceneObject);
    VirtualCamera.Pyramid = Pyramid;
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
        Vertex.distance = function (v1, v2) {
            return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
        };
        Vertex.dotProduct = function (v1, v2) {
            return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        };
        Vertex.crossProduct = function (a, b) {
            return new Vertex(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
        };
        return Vertex;
    })();
    VirtualCamera.Vertex = Vertex;
})(VirtualCamera || (VirtualCamera = {}));
