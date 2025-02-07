import {k} from "./kaboomCode.js"
import spawn from "./map/spawn.js"
k.loadSprite("spreadsheet", "./spreadsheet.png",{
    sliceX: 8,//may need change /w change in sprite sheet
    sliceY: 8,//may need change /w change in sprite sheet
    //can add anims in later version
    anims: {
        "standby": 3,
    },
});

k.setBackground(k.Color.fromHex("#4AC6FF"));
const map = {
    spawn,
}

for (const mapName in map) {
    k.scene(mapName, async () => map[mapName](k));
  }


k.go("spawn");