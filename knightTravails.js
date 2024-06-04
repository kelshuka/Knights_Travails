
class cell{
    constructor(x,y, dist){
        this.x = x;
        this.y = y;
        this.dist = dist;
    }
}

function insideBoard(x,y, N=8){

    if(x >= 0 && x < 8 && y >=0 && y < 8) return true;
    return false;
}

function minStepAlg(knightPos, targetPos){

    // directions where a knight can move
    let dx = [-2, -1,  1,  2, -2, -1, 1, 2];
    let dy = [-1, -2, -2, -1,  1,  2, 2, 1];

    let queue = [];
    queue.push(new cell(knightPos[0], knightPos[1], []));

    let visit = new Set();
    let n=8; 

    // make all cell unvisited
    for (let i=0; i < 8; i++){
        visit[i] = new Array(n+1);
        for (let j=0; j < 8; j++){
            visit[i][j] = false;
        }
    }

    // visit starting state
    visit[knightPos[0]][knightPos[1]] = true;

    // loop until we have one element in queue
    while(queue.length != 0){
        let trf = queue.shift();

        // if current cell is equal to target cell, return its distance
        if(trf.x === targetPos[0] && trf.y === targetPos[1]){
            trf.dist = [...trf.dist, [trf.x, trf.y]];
            console.log(`You made it in ${trf.dist.length - 1} moves! Here's your path:`);
            for (let path of trf.dist) {
                console.log(path);
            }
            return trf.dist;
        }

        // loop for all reachable states
        for(let i=0; i <= 8; i++){
            x = trf.x + dx[i];
            y = trf.y + dy[i];

            // If reachable state is not yet visited and inside board, push 
            // that state into queue.
            if(insideBoard(x, y) && !visit[x][y]){
                visit[x][y] = true;
                
                queue.push(new cell(x,y, [...trf.dist, [trf.x, trf.y] ]));
            }

        }
    }
    return Number.MAX_VALUE;

}


let knightPos = [0,0];
let targetPos = [3, 3];
console.log(minStepAlg(knightPos, targetPos));
// You made it in 2 moves! Here's your path:
// [ 0, 0 ]
// [ 1, 2 ]
// [ 3, 3 ]


console.log(minStepAlg([3,3], [4,3]));
// You made it in 3 moves! Here's your path:
// [ 3, 3 ]
// [ 1, 2 ]
// [ 3, 1 ]
// [ 4, 3 ]
