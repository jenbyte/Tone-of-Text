import { useState } from 'react'
import './App.css'
import DoubleArrow from '@mui/icons-material/DoubleArrow'

function App() {
	const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState(""); //"Negative" or "Positive"
	const OPENAI_API_KEY = import.meta.env.VITE_API_KEY;

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "Is the sentiment of this comment positive or negative (but with an emoji)? " + comment,
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

  console.log({comment});

  return (
    <div className="App">
      <div>
        <div className="description">
          <p>Uncertain about the sentiment behind a text you received or a comment you read? Use a bot to help you with that 🤖</p>
        </div>

        <textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder='Paste your comment here!'
          cols={50}
          rows={10}
        />

				<br />
				<br />

        <div className="wrapper">
          <button className="get-sentiment-btn" onClick={callOpenAIAPI}>
            <DoubleArrow>Outlined</DoubleArrow> Get The Sentiment Of This Text!
          </button>

          {sentiment !==  ""
            ? <h2><span className="sentiment-response">{sentiment}</span></h2>
            : null
          }

        </div>
      </div>
    </div>
  )
}

export default App
