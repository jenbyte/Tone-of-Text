import { useState } from 'react'
import './App.css'

function App() {
	const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState(""); //"Negative" or "Positive"
	const OPENAI_API_KEY = import.meta.env.VITE_API_KEY;

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "Is the sentiment of this comment positive or negativ (but with an emoji)? " + comment,
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    };

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
			return data.json();
		}).then((data) => {
			console.log(data)
			setSentiment(data.choices[0].text.trim());
		});
  }

  return (
    <div className="App">
      <div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder='Paste your comment here!'
          cols={50}
          rows={10}
        />

				<br />
				<br />

        <div>
          <button onClick={callOpenAIAPI}>
            Get The Sentiment Of This Comment!
          </button>
          {sentiment !==  ""
            ? <h3>This Comment Is: {sentiment}</h3>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default App
