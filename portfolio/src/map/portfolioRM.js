import {buildChar, playerMove,} from "../character/protagonist.js"
import {dialog,} from "../dialogUI.js"
import {openWorld,undevelopment } from "../script.js"

export default async function portfolioRM(k) {
    k.loadSprite("portfolioRM","./portfolioRM.png");
    const data = await (await fetch("./portfolioRM.json")).json();
    const layers = data.layers;
    const map = k.add([
        k.sprite("portfolioRM"),
        k.pos(k.vec2(400,0)),
        k.scale(3)
    ]);
    const player = buildChar(k);
    for (const layer of layers) {
        if (layer.name === "boundaries"){
            for(const obj of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),obj.width,obj.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(obj.x, obj.y), 
                    obj.name,
                ])
            }
            continue;
        };
        if (layer.name === "spawnRM"){
            for(const obj of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),obj.width,obj.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(obj.x, obj.y), 
                    obj.name,
                ])
            }
            continue;
        };
        if(layer.name === "spawnPT"){
            for (const character of layer.objects) {
                player.pos = k.vec2(character.x+50+map.pos.x,character.y+100+map.pos.y);
                 //map.add(player);
                 continue;
            }
        }
        if (layer.name === "undevelop"){
            for(const obj of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),obj.width,obj.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(obj.x, obj.y), 
                    obj.name,
                ])
            }
            continue;
        };
        if (layer.name === "openWorld"){
            for(const obj of layer.objects){
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0,0),obj.width,obj.height),
                    }),
                    k.body({isStatic: true}),
                    k.offscreen(),
                    k.pos(obj.x, obj.y), 
                    obj.name,
                ])
            }
            continue;
        };
    };
    playerMove(k,player);
    k.onCollide("player", "openWorld", () => {
        dialog(k,openWorld,player);
    })
    k.onCollide("player", "undevelop", () => {
        dialog(k,undevelopment,player);
    })
    k.onCollide("player", "spawnRM", () => {
        //dialog(k,[["this area is developing"]],player);
        k.destroy(player);
        k.go("spawn");
    })
};