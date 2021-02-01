let dimension = 50
let background_color = 100
let tetromino_color = 220
let occupied_boxes = []
let current_tetromino = null
let threshold = 1000;
let loose = false
let score = 0;
let framerate = 1;

class Controller {
    constructor() {}

    update() {

        if (score >= threshold) {
            level_up.play()
            framerate += 1;
            threshold += 1000;
        }

        this.check_for_lines()

        // If there exists created tetromino move it, otherwise create one
        if (current_tetromino != null) {
            current_tetromino.move()
        } else {
            current_tetromino = new Tetromino(this.rand_int(0, 6), new Box(this.rand_int(1, 7), 0, null), 0)
            this.loose_check()
        }
        // Show all boxes
        occupied_boxes.forEach(element => element.show(element.color))
    }

    uniqBy(a, key) {
        var index = [];
        return a.filter(function (item) {
            var k = key(item);
            return index.indexOf(k) >= 0 ? false : index.push(k);
        });
    }

    check_for_lines() {
        occupied_boxes = this.uniqBy(occupied_boxes, JSON.stringify)
        var counter = 0
        if (occupied_boxes.length != 0) {
            for (var columns = 0; columns <= 15; columns++) {
                for (var rows = 0; rows <= 9; rows++) {
                    occupied_boxes.forEach(element => {
                        if (element.y == columns && element.x == rows) {
                            counter++;
                        }
                    })
                }
                if (counter == 10) {
                    sound.play()
                    occupied_boxes.forEach(element => {
                        if (element.y == columns) element.clear()
                    })
                    occupied_boxes = occupied_boxes.filter(item => item.y !== columns)

                    occupied_boxes.forEach(element => {
                        if (element.y < columns) {
                            element.clear()
                            element.y = element.y + 1
                        }
                    })
                    console.log("Clearing line!")
                    score += 100;
                    score_element.html(score)

                }
                counter = 0;
            }
        }
    }


    loose_check() {
        current_tetromino.boxes.forEach(element => {
            for (let i = 0; i < occupied_boxes.length; i++) {
                if (occupied_boxes[i].y == element.y &&
                    occupied_boxes[i].x == element.x) {
                    current_tetromino.draw()
                    loose = true;
                    new_song.stop()
                    old_song.stop()
                    loose_sound.play()
                    lostP.html("You lost :(");
                    return
                }
            }
        })
    }

    rand_int(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}

class Tetromino {

    constructor(type, starting_box, orientation) {
        /* Type: 0 - L , 1 - I, 2 - O, 3 - T , 4 - Z, 5 - J, 6 - S*/
        this.tetromino = type;
        this.starting_box = starting_box;
        this.orientation = orientation;
        this.boxes = this.create()
        this.falling = true;
    }

    create() {
        // Shorter access name for a variable
        var b = this.starting_box
        var c = color(random(255), random(255), random(255))
        this.starting_box.color = c;
        if (this.tetromino == 0) {
            return [
                this.starting_box, new Box(b.x + 1, b.y, c),
                new Box(b.x, b.y - 1, c), new Box(b.x, b.y - 2, c)
            ]
        }
        if (this.tetromino == 1) {
            return [
                this.starting_box, new Box(b.x, b.y - 1, c),
                new Box(b.x, b.y - 2, c), new Box(b.x, b.y - 3, c)
            ]
        }
        if (this.tetromino == 2) {
            return [
                this.starting_box, new Box(b.x + 1, b.y, c),
                new Box(b.x, b.y - 1, c), new Box(b.x + 1, b.y - 1, c)
            ]
        }
        if (this.tetromino == 3) {
            return [
                this.starting_box, new Box(b.x - 1, b.y - 1, c),
                new Box(b.x, b.y - 1, c), new Box(b.x + 1, b.y - 1, c)
            ]
        }
        if (this.tetromino == 4) {
            return [
                this.starting_box, new Box(b.x + 1, b.y, c),
                new Box(b.x - 1, b.y - 1, c), new Box(b.x, b.y - 1, c)
            ]
        }
        if (this.tetromino == 5) {
            return [
                this.starting_box, new Box(b.x + 1, b.y, c),
                new Box(b.x + 1, b.y - 1, c), new Box(b.x + 1, b.y - 2, c)
            ]
        }
        if (this.tetromino == 6) {
            return [
                this.starting_box, new Box(b.x + 1, b.y, c),
                new Box(b.x + 1, b.y - 1, c), new Box(b.x + 2, b.y - 1, c)
            ]
        }
    }

    draw() {
        this.boxes.forEach(element => {
            element.show(element.color)
        })
    }

    clear() {
        this.boxes.forEach(element => element.show(background_color))
    }

    move() {
        this.has_collided()
        if (this.falling == true) {
            this.clear()
            this.boxes.forEach(element => element.y += 1)
            this.draw()
        } else {
            score += 50;
            score_element.html(score)
        }
    }

    has_collided() {
        this.boxes.forEach(element => {
            // Tetromino reached bottom
            if (element.y == 15) {
                this.boxes.forEach(element => occupied_boxes.push(element));
                this.falling = false
                current_tetromino = null;
                frameRate(framerate)
                speedup_sound.play()
                return
            }
            // Collided with another tetromino
            for (let i = 0; i < occupied_boxes.length; i++) {
                if (occupied_boxes[i].y == element.y + 1 &&
                    occupied_boxes[i].x == element.x) {
                    this.boxes.forEach(element => occupied_boxes.push(element));
                    this.falling = false
                    current_tetromino = null;
                    frameRate(framerate)
                    speedup_sound.play()
                    return
                }
            }
        })
    }

}

class Box {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    show(color) {
        fill(color)
        rect(this.x * dimension, this.y * dimension, dimension, dimension, 15);
    }

    clear() {
        this.show(background_color)
    }

}