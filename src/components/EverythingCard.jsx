import React from "react";
import axios from "axios";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

function Card(props) {
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to save articles.");
      return;
    }

    const articleData = {
      title: props.title,
      imgUrl: props.imgUrl,
      description: props.description,
      url: props.url,
      source: props.source,
      author: props.author,
      publishedAt: props.publishedAt,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/save-article',
        articleData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the header
          },
        }
      );
      alert("Article saved successfully!");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save the article.");
    }
  };

  const emailSubject = `Check out this article: ${props.title}`;
  const emailBody = `I thought you might be interested in this article:\n\n${props.title}\n${props.description}\n\nRead more here: ${props.url}`;

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <button 
          className="save-button bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        
        <div className="share-buttons flex gap-2 mt-2">
          <FacebookShareButton url={props.url} quote={props.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={props.url} title={props.title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={props.url} title={props.title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          {/* Email Share Button */}
          <a
            href={`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
            className="email-share-button bg-blue-500 text-white py-2 px-4 rounded"
          >
            Share via Email
          </a>
        </div>
        
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.imgUrl} alt="img" />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words"
            >
              {props.source.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              ({props.publishedAt})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
