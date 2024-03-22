let texts = [];
let particles;
let emitter;
let words;
let happywords = [];
let angrywords = [];
let sadwords = [];
let fearwords = [];
let happyball, angryball, sadball, fearball;
let index, index_btn;

getHappyWords();
getAngryWords();
getSadWords();
getFearWords();
const emotionball_config = {
    key: "emotionball",
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    active: true,
    visible: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    preload: function () {
        this.load.image('bg', './img/images.jpg');
        this.load.image('index', './img/inkball.png');
        this.load.image('fearball', './img/fearball.gif');
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");
        index = this.add.image(emotionball_config.width, 0, 'index').setOrigin(1, 0);
        happyball = this.add.image(emotionball_config.width * 0.2, emotionball_config.height / 2, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.4)
            .setInteractive()
            .on('pointerdown', () => {
                // getWords('喜');
                words = happywords;
                happyball.setVisible(false);
                angryball.setVisible(false);
                sadball.setVisible(false);
                fearball.setVisible(false);
                this.tweens.add({
                    targets: index,
                    duration: 1000,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    x: emotionball_config.width,
                    y: 0,
                    ease: 'Power2'
                });
                // console.log('click');
            });
        angryball = this.add.image(emotionball_config.width * 0.4, emotionball_config.height / 2, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.4)
            .setInteractive()
            .on('pointerdown', () => {
                // getWords('怒');
                happyball.setVisible(false);
                angryball.setVisible(false);
                sadball.setVisible(false);
                fearball.setVisible(false);
                this.tweens.add({
                    targets: index,
                    duration: 1000,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    x: emotionball_config.width,
                    y: 0,
                    ease: 'Power2'
                });
                // console.log('click');
            });
        sadball = this.add.image(emotionball_config.width * 0.6, emotionball_config.height / 2, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.4)
            .setInteractive()
            .on('pointerdown', () => {
                // getWords('哀');
                happyball.setVisible(false);
                angryball.setVisible(false);
                sadball.setVisible(false);
                fearball.setVisible(false);
                this.tweens.add({
                    targets: index,
                    duration: 1000,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    x: emotionball_config.width,
                    y: 0,
                    ease: 'Power2'
                });
                // console.log('click');
            });
        fearball = this.add.image(emotionball_config.width * 0.8, emotionball_config.height / 2, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.4)
            .setInteractive()
            .on('pointerdown', () => {
                // getWords('懼');
                happyball.setVisible(false);
                angryball.setVisible(false);
                sadball.setVisible(false);
                fearball.setVisible(false);
                this.tweens.add({
                    targets: index,
                    duration: 1000,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    x: emotionball_config.width,
                    y: 0,
                    ease: 'Power2'
                });
            });
    },
    update: function () {
        if (words != null) {
            this.scene.launch('wordcloud');
            this.scene.pause('emotionball');
        }
    }
}
const wordcloud_config = {
    key: "wordcloud",
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    active: false,
    visible: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    preload: function () {
        this.load.image('bg', './img/images.jpg');
        this.load.image('w_bg', './img/wordcloud_bg.jpg');
        this.load.image('ink', './img/dot.png');
        this.load.image('index', './img/inkball.png');
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");
        let bg = this.add.image(0, 0, 'w_bg').setOrigin(0, 0).setScale(1.5).setAlpha(0);
        this.tweens.add({
            targets: bg,
            duration: 1000,
            alpha: 1,
            ease: 'Linear',
        })
        index_btn = this.add.image(emotionball_config.width, 0, 'index')
            .setOrigin(1, 0)
            .setScale(0.2)
            .setInteractive()
            .on('pointerdown', () => {
                words = null;
                this.tweens.add({
                    targets: texts,
                    duration: 1000,
                    alpha: 0,
                    ease: 'Linear',
                });
                this.tweens.add({
                    targets: index_btn,
                    duration: 1000,
                    scaleX: 1,
                    scaleY: 1,
                    x: emotionball_config.width,
                    y: 0,
                    ease: 'Power2',
                    onComplete: () => {
                        this.scene.stop('wordcloud');
                        this.scene.start('emotionball');
                    }
                });
            });
      
        for (let i = 0; i < words.length; i++) {
            let text = this.add.text(Phaser.Math.Between(0.1 * config.width, 3 * config.width), Phaser.Math.Between(0.2 * config.height, 0.9 * config.height), words[i], {
                fontFamily: 'Noto Serif TC',
                fontWeight: 'bold',
                fontSize: 25,
                color: function () {
                    var grey = Math.floor(Phaser.Math.Between(0, 150));
                    return 'rgb(' + grey + ',' + grey + ',' + grey + ')';
                }
            }).setOrigin(0, 0).setAlpha(0);
            this.physics.world.enable(text);
            text.body.setCollideWorldBounds(false);
            text.setInteractive();
            this.input.setDraggable(text);
            this.tweens.add({
                targets: text,
                duration: 1000,
                alpha: 1,
                ease: 'Linear',
            })
            particles = this.add.particles('ink');
            // 粒子效果
            emitter = particles.createEmitter({
                speed: { min: -100, max: 100 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.5, end: 0 },
                alpha: { start: 1, end: 0 },
                lifespan: 1000,
                tint: [0xffffff, 0xffffff, 0xffffff],
                blendMode: 'NORMAL',
                on: false
            });
            text.on('pointerdown', function (pointer) {
                emitter.start();
                emitter.setPosition(pointer.x, pointer.y)
            });
            text.on('pointerup', function () {
                emitter.stop();
            });
            texts.push(text);
        }
        this.physics.add.collider(texts, texts, handleCollision);
    },
    update: function () {
        if (this.input.activePointer.isDown) {
            emitter.setPosition(this.input.activePointer.x, this.input.activePointer.y);
        }
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        for (let i = 0; i < texts.length; i++) {
            if (texts[i].x + texts[i].width <= -1000) {
                texts[i].x = Phaser.Math.Between(1 * config.width, 4 * config.width)
            }
            else {
                texts[i].x -= 2;
            }
        }
    }
}
const config = {
    key: 'config',
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [emotionball_config, wordcloud_config],
    preload: function () {
        this.load.image('bg', './img/images.jpg');
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");
    }
}
const game = new Phaser.Game(config);
function handleCollision(text1, text2) {
    var text1CenterX = text1.x + text1.displayWidth / 2;
    var text1CenterY = text1.y + text1.displayHeight / 2;
    var text2CenterX = text2.x + text2.displayWidth / 2;
    var text2CenterY = text2.y + text2.displayHeight / 2;
    var directionX = text2CenterX - text1CenterX;
    var directionY = text2CenterY - text1CenterY;
    text1.x -= directionX / 10;
    text1.y -= directionY / 10;
}
function getWords(emo) {
    let result;
    var api;
    switch (emo) {
        case '喜': {
            api = happy_sheet;
            break;
        }
        case '怒': {
            api = angry_sheet;
            break;
        }
        case '哀': {
            api = sad_sheet;
            break;
        }
        case '懼': {
            api = fear_sheet;
            break;
        }
        default: {
            api = happy_sheet;
        }
    }
    var data = {
        'status': 1,
    }
    $.post(api, data, function (res) {
        console.log(res);
        result = res;
        //return res;
    })
    return result;
}

function getHappyWords(){
    var api = happy_sheet;
    var data = {
        'status': 1,
    }
    $.post(api, data, function(res){
        happywords = res
    })
}
function getAngryWords(){
    var api = angry_sheet;
    var data = {
        'status': 1,
    }
    $.post(api, data, function(res){
        angrywords = res
    })
}
function getSadWords(){
    var api = sad_sheet;
    var data = {
        'status': 1,
    }
    $.post(api, data, function(res){
        sadwords = res
    })
}
function getFearWords(){
    var api = fear_sheet;
    var data = {
        'status': 1,
    }
    $.post(api, data, function(res){
        fearwords = res
    })
}

