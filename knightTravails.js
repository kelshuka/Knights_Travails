
class cell{
    constructor(x,y, dist){
        this.x = x;
        this.y = y;
        this.dist = dist;
    }
}

function insideBoard(x,y, n){

    if(x >= 1 && x <= n && y >=1 && y <= n) return true;
    return false;
}

function minStepAlg(knightPos, targetPos, n){

    // directions where a knight can move
    let dx = [-2, -1, 1, 2, -2, -1, 1, 2];
    let dy = [-1, -2, -2, -1, 1, 2, 2, 1];

    let queue = [];

    //push starting position of knight with 0 distance
    queue.push(new cell(knightPos[0], knightPos[1], 0));

    let trf, x, y;
    let visit = new Array(n + 1);

    // make all cell unvisited
    for (let i=1; i <= n; i++){
        visit[i] = new Array(n+1);
        for (let j=1; j <= n; j++){
            visit[i][j] = false;
        }
    }

    // visit starting state
    visit[knightPos[0]][knightPos[1]] = true;

    // loop until we have one element in queue
    while(queue.length != 0){
        trf = queue.shift();

        // if current cell is equal to target cell, return its distance
        if(trf.x == targetPos[0] && trf.y == targetPos[1]){
            return trf.dist;
        }

        // loop for all reachable states
        for(let i=0; i < 8; i++){
            x = trf.x + dx[i];
            y = trf.y + dy[i];

            // If reachable state is not yet visited and inside board, push 
            // that state into queue.
            if(insideBoard(x, y, n) && !visit[x][y]){
                visit[x][y] = true;
                queue.push(new cell(x,y, trf.dist + 1));
            }

        }
    }
    return Number.MAX_VALUE;

}

let n=30; 
let knightPos = [1,1];
let targetPos = [30, 30];
console.log(minStepAlg(knightPos, targetPos, n));