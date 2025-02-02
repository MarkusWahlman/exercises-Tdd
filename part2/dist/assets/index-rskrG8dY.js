var j=Object.defineProperty;var R=(r,t,e)=>t in r?j(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(R(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class c{constructor(t,e=0){n(this,"rotationStates",[]);n(this,"rotationIndex");n(this,"grid");this.grid=t,this.rotationIndex=e,this.constructor.rotationStates&&(this.rotationStates=this.constructor.rotationStates)}static get I_SHAPE(){return new b}static get T_SHAPE(){return new L}static get L_SHAPE(){return new v}static get J_SHAPE(){return new P}static get S_SHAPE(){return new y}static get Z_SHAPE(){return new A}static get O_SHAPE(){return new D}static fromString(t){const e=t.trim().split(`
`).map(o=>o.trim().split(""));return new c(e)}toString(){return this.grid.map(t=>t.join("")).join(`
`)+`
`}rotateRight(){const t=(this.rotationIndex+1)%this.constructor.rotationStates.length;return new this.constructor(t)}rotateLeft(){const t=(this.rotationIndex+this.constructor.rotationStates.length-1)%this.constructor.rotationStates.length;return new this.constructor(t)}}const u=class u extends c{constructor(t=0){super(c.fromString(u.rotationStates[t]).grid,t)}};n(u,"rotationStates",[`.....
     IIII.
     .....
     .....
     .....`,`...I.
     ...I.
     ...I.
     ...I.
     .....`]);let b=u;const d=class d extends c{constructor(t=0){super(c.fromString(d.rotationStates[t]).grid,t)}};n(d,"rotationStates",[`...
     TTT
     .T.`,`.T.
     TT.
     .T.`,`...
     .T.
     TTT`,`.T.
     .TT
     .T.`]);let L=d;const g=class g extends c{constructor(t=0){super(c.fromString(g.rotationStates[t]).grid,t)}};n(g,"rotationStates",[`...
     LLL
     L..`,`LL.
     .L.
     .L.`,`...
     ..L
     LLL`,`.L.
     .L.
     .LL`]);let v=g;const m=class m extends c{constructor(t=0){super(c.fromString(m.rotationStates[t]).grid,t)}};n(m,"rotationStates",[`...
     JJJ
     ..J`,`.J.
     .J.
     JJ.`,`...
     J..
     JJJ`,`.JJ
     .J.
     .J.`]);let P=m;const S=class S extends c{constructor(t=0){super(c.fromString(S.rotationStates[t]).grid,t)}};n(S,"rotationStates",[`...
     .SS
     SS.`,`S..
     SS.
     .S..`,`...
     .SS
     SS.`,`S..
     SS.
     .S.`]);let y=S;const w=class w extends c{constructor(t=0){super(c.fromString(w.rotationStates[t]).grid,t)}};n(w,"rotationStates",[`...
     ZZ.
     .ZZ`,`..Z
     .ZZ
     .Z.`,`...
     ZZ.
     .ZZ`,`.Z.
     ZZ.
     Z..`]);let A=w;class D extends c{constructor(){super(c.fromString(`...
         .OO
         .OO`).grid)}rotateRight(){return this}rotateLeft(){return this}}class T{constructor(t,e){n(this,"board");n(this,"columnPos");n(this,"rowPos");n(this,"tetromino");n(this,"isFalling");this.board=t,this.isFalling=!0,this.tetromino=e instanceof c?e:c.fromString(e);const o=this.tetromino.grid[0].length;this.rowPos=Math.floor((t.width-o)/2),this.columnPos=0;for(let i=0;i<this.tetromino.grid.length;i++)for(let s=0;s<this.tetromino.grid[i].length;s++)this.board.grid[this.columnPos+i][this.rowPos+s]=this.tetromino.grid[i][s]}reDraw(t){const e=this.tetromino,o=[];for(let i=0;i<e.grid.length;i++)for(let s=0;s<e.grid[i].length;s++)t.grid[i][s]!=="."&&e.grid[i][s]!=="."&&o.push([i,s]);return this.tetromino=t,this.canBeMoved(0,0,o)?(this.drawNewTetromino(0,0,e),!0):(this.tetromino=e,!1)}canBeMoved(t,e,o=[]){let i=!0;const s=this.columnPos+t,f=this.rowPos+e,h=e===0?1:Math.sign(e);for(let l=0;l<this.tetromino.grid.length;l++){for(let a=0;a<this.tetromino.grid[l].length;a++)if(!(o.some(([B,H])=>B===l&&H===a)||this.tetromino.grid[l][a]===".")){if(s+l>=this.board.height){i=!1;break}if(f+a>=this.board.width||f+a<0){i=!1;break}if(!(t!==0&&l<this.tetromino.grid.length-1&&this.tetromino.grid[l+1][a]!==".")&&!(e!==0&&this.tetromino.grid[l][a+h]&&this.tetromino.grid[l][a+h]!==".")&&this.board.grid[s+l][f+a]!=="."){i=!1;break}}if(!i)break}return!!i}drawNewTetromino(t,e,o){const i=this.columnPos+t,s=this.rowPos+e,f=e===0?1:Math.sign(e);for(let h=this.tetromino.grid.length-1;h>=0;h--)for(let l=0;l<this.tetromino.grid[h].length;l++){const a=f===-1?l:this.tetromino.grid[h].length-1-l;o&&o.grid[h][a]!=="."&&(this.board.grid[this.columnPos+h][this.rowPos+a]="."),this.tetromino.grid[h][a]!=="."&&(this.board.grid[this.columnPos+h][this.rowPos+a]=".",this.board.grid[i+h][s+a]=this.tetromino.grid[h][a])}}moveBy(t,e){return this.canBeMoved(t,e)?(this.drawNewTetromino(t,e),this.columnPos=this.columnPos+t,this.rowPos=this.rowPos+e,!0):!1}moveDown(){this.isFalling&&(this.moveBy(1,0)||(this.isFalling=!1))}moveLeft(){this.isFalling&&this.moveBy(0,-1)}moveRight(){this.isFalling&&this.moveBy(0,1)}rotateLeft(){return this.isFalling?this.reDraw(this.tetromino.rotateLeft()):!1}rotateRight(){return this.isFalling?this.reDraw(this.tetromino.rotateRight()):!1}lockObject(){this.isFalling=!1}}class x{constructor(t,e){n(this,"width");n(this,"height");n(this,"grid");n(this,"activeObject");n(this,"onClearLine");this.width=t,this.height=e,this.grid=Array.from({length:e},()=>Array(t).fill("."))}cellAt(t,e){return this.grid[t][e]}drop(t){if(!this.activeObject||!this.activeObject.isFalling)this.activeObject=new T(this,t);else throw"already falling"}moveLeft(){var t;(t=this.activeObject)==null||t.moveLeft()}moveRight(){var t;(t=this.activeObject)==null||t.moveRight()}moveDown(){var t;(t=this.activeObject)==null||t.moveDown()}clearFullLines(){let t=0;const e=this.grid.filter(o=>o.some(i=>i==="."));if(t=this.grid.length-e.length,!!t){for(;e.length<this.grid.length;)e.unshift(new Array(this.grid[0].length).fill("."));this.grid=e,this.onClearLine&&t>0&&this.onClearLine(t)}}wallKickRotate(t){t()||this.tryMoveAndRotate(0,-1,t)||this.tryMoveAndRotate(0,1,t)}tryMoveAndRotate(t,e,o){var i;if((i=this.activeObject)!=null&&i.moveBy(t,e)){if(o())return!0;this.activeObject.moveBy(-t,-e)}return!1}rotateLeft(){this.wallKickRotate(()=>{var t;return(t=this.activeObject)==null?void 0:t.rotateLeft()})}rotateRight(){this.wallKickRotate(()=>{var t;return(t=this.activeObject)==null?void 0:t.rotateRight()})}tick(){this.activeObject&&this.activeObject.isFalling?this.activeObject.moveDown():this.clearFullLines()}hasFalling(){var t;return(t=this.activeObject)==null?void 0:t.isFalling}toString(){return this.grid.map(t=>t.join("")).join(`
`)+`
`}}class E{constructor(t=0,e=0,o=0){n(this,"score");n(this,"level");n(this,"totalLinesCleared");this.score=t,this.level=e,this.totalLinesCleared=o}linesCleared(t){switch(t){case 1:this.score+=40*(this.level+1);break;case 2:this.score+=100*(this.level+1);break;case 3:this.score+=300*(this.level+1);break;case 4:this.score+=1200*(this.level+1);break;default:console.error(`Unexpected line count: ${t}`)}this.totalLinesCleared+=t,this.level=Math.min(10,Math.floor(this.totalLinesCleared/10))}}class k{constructor(t){n(this,"items");n(this,"currentBag");n(this,"index");this.items=[...t],this.currentBag=[],this.index=0}shuffle(){this.currentBag=[...this.items];for(let t=this.currentBag.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[this.currentBag[t],this.currentBag[e]]=[this.currentBag[e],this.currentBag[t]]}this.index=0}next(){return this.index>=this.currentBag.length&&this.shuffle(),this.currentBag[this.index++]}}class F{constructor(t=10,e=20,o=1e3){n(this,"columns");n(this,"rows");n(this,"tickDuration");n(this,"nextTick");n(this,"board");n(this,"scoring");n(this,"tetrominoes");this.columns=t,this.rows=e,this.tickDuration=o,this.nextTick=0,this.scoring=new E,this.board=new x(this.columns,this.rows),this.tetrominoes=new k([c.I_SHAPE,c.T_SHAPE,c.L_SHAPE,c.J_SHAPE,c.S_SHAPE,c.Z_SHAPE,c.O_SHAPE]),this.board.onClearLine=i=>{this.scoring.linesCleared(i)}}}function J(){const r=document.getElementById("game"),t=new F;t.scoring=new E,t.board=new x(t.columns,t.rows),t.board.onClearLine=o=>{var i;(i=t.scoring)==null||i.linesCleared(o)},t.tetrominoes=new k([c.I_SHAPE,c.T_SHAPE,c.L_SHAPE,c.J_SHAPE,c.S_SHAPE,c.Z_SHAPE,c.O_SHAPE]),document.addEventListener("keydown",o=>{if(o.code==="Space")for(let i=0;i<t.rows;i++)t.board.moveDown();else if(o.key==="z")t.board.rotateLeft();else if(o.key==="x")t.board.rotateRight();else if(o.code==="ArrowUp")t.board.rotateRight();else if(o.code==="ArrowDown")t.board.moveDown();else if(o.code==="ArrowLeft")t.board.moveLeft();else if(o.code==="ArrowRight")t.board.moveRight();else return;o.preventDefault()});const e=o=>{Z(t,o),_(t,r),window.requestAnimationFrame(e)};window.requestAnimationFrame(e)}function Z(r,t){t>=r.nextTick&&(M(r),C(r),r.nextTick=t+r.tickDuration)}function M(r){r.board.tick(),r.board.hasFalling()||r.board.drop(r.tetrominoes.next())}function C(r){const t=I[r.scoring.level];t&&(r.tickDuration=t)}const I={1:33*15,2:33*13,3:33*11,4:33*9,5:33*7,6:33*5,7:33*4,8:33*3,9:33*2,10:33};function _(r,t,e){const o=t.getContext("2d");if(!o){console.error("No ctx");return}const i=t.width=t.clientWidth,s=t.height=t.clientHeight,f=i/r.columns,h=s/r.rows;N(o,i,s);for(let l=0;l<r.rows;l++)for(let a=0;a<r.columns;a++){const p=r.board.cellAt(l,a);z(o,{cell:p,row:l,column:a,cellWidth:f,cellHeight:h})}$(o,{level:r.scoring.level,score:r.scoring.score,canvasWidth:i})}function N(r,t,e){r.fillStyle="#ffffff",r.fillRect(0,0,t,e)}function z(r,{cell:t,row:e,column:o,cellWidth:i,cellHeight:s}){r.fillStyle=K[t];const f=i*o,h=s*e;r.fillRect(f,h,i,s)}const K={".":"#ffffff",I:"#cc1c19",T:"#3a88b2",L:"#c85c14",J:"#312cc3",S:"#921392",Z:"#2e9915",O:"#9a8016"};function $(r,{score:t,level:e,canvasWidth:o}){O(r,{text:`Level ${e}`,x:5,y:27,font:"22px sans-serif"}),O(r,{text:`Score ${t}`,textAlign:"right",x:o-5,y:27,font:"22px sans-serif"})}function O(r,{text:t,x:e,y:o,font:i,textAlign:s}){r.font=i,r.textAlign=s||"left",r.fillStyle="#000000",r.fillText(t,e,o)}J();window.onload=()=>{const r=document.getElementById("background-audio");r.volume=.02};
//# sourceMappingURL=index-rskrG8dY.js.map
