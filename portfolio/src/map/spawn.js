import {buildChar, playerMove,} from "../character/protagonist.js"
import {dialog,} from "../dialogUI.js"
import {intro,} from "../script.js"
import {Pstatus} from "../character/protagonistStatus.js"
export default async function spawn(k) {
    
    k.loadSprite("spawn","./spawnPT.png");
    const data = await (await fetch("./spawnPT.json")).json();
    const layers = data.layers;
    const map = k.add([
        k.sprite("spawn"),
        k.pos(k.vec2(570,0)),
        k.scale(4),
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
        if (layer.name === "portfolioRM"){
            for(const NextMap of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),NextMap.width,NextMap.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(NextMap.x, NextMap.y), 
                    NextMap.name,
                ])
            }
            continue;
        };
        if(layer.name === "spawnPT"){
            for (const character of layer.objects) {
                player.pos = k.vec2(character.x+400+map.pos.x,character.y+200+map.pos.y);
                 //map.add(player);
                 continue;
            }
        }
    };
    if(!Pstatus.inSpawnBF){
        Pstatus.inSpawnBF = true;
        dialog(k,intro,player);
    }
    playerMove(k,player); 
    k.onCollide("player", "portfolioRM", () => {
        //dialog(k,[["this area is developing"]],player);
        k.destroy(player);
        k.go("portfolioRM");
    })
};
