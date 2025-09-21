let innerUploadImg = document.querySelector(".inner-upload-img");
let input = document.querySelector("input");
let image = document.querySelector("#image");
let btn = document.querySelector("button");
let text = document.querySelector("#text");
let output = document.querySelector(".output");

let loading = document.querySelector("#loading");

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBIBfS32h1j_1TQzGE1OA_Ojet7KDZ8FmE"

let fileDetails = {
          mime_type: null,
          data: null
}
async function generateResponce() {
          const RequestOption = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({

                              contents: [{
                                        parts: [{ text: "Solve the problem with detailed steps and explanations" },
                                        {
                                                  inline_data: {
                                                            mime_type: fileDetails.mime_type,
                                                            data: fileDetails.data

                                                  }
                                        }
                                        ]
                              }]
                    })
          }

          try {
                    let responce = await fetch(Api_url, RequestOption);
                    let data = await responce.json();
                    let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
                    text.innerHTML = apiResponse;
                    output.style.display = "block";

          } catch (error) {
                    console.log(error);
          }
          finally {
                     loading.style.display="none";
          }

}


input.addEventListener("change", () => {
          const file = input.files[0];
          if (!file) return
          let reader = new FileReader();
          reader.onload = (e) => {

                    let base64data = e.target.result.split(",")[1]
                    fileDetails.mime_type = file.type;
                    fileDetails.data = base64data

                    innerUploadImg = document.querySelector(".inner-upload-img").style.display = "block"
                    innerUploadImg = document.querySelector("span").style.display = "none"
                    innerUploadImg = document.querySelector("#icon").style.display = "none"
                    image.style.display = "block";
                    image.src = `data:${fileDetails.mime_type};base64,${fileDetails.data}`;
                    output.style.display = "none"

          }

          reader.readAsDataURL(file);
});

btn.addEventListener("click",()=>{
           loading.style.display="block"
          generateResponce();
});

innerUploadImg.addEventListener("click", () => {
          input.click();
});

 