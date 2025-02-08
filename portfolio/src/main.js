import {k} from "./kaboomCode.js"
import spawn from "./map/spawn.js"
import portfolioRM from "./map/portfolioRM.js"
k.loadSprite("spreadsheet", "./spreadsheet.png",{
    sliceX: 32,//may need change /w change in sprite sheet
    sliceY: 32,//may need change /w change in sprite sheet
    //can add anims in later version
    anims: {
        "standby": 3,
    },
});

k.setBackground(k.Color.fromHex("#4AC6FF"));
const map = {
    spawn,
    portfolioRM,
}

for (const mapName in map) {
    k.scene(mapName, async () => map[mapName](k));
  }
  k.go("portfolioRM");
  
 //k.go("spawn");