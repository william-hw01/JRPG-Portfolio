import {buildChar, playerMove,} from "../character/protagonist.js"
import {dialog,} from "../dialogUI.js"
import {intro,} from "../script.js"

export default async function spawn(k) {
    
    k.loadSprite("spawn","./spawnPT.png");
    const data = await (await fetch("./spawnPT.json")).json();
    const layers = data.layers;
    const map = k.add([
        k.sprite("spawn"),
        k.pos(k.vec2(570,0))
    ]);
    const player = buildChar(k);
    for (const layer of layers) {
        if (layer.name === "boundaries"){
            for(const boundary of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),boundary.width,boundary.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(boundary.x, boundary.y), 
                    boundary.name,
                ])
            }
            continue;
        };
        if(layer.name === "spawnPoint"){
            for (const character of layer.objects) {
                if (character.name === "Player"){
                    player.pos = k.vec2(character.x+map.pos.x,character.y+map.pos.y);
                };
                 //map.add(player);
                 continue;
            }
        }
    };
    dialog(k,intro,player);
    playerMove(k,player);
};
