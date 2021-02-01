// Single-sketch example

//TODO: FIX Rotation into tetraminos

function preload() {
  old_song = createAudio('tetris.mp3');
  new_song = createAudio('tetris2.mp3');
  level_up = createAudio('levelup.mp3')
  sound = createAudio('crash.wav');
  rotate_sound = createAudio('move.wav');
  loose_sound = createAudio('loose.mp3');
  speedup_sound = createAudio('speedup.wav')
}

function setup() {
  var width = 500;
  var height = 800;
  frameRate(framerate)
  createCanvas(width, height);
  background(0);
  new_song.loop()

  lostP = createP("");
  lostP.position(160, 300)
  lostP.style('font-size: 50px;')

  musicP = createP("Sound volume");
  musicP.position(550, 60)

  label = createP("Score: ");
  label.position(530, 10);
  label.style('font-size: 25px;')

  score_element = createP(score);
  score_element.position(600, 10);
  score_element.style('font-size: 25px;')

  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(530, 100);

  oldsongb = createButton("Old song");
  oldsongb.style('background-color', color(0, 255, 0, 50));
  oldsongb.position(520, 130);
  oldsongb.mousePressed(oldsong);

  newsongb = createButton("New song");
  newsongb.style('background-color', color(0, 0, 255, 50));
  newsongb.position(600, 130);
  newsongb.mousePressed(newsong);

  button = createButton('RESET');
  button.style('background-color', color(255, 0, 0, 50));
  button.position(225, 820);
  button.size(60, 50)
  button.mousePressed(reset)

  button2 = createImg('img.jpg');
  button2.size(50, 50)
  button2.style('background-color', color(255, 0, 0, 50));
  button2.position(300, 820);
  button2.mousePressed(stop);

  controller = new Controller()

  for (var x = 0; x < int(width / dimension); x += 1) {
    for (var y = 0; y < int(height / dimension); y += 1) {
      stroke(0);
      strokeWeight(2);
      box = new Box(x, y, background_color)
      box.show(background_color)
    }
  }


}

function oldsong() {
  new_song.stop()
  old_song.loop()
}

function newsong() {
  old_song.stop()
  new_song.loop()
}

function stop() {
  loose = !loose;
}

function draw() {

  change_volume()

  if (loose != true) {
    controller.update()
  }
}

function change_volume() {

  new_song.volume(slider.value());
  old_song.volume(slider.value());
  level_up.volume(slider.value());
  sound.volume(slider.value());
  rotate_sound.volume(slider.value());
  loose_sound.volume(slider.value());
  speedup_sound.volume(slider.value());
}

function reset() {
  new_song.loop()
  threshold = 1000
  occupied_boxes = []
  current_tetromino = null
  loose = false
  score = 0;
  framerate = 1
  score_element.html(score);
  lostP.html("");
  for (var x = 0; x < int(width / dimension); x += 1) {
    for (var y = 0; y < int(height / dimension); y += 1) {
      stroke(0);
      strokeWeight(2);
      box = new Box(x, y, background_color)
      box.show(background_color)
    }
  }
}


function rotate_tetromino() {
  rotate_sound.play()
  switch (current_tetromino.tetromino) {
    case 0:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[1].x -= 2;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[1].y -= 2;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[1].x += 2;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y -= 1;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[1].y += 2;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y -= 1;
          break;
      }
      break;
    case 1:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[0].x -= 2;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[2].y += 1;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y += 2;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y -= 2;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[2].x -= 1;
          current_tetromino.boxes[3].x -= 2;
          current_tetromino.boxes[3].y += 1;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[0].x += 2;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[2].y -= 1;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y -= 2;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y += 2;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[2].x += 1;
          current_tetromino.boxes[3].x += 2;
          current_tetromino.boxes[3].y -= 1;
          break;
      }
      break;
    case 2:
      break;
    case 3:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y -= 1;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y -= 1;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y += 1;
          break;
      }
      break;
    case 4:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[2].x += 2;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[2].y += 2;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[2].x -= 2;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y -= 1;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[2].y -= 2;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y -= 1;
          break;
      }
      break;
    case 5:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[0].y -= 2;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[0].x += 2;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y -= 1;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y += 1;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[0].y += 2;
          current_tetromino.boxes[1].x += 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[3].x -= 1;
          current_tetromino.boxes[3].y -= 1;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[0].x -= 2;
          current_tetromino.boxes[1].x -= 1;
          current_tetromino.boxes[1].y += 1;
          current_tetromino.boxes[3].x += 1;
          current_tetromino.boxes[3].y -= 1;
          break;
      }
      break;
    case 6:
      switch (current_tetromino.orientation) {
        case 0:
          current_tetromino.orientation = 1;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[2].x += 1;
          current_tetromino.boxes[2].y += 1;
          current_tetromino.boxes[3].y += 2;
          break;
        case 1:
          current_tetromino.orientation = 2;
          current_tetromino.boxes[0].x += 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[2].x -= 1;
          current_tetromino.boxes[2].y += 1;
          current_tetromino.boxes[3].x -= 2;
          break;
        case 2:
          current_tetromino.orientation = 3;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y += 1;
          current_tetromino.boxes[2].x -= 1;
          current_tetromino.boxes[2].y -= 1;
          current_tetromino.boxes[3].y -= 2;
          break;
        case 3:
          current_tetromino.orientation = 0;
          current_tetromino.boxes[0].x -= 1;
          current_tetromino.boxes[0].y -= 1;
          current_tetromino.boxes[2].x += 1;
          current_tetromino.boxes[2].y -= 1;
          current_tetromino.boxes[3].x += 2;
          break;
      }
      break;
  }

}

function keyPressed() {
  var can_move = true;

  if (current_tetromino != null) {
    if (key == "ArrowLeft") {
      current_tetromino.boxes.forEach(element => {
        if (element.x - 1 < 0) can_move = false;
        for (let i = 0; i < occupied_boxes.length; i++) {
          if (occupied_boxes[i].y == element.y + 1 &&
            occupied_boxes[i].x == element.x - 1) can_move = false;
        }
      })
      if (can_move == true) {
        current_tetromino.clear()
        current_tetromino.boxes.forEach(element => {
          element.x = element.x - 1
        })
      }
    }

    if (key == "ArrowRight") {
      current_tetromino.boxes.forEach(element => {
        if (element.x + 1 > 9) can_move = false;
        for (let i = 0; i < occupied_boxes.length; i++) {
          if (occupied_boxes[i].y == element.y + 1 &&
            occupied_boxes[i].x == element.x + 1) can_move = false;
        }
      })

      if (can_move == true) {
        current_tetromino.clear()
        current_tetromino.boxes.forEach(element => {
          element.x = element.x + 1
        })
      }

    }

    if (key == "ArrowUp") {

      if (current_tetromino != null) {
        current_tetromino.clear()
        rotate_tetromino();

      }

    }

    if (key == "ArrowDown") {
      frameRate(200)
    }

    current_tetromino.draw()
  }
}