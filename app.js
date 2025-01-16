let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); // Corrected selector
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) { // Player O's turn
            box.innerText = "O";
            turnO = false;
        } else { // Player X's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable box after it's clicked

        checkWinner(); // Check for a winner after every move
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show the winner message
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText; // Access box values correctly
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return; // Exit loop once a winner is found
            }
        }
    }
};


const resetGame = () => {
    boxes.forEach((box) => {
      box.innerText = "";
      box.disabled = false;
    });
    msgContainer.classList.add("hide");
  };
  
  document.getElementById("reset-btn").addEventListener("click", resetGame);

  newGameBtn.addEventListener("click", () => {
    resetBtn.click(); // Trigger the reset button functionality
});
