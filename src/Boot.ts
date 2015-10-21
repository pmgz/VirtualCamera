/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Input.ts" />

module VirtualCamera
{
    export var input: Input;
    
    export class Boot extends Phaser.State
    { 
        create()
        {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            
			this.game.time.advancedTiming = true;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            input = new Input(this.game);
 
            if (this.game.device.desktop)
            {
                //
            }
            else
            {
                //
            }
 
            this.game.state.start('GameState', true, false);
        }
    }
}