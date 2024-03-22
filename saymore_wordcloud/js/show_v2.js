let texts = [];
let particles;
let emitter;
let words;
let happyball, angryball, sadball, fearball;
let index, index_btn;

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
                getWords('喜');
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
            getWords('怒');
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
            getWords('哀');
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
            getWords('懼');
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
        this.load.image('ink', './img/dot.png');
        this.load.image('index', './img/inkball.png');
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");
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
            let text = this.add.text(Phaser.Math.Between(0.2 * config.width, 0.8 * config.width), Phaser.Math.Between(0.2 * config.height, 0.8 * config.height), words[i][0], {
                fontFamily: 'Noto Serif TC',
                fontWeight: 'bold',
                fontSize: (words[i][1] > 41) ? (120) : (20 + (words[i][1] - 1) * 2.5),
                color: function () {
                    var grey = Math.floor(Phaser.Math.Between(0, 150));
                    // 返回rgb格式的灰階顏色，其中rgb的三個值相同即可形成灰階顏色
                    return 'rgb(' + grey + ',' + grey + ',' + grey + ')';// 字體顏色 'random-dark' 或者 'random-light'
                }
            }).setOrigin(0.5, 0.5).setAlpha(0);
            this.physics.world.enable(text);
            text.body.setCollideWorldBounds(true);
            text.setInteractive();
            this.input.setDraggable(text);
            let tween = createTextTween(this, text);;
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
            // 監聽拖動事件
            text.on('dragstart', function () {
                // 停止Tween动画
                tween.pause();
            });
            text.on('dragend', function () {
                // 重新啟動Tween動畫
                tween.stop();
                tween = createTextTween(this.scene, this);
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
function createTextTween(scene, text) {
    return scene.tweens.add({
        targets: text,
        y: text.y + Phaser.Math.Between(10, 20),
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });
}
function getWords(emo) {
    var api;
    switch (emo) {
        case '喜':{
            api = happy_sheet;
            break;
        }
        case '怒':{
            api = angry_sheet;
            break;
        }
        case '哀':{
            api = sad_sheet;
            break;
        }
        case '懼':{
            api = fear_sheet;
            break;
        }
        default:{
            api = happy_sheet;
        }
    }
    //api = happy_sheet;
    var data = {
        'status': 1,
        'words': null
    }
    $.post(api, data, function (res) {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            for (let j = i; j < res.length; j++) {
                if (res[j][1] > res[i][1]) {
                    var temp = res[i];
                    res[i] = res[j];
                    res[j] = temp;
                }
            }
        }
        words = res;
    })
}
