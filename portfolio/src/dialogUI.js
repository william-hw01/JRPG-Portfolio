export async function dialog(k,text,player){
    player.inDialogue = true;
    const textBox = k.add([
        k.color(110,110,110),
        k.rect(600,140),
        k.pos(k.vec2(590,500)),
        k.fixed()]);
    const content = textBox.add([
        k.text("",{
            width: 500,
            size: 25,
            lineSpacing: 10,
            
        }),
        k.fixed(),
        k.color(0,0,0),
        k.pos(20,20),
    ]);
    let row = 0;
    let index = 0;
    let interval = null;

    function startTyping() {
        content.text = "";
        index = 0;

        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            if (index < text[row][0].length) {
                content.text += text[row][0][index]; 
                index++;
            } else {
                clearInterval(interval);
            }
        }, 20);
    }
    startTyping();
    k.onKeyPress("space", () => {
        if (row < text.length - 1) {
            row++;
            startTyping();
        } else {
            textBox.destroy();
            player.inDialogue = false;
        }
    });
    
}