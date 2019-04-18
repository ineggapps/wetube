import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const videoId = window.location.href.split("/videos/")[1];
const ID_TARGET_REMOVE = "target_remove";
//REMOVE COMMENT
const myCommentList = document.getElementsByClassName("comment__delete");
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleRemoveComment = async event => {
  const target = event.target.parentNode;
  console.log("** target", target);
  const commendId = target.getElementsByClassName("comment__delete-id")[0].innerHTML;
  target.parentNode.setAttribute("id", ID_TARGET_REMOVE);
  if (!commendId) return;
  const response = await axios({
    url: `/api/${videoId}/comment/${commendId}/remove`,
    method: "POST",
    commendId
  });
  if (response.status === 200) {
    decreaseNumber();
    console.log("***try to delete", target);
    target.parentNode.remove();
  }
};

//ADD COMMENT

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteSpan = document.createElement("span");
  deleteSpan.setAttribute("class", "comment__delete");
  deleteSpan.innerHTML = `
      <i class="fas fa-trash-alt"></i>
      <span class="comment__delete-id">${commentId}</span>
    `;
  deleteSpan.addEventListener("click", handleRemoveComment);
  //final complexing
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(deleteSpan);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    console.log("댓글 fake 추가");
    addComment(comment, response.data._id);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  for (let i = 0; i < myCommentList.length; i += 1) {
    myCommentList[i].addEventListener("click", handleRemoveComment);
  }
}

if (addCommentForm) {
  init();
}
