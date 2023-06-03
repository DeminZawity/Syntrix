import axios from "axios";

const apiKey = "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"
const endPointURL = "https://api.openai.com/v1/chat/completions"


export async function SyntrixAI(code){

    const requestBody = {
        "model" : "gpt-3.5-turbo",
        "messages" : [{'role' : 'user', "content" : `Can you please summarize what this code block does : ${code}`}],
    }
    const requestHeaders = {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${apiKey}`
    }
    
    
    
    
    await axios.post(endPointURL,requestBody, {headers : requestHeaders})
    .then(response => {
        // console.log(response.data.choices[0].message)
        return response.data.choices[0].message.content
    })
    .catch(err => {
        console.log(err)
        return false
    })
}
