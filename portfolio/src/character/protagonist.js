import {Pstatus} from "./protagonistStatus.js"
export function buildChar(k){
    return k.add([
        k.sprite("spreadsheet", 
            {anim: "standby"}
            //add anime in later version
        ),  
        {
            inSpawnBF:Pstatus.inSpawnBF,
            speed: 400,
            inDialogue: false,
            inFight: Pstatus.inFight,//use in later version
            direction: "up",// use for anime in later 
            // version
            //add other property later
        },
        k.area({
            shape: new k.Rect(k.vec2(0,0),17,19),
        }),
        k.scale(4),
        k.body(),
        k.pos(), 
        "player",
    ]);
}
export function playerMove(k,player){
    k.onUpdate((key) => {
        //console.log(key);
        if(k.isKeyDown("w")+
        k.isKeyDown("s")+
        k.isKeyDown("a")+
        k.isKeyDown("d") > 1){
            return;
        }
        else if(player.inDialogue){
            return;
        }
        if(k.isKeyDown("w")){
            player.move(0,-player.speed);
            return;
        }
        if(k.isKeyDown("s")){
            player.move(0,+player.speed);
            return;
        }
        if(k.isKeyDown("a")){
            player.move(-player.speed,0);
            return;
        }
        if(k.isKeyDown("d")){
            player.move(+player.speed,0);
            return;
        }
    });
}