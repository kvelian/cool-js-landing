const waves = ["waveBottom", "waveTop"].map((id) => {
    return {
        canvas: document.getElementById(id),
        ctx: document.getElementById(id).getContext("2d"),
    };
});

waves.forEach((wave) => {
    wave.canvas.width = window.innerWidth * 1.5;
    wave.canvas.height = window.innerHeight;
    wave.ctx.lineWidth = 1;
});

let count = 0;
const scale = 500;
const lineCount = 25;
const lineGap = 15;

waves[0] = {
    ...waves[0],
    line:     [
        [130],
        [175, -63, 256, -21, 413, 130],
        [575, 286, 682, 247, 820, 130],
        [1019, -38, 1079, 2, 1235, 130],
    ],
};

const waveBottom = [
    [
        [130],
        [175, -63, 256, -21, 413, 130],
        [575, 286, 682, 247, 820, 130],
        [1019, -38, 1079, 2, 1235, 130],
    ],
    [
        [35],
        [158, 204, 208, -37, 413, 35],
        [593, 99, 688, -66, 820, 35],
        [962, 143, 954, -64, 1235, 35],
    ],
    [
        [63],
        [106, -46, 313, 13, 413, 63],
        [634, 174, 656, 88, 820, 63],
        [948, 43, 1012, 267, 1235, 63],
    ],
];

waves[1] = {
    ...waves[1],
    line:     
    [
        [63],
        [106, -46, 313, 13, 413, 63],
        [634, 174, 656, 88, 820, 63],
        [948, 43, 1012, 267, 1235, 63],
    ],
    // line: [
    //     [36],
    //     [228, 147, 240, -83, 413, 36],
    //     [567, 142, 665, 174, 820, 36],
    //     [894, -30, 1121, 118, 1235, 36],
    // ],
};

const waveTop = [

    [
        [63],
        [106, -46, 313, 13, 413, 63],
        [634, 174, 656, 88, 820, 63],
        [948, 43, 1012, 267, 1235, 63],
    ],
    [
        [35],
        [158, 204, 208, -37, 413, 35],
        [593, 99, 688, -66, 820, 35],
        [962, 143, 954, -64, 1235, 35],
    ],
    [
        [130],
        [175, -63, 256, -21, 413, 130],
        [575, 286, 682, 247, 820, 130],
        [1019, -38, 1079, 2, 1235, 130],
    ],
    // [
    //     [36],
    //     [228, 147, 240, -83, 413, 36],
    //     [567, 142, 665, 174, 820, 36],
    //     [894, -30, 1121, 118, 1235, 36],
    // ],
    // [
    //     [77],
    //     [144, 145, 184, -123, 413, 77],
    //     [554, 201, 632, 198, 820, 77],
    //     [944, -3, 1024, -32, 1235, 77],
    // ],
    // [
    //     [75],
    //     [129, 5, 267, 205, 413, 75],
    //     [553, -50, 735, 6, 820, 75],
    //     [958, 186, 913, -32, 1235, 75],
    // ],
];

let waveBottomStep0to1 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);
let waveBottomStep1to2 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);
let waveBottomStep2to0 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);

let waveTopStep0to1 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);
let waveTopStep1to2 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);
let waveTopStep2to0 = [1, 2, 3, 4].map((v) =>
    [1, 2, 3, 4, 5, 6].map((e) => 0)
);

for (let i = 0; i < waveBottomStep0to1.length; i++) {
    for (let l = 0; l < waveBottomStep0to1[i].length; l++) {
        waveBottomStep0to1[i][l] =
            (waveBottom[1][i][l] - waveBottom[0][i][l]) / scale;
        waveBottomStep1to2[i][l] =
            (waveBottom[2][i][l] - waveBottom[1][i][l]) / scale;
        waveBottomStep2to0[i][l] =
            (waveBottom[0][i][l] - waveBottom[2][i][l]) / scale;

        waveTopStep0to1[i][l] = (waveTop[1][i][l] - waveTop[0][i][l]) / scale;
        waveTopStep1to2[i][l] = (waveTop[2][i][l] - waveTop[1][i][l]) / scale;
        waveTopStep2to0[i][l] = (waveTop[0][i][l] - waveTop[2][i][l]) / scale;
    }
}

// const steps = states.map((state, index, array) => {
//   for (let i = 0; i < state.length; i++) {
//     for (let l = 0; l < state[i].length; l++) {
//       if (index === states.length - 1) return (array[0][i][l] - array[index][i][l]) / scale;
//       return (array[index + 1][i][l] - array[index][i][l]) / scale;
//     }
//   }
// });

function draw() {
    waves.forEach((wave) => {
        wave.ctx.clearRect(0, 0, wave.canvas.width, wave.canvas.height);
        wave.ctx.strokeStyle = "#929292";
        wave.ctx.beginPath();
        for (let n = 0; n < lineCount; n++) {
            wave.ctx.moveTo(1, wave.line[0][0] + lineGap * n);
            for (let i = 1; i < wave.line.length; i++) {
                wave.ctx.bezierCurveTo(
                    wave.line[i][0],
                    wave.line[i][1] + lineGap * n,
                    wave.line[i][2],
                    wave.line[i][3] + lineGap * n,
                    wave.line[i][4],
                    wave.line[i][5] + lineGap * n
                );
            }
            wave.ctx.stroke();
        }
    });
}

function animate() {
    draw();
    if (count > scale * 3) count = 0;
    for (let i = 0; i < waves[0].line.length; i++) {
        for (let l = 0; l < waves[0].line[i].length; l++) {
            if (count < scale) {
                waves[0].line[i][l] += waveBottomStep0to1[i][l];
                waves[1].line[i][l] += waveTopStep0to1[i][l];
            } else {
                if (count > scale * 2) {
                    waves[0].line[i][l] += waveBottomStep2to0[i][l];
                    waves[1].line[i][l] += waveTopStep2to0[i][l];
                } else {
                    waves[0].line[i][l] += waveBottomStep1to2[i][l];
                    waves[1].line[i][l] += waveTopStep1to2[i][l];
                }
            }
        }
    }
    count++;
    window.requestAnimationFrame(animate);
}

animate();