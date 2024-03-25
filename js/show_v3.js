let texts = [];
let particles;
let emitter;
let words;
let happyball, angryball, sadball, fearball;
let happyball_btn, angryball_btn, sadball_btn, fearball_btn;
let index, index_btn;
let BallLoopTween, BallLoopTween2;
let emotion_page;
let happyvideo;

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
        this.load.image('happyball', './img/happy_ball.png');
        this.load.image('angryball', './img/angry_ball.png');
        this.load.image('sadball', './img/sad_ball.png');
        this.load.image('fearball', './img/fear_ball.png');
        this.load.video('happy', './img/angry.mp4')
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");

        happyball = this.add.image(emotionball_config.width * 0.2, emotionball_config.height / 2, 'happyball')
            .setOrigin(0.5, 0.5)
            .setScale(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                getWords(this, '喜');
                ball_tween(this, happyball, angryball, sadball, fearball);
            });
        angryball = this.add.image(emotionball_config.width * 0.4, emotionball_config.height / 2, 'angryball')
            .setOrigin(0.5, 0.5)
            .setScale(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                getWords(this, '怒');
                ball_tween(this, happyball, angryball, sadball, fearball);
            });
        sadball = this.add.image(emotionball_config.width * 0.6, emotionball_config.height / 2, 'sadball')
            .setOrigin(0.5, 0.5)
            .setScale(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                getWords(this, '哀');
                ball_tween(this, happyball, angryball, sadball, fearball);
            });
        fearball = this.add.image(emotionball_config.width * 0.8, emotionball_config.height / 2, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                getWords(this, '懼');
                ball_tween(this, happyball, angryball, sadball, fearball);
            });
        BallLoopTween = ball_loop_tween(this, happyball, angryball, sadball, fearball);
    },
    update: function () {

        if (words != null && happyvideo.isPlaying()== false ) {
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
        this.load.image('happyball', './img/happy_ball.png');
        this.load.image('angryball', './img/angry_ball.png');
        this.load.image('sadball', './img/sad_ball.png');
        this.load.image('fearball', './img/fear_ball.png');
    },
    create: function () {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(50).setTint("0xe8e6e1");
        let W_bg = this.add.image(0, 0, 'w_bg').setOrigin(0, 0).setScale(1.5).setAlpha(0);

        this.tweens.add({
            targets: W_bg,
            duration: 1000,
            alpha: 1,
            ease: 'Linear',
        })
        happyball_btn = this.add.image(wordcloud_config.width - 190, 50, 'happyball')
            .setOrigin(0.5, 0.5)
            .setScale(0.02)
            .setInteractive()
            .on('pointerdown', () => {
                ballreturn_tween(this, happyball_btn, angryball_btn, sadball_btn, fearball_btn, texts, W_bg);
            });
        angryball_btn = this.add.image(wordcloud_config.width - 140, 50, 'angryball')
            .setOrigin(0.5, 0.5)
            .setScale(0.02)
            .setInteractive()
            .on('pointerdown', () => {
                ballreturn_tween(this, happyball_btn, angryball_btn, sadball_btn, fearball_btn, texts, W_bg);
            });
        sadball_btn = this.add.image(wordcloud_config.width - 90, 50, 'sadball')
            .setOrigin(0.5, 0.5)
            .setScale(0.02)
            .setInteractive()
            .on('pointerdown', () => {
                ballreturn_tween(this, happyball_btn, angryball_btn, sadball_btn, fearball_btn, texts, W_bg);
            });
        fearball_btn = this.add.image(wordcloud_config.width - 40, 50, 'fearball')
            .setOrigin(0.5, 0.5)
            .setScale(0.02)
            .setInteractive()
            .on('pointerdown', () => {
                ballreturn_tween(this, happyball_btn, angryball_btn, sadball_btn, fearball_btn, texts, W_bg);
            });
        switch (emotion_page) {
            case "喜":
                BallLoopTween2 = this.tweens.add({
                    targets: happyball_btn,
                    duration: 800,
                    y: happyball_btn.y + 40 * (happyball_btn.scale / 0.1),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Bounce'
                })
                break;
            case "怒":
                BallLoopTween2 = this.tweens.add({
                    targets: angryball_btn,
                    duration: 500,
                    x: angryball_btn.x + 20 * (angryball_btn.scale / 0.1),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Elastic'
                })
                break;
            case "哀":
                BallLoopTween2 = this.tweens.add({
                    targets: sadball_btn,
                    duration: 2000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Power2'
                })
                break;
            case "懼":
                BallLoopTween2 = this.tweens.add({
                    targets: fearball_btn,
                    duration: 400,
                    scale: fearball_btn.scale * 1.2,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Back'
                })
                break;
            default:
                BallLoopTween2 = this.tweens.add({
                    targets: happyball_btn,
                    duration: 800,
                    y: happyball_btn.y + 40 * (happyball_btn.scale / 0.1),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Bounce'
                })
                break;
        }
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
                emitter.setPosition(pointer.x, pointer.y);
            });
            text.on('pointerup', function () {
                emitter.stop();
            });
            text.on('dragstart', function () {
                text.setFontSize(40);
            });
            text.on('dragend', function () {
                text.setFontSize(25);
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

function getWords(scene, emo) {
    emotion_page = emo;
    var api;
    switch (emo) {
        case '喜': {
            api = happy_sheet;
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            break;
        }
        case '怒': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            api = angry_sheet;
            break;
        }
        case '哀': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            api = sad_sheet;
            break;
        }
        case '懼': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            api = fear_sheet;
            break;
        }
        default: {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            api = happy_sheet;
        }
    }
    var data = {
        'status': 1,
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

function ball_tween(scene, happy, angry, sad, fear) {
    BallLoopTween.happy.stop();
    BallLoopTween.angry.stop();
    BallLoopTween.sad.stop();
    BallLoopTween.fear.stop();
    happy.setVisible(false);
    angry.setVisible(false);
    sad.setVisible(false);
    fear.setVisible(false);
    happy = scene.add.image(emotionball_config.width * 0.2, emotionball_config.height / 2, 'happyball').setOrigin(0.5, 0.5).setScale(0.1);
    angry = scene.add.image(emotionball_config.width * 0.4, emotionball_config.height / 2, 'angryball').setOrigin(0.5, 0.5).setScale(0.1);
    sad = scene.add.image(emotionball_config.width * 0.6, emotionball_config.height / 2, 'sadball').setOrigin(0.5, 0.5).setScale(0.1);
    fear = scene.add.image(emotionball_config.width * 0.8, emotionball_config.height / 2, 'fearball').setOrigin(0.5, 0.5).setScale(0.1);
    return scene.tweens.add({
        targets: happy,
        duration: 1000,
        scaleX: 0.02,
        scaleY: 0.02,
        x: emotionball_config.width - 190,
        y: 50,
        ease: 'Power2',
    }), scene.tweens.add({
        targets: angry,
        duration: 1000,
        scaleX: 0.02,
        scaleY: 0.02,
        x: emotionball_config.width - 140,
        y: 50,
        ease: 'Power2'
    }), scene.tweens.add({
        targets: sad,
        duration: 1000,
        scaleX: 0.02,
        scaleY: 0.02,
        x: emotionball_config.width - 90,
        y: 50,
        ease: 'Power2'
    }), scene.tweens.add({
        targets: fear,
        duration: 1000,
        scaleX: 0.02,
        scaleY: 0.02,
        x: emotionball_config.width - 40,
        y: 50,
        ease: 'Power2'
    });
}

function ballreturn_tween(scene, happy, angry, sad, fear, texts, w_bg) {

    BallLoopTween2.stop();

    happy.setVisible(false);
    angry.setVisible(false);
    sad.setVisible(false);
    fear.setVisible(false);
    happy = scene.add.image(emotionball_config.width - 190, 50, 'happyball').setOrigin(0.5, 0.5).setScale(0.02);
    angry = scene.add.image(emotionball_config.width - 140, 50, 'angryball').setOrigin(0.5, 0.5).setScale(0.02);
    sad = scene.add.image(emotionball_config.width - 90, 50, 'sadball').setOrigin(0.5, 0.5).setScale(0.02);
    fear = scene.add.image(emotionball_config.width - 40, 50, 'fearball').setOrigin(0.5, 0.5).setScale(0.02);

    words = null;
    emotion_page = "";

    scene.tweens.add({
        targets: texts,
        duration: 1000,
        alpha: 0,
        ease: 'Linear',
        onComplete: () => {
            scene.scene.stop('wordcloud');
            scene.scene.start('emotionball');
        }
    });

    scene.tweens.add({
        targets: w_bg,
        duration: 1000,
        alpha: 0,
        ease: 'Linear',
    })

    return scene.tweens.add({
        targets: happy,
        duration: 1000,
        scaleX: 0.1,
        scaleY: 0.1,
        x: wordcloud_config.width * 0.2,
        y: wordcloud_config.height / 2,
        ease: 'Power2'
    }), scene.tweens.add({
        targets: angry,
        duration: 1000,
        scaleX: 0.1,
        scaleY: 0.1,
        x: wordcloud_config.width * 0.4,
        y: wordcloud_config.height / 2,
        ease: 'Power2'
    }), scene.tweens.add({
        targets: sad,
        duration: 1000,
        scaleX: 0.1,
        scaleY: 0.1,
        x: wordcloud_config.width * 0.6,
        y: wordcloud_config.height / 2,
        ease: 'Power2'
    }), scene.tweens.add({
        targets: fear,
        duration: 1000,
        scaleX: 0.1,
        scaleY: 0.1,
        x: wordcloud_config.width * 0.8,
        y: wordcloud_config.height / 2,
        ease: 'Power2'
    });
}

function ball_loop_tween(scene, happy, angry, sad, fear) {
    return {
        happy: scene.tweens.add({
            targets: happy,
            duration: 800,
            y: happy.y + 40 * (happy.scale / 0.1),
            yoyo: true,
            repeat: -1,
            ease: 'Bounce'
        }),
        angry: scene.tweens.add({
            targets: angry,
            duration: 500,
            x: angry.x + 20 * (angry.scale / 0.1),
            yoyo: true,
            repeat: -1,
            ease: 'Elastic'
        }),
        sad: scene.tweens.add({
            targets: sad,
            duration: 2000,
            alpha: 0,
            yoyo: true,
            repeat: -1,
            ease: 'Power2'
        }),
        fear: scene.tweens.add({
            targets: fear,
            duration: 400,
            scale: fear.scale * 1.2,
            yoyo: true,
            repeat: -1,
            ease: 'Back'
        })
    };
}

function playVideo(scene, emo) {
    switch (emo) {
        case '喜': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            break;
        }
        case '怒': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            break;
        }
        case '哀': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            break;
        }
        case '懼': {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
            break;
        }
        default: {
            happyvideo = scene.add.video(0, 0, 'happy').setScale(0.5).setOrigin(0, 0).setLoop(false);;
            happyvideo.play();
        }
    }
}